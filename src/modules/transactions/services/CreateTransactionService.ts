import { inject, injectable } from 'tsyringe';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transactions';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import AppError from '@shared/errors/AppError';
import ICardRepository from '@modules/cards/repositories/ICardsRepository';
import getEndOfCardNumber from './utils/getEndOfCardNumber';

interface IRequestDTO {
  company_Id: string;
  description: string;
  trasactionType: string;
  value: number;
  establishment?: string;
  cardNumber?: string;
  type: 'CREDIT' | 'DEBIT';
}

interface IResponseDTO {
  id: string;
  company_Id: string;
  description: string;
  trasactionType: string;
  value: number;
  establishment?: string;
  endOfCard?: string;
  type: string;
}

@injectable()
class CreateTransactionService {
  private transactionRepository: ITransactionRepository;

  private companyRepository: ICompanyRepository;

  private cardRepository: ICardRepository;

  constructor(
    @inject('TransactionRepository')
    transactionRepository: ITransactionRepository,
    @inject('CompanyRepository')
    companyRepository: ICompanyRepository,
    @inject('CardsRepository')
    cardRepository: ICardRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.companyRepository = companyRepository;
    this.cardRepository = cardRepository;
  }

  public async execute({
    company_Id,
    description,
    trasactionType,
    value,
    establishment,
    cardNumber,
    type,
  }: IRequestDTO): Promise<IResponseDTO> {
    const company = await this.companyRepository.findById(company_Id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const balence = await this.transactionRepository.getBalence(company.id);

    if (type === 'DEBIT' && value > balence.balanceTotal) {
      throw new AppError('insufficient balance');
    }

    // as validações abaixos são falidações fake, apenas para manter um padrão.
    if (trasactionType.toUpperCase() === 'CARD') {
      if (!cardNumber) {
        throw new AppError('Number of card is required');
      }

      if (cardNumber.split(' ').length !== 4) {
        throw new AppError('This number of card is invalid');
      }

      if (cardNumber.split(' ').join('').length !== 16) {
        throw new AppError('This number of card is invalid');
      }

      const card = await this.cardRepository.findByNumber({
        company_Id,
        number: cardNumber,
      });

      if (!card) {
        throw new AppError('Card non exist', 401);
      }
    }

    const transaction = await this.transactionRepository.create({
      company_Id,
      description,
      trasactionType,
      value,
      establishment,
      cardNumber,
      type,
    });

    const endOfCard = transaction.cardNumber
      ? getEndOfCardNumber(transaction.cardNumber)
      : undefined;

    delete transaction.cardNumber;

    return {
      ...transaction,
      endOfCard,
    };
  }
}

export default CreateTransactionService;

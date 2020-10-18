import { inject, injectable } from 'tsyringe';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transactions';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import AppError from '@shared/errors/AppError';
import ICardRepository from '@modules/cards/repositories/ICardsRepository';
import getEndOfCardNumber from './utils/getEndOfCardNumber';

interface IRequestDTO {
  company_Id: string;
  cardNumber: string;
}

type IResponseDTO = Array<{
  id: string;
  company_Id: string;
  description: string;
  trasactionType: string;
  value: number;
  establishment?: string;
  endOfCard?: string;
  type: string;
}>;

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
    cardNumber,
  }: IRequestDTO): Promise<IResponseDTO> {
    if (cardNumber.split(' ').length !== 4) {
      throw new AppError('This number of cart is invalid');
    }

    if (cardNumber.split(' ').join('').length !== 16) {
      throw new AppError('This number of cart is invalid');
    }
    const company = await this.companyRepository.findById(company_Id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const card = await this.cardRepository.findByNumber({
      company_Id,
      number: cardNumber,
    });
    if (!card) {
      throw new AppError('None card fund with this number');
    }

    const transactions = await this.transactionRepository.findAllWithCardFromCompany(
      {
        company_Id,
        cardNumber,
      },
    );
    const response = transactions.map(transaction => {
      const endOfCard = transaction.cardNumber
        ? getEndOfCardNumber(transaction.cardNumber)
        : undefined;

      delete transaction.cardNumber;

      return {
        ...transaction,
        endOfCard,
      };
    });
    return response;
  }
}

export default CreateTransactionService;

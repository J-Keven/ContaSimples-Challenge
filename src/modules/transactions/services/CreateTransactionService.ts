import { inject, injectable } from 'tsyringe';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transactions';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import AppError from '@shared/errors/AppError';
import ICardRepository from '@modules/cards/repositories/ICardRepository';

interface IResponseDTO {
  company_Id: string;
  description: string;
  trasactionType: string;
  value: number;
  establishment?: string;
  cardNumber?: string;
  type: 'CREDIT' | 'DEBIT';
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
  }: IResponseDTO): Promise<Transaction> {
    const company = await this.companyRepository.findById(company_Id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const balence = await this.transactionRepository.getBalence(company.id);

    if (type === 'DEBIT' && value > balence.balanceTotal) {
      throw new AppError('insufficient balance');
    }

    let endOfCard;
    if (trasactionType.toUpperCase() === 'CARD') {
      if (!cardNumber) {
        throw new AppError('Number of card is required');
      }
      endOfCard = cardNumber.slice(cardNumber.length - 4, cardNumber.length);
    }

    const transaction = await this.transactionRepository.create({
      company_Id,
      description,
      trasactionType,
      value,
      establishment,
      endOfCard,
      type,
    });

    await this.transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

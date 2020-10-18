import { v4 } from 'uuid';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import IFindAllInDayFromCompanyDTO from '@modules/transactions/dtos/IFindAllInDayFromCompanyDTO';
import IFindAllInMonthFromCompanyDTO from '@modules/transactions/dtos/IFindAllInMonthFromCompanyDTO';
import IFindAllWithCardFromCompanyDTO from '@modules/transactions/dtos/IFindAllWithCardFromCompanyDTO';
import IGetBalenceResponseDTO from '@modules/transactions/dtos/IGetBalenceResponseDTO';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transactions';
import ITransactionRepository from '../ITransactionRepository';

class FakeTransactionRepository implements ITransactionRepository {
  private trasactions: Transaction[] = [];

  public async findLasTransaction(company_Id: string): Promise<Transaction> {
    const transaction = this.trasactions.filter(
      item => item.company_Id === company_Id,
    );

    return transaction[transaction.length - 1];
  }

  public async findAllInDayFromCompany({
    company_Id,
    day,
    month,
    year,
    type,
  }: IFindAllInDayFromCompanyDTO): Promise<Transaction[]> {
    const transactions = this.trasactions.filter(transaction => {
      const dateCompare = new Date(
        getYear(transaction.created_at),
        getMonth(transaction.created_at),
        getDate(transaction.created_at),
      );

      const dateRequest = new Date(year, month - 1, day);
      return (
        transaction.company_Id === company_Id &&
        transaction.type === type &&
        isEqual(dateCompare, dateRequest)
      );
    });
    return transactions;
  }

  public async findAllInMonthFromCompany({
    company_Id,
    month,
    type,
    year,
  }: IFindAllInMonthFromCompanyDTO): Promise<Transaction[]> {
    const transactions = this.trasactions.filter(transaction => {
      const dateCompare = new Date(
        getYear(transaction.created_at),
        getMonth(transaction.created_at),
      );

      const dateRequest = new Date(year, month - 1);
      return (
        transaction.company_Id === company_Id &&
        transaction.type === type &&
        isEqual(dateCompare, dateRequest)
      );
    });
    return transactions;
  }

  public async findAllWithCardFromCompany({
    cardNumber,
    company_Id,
  }: IFindAllWithCardFromCompanyDTO): Promise<Transaction[]> {
    const transaction = this.trasactions.filter(
      item => item.company_Id === company_Id && item.cardNumber === cardNumber,
    );

    return transaction;
  }

  public async getBalence(company_Id: string): Promise<IGetBalenceResponseDTO> {
    const companyTransactions = this.trasactions.filter(
      trasaction => trasaction.company_Id === company_Id,
    );

    const creditTotal = companyTransactions.reduce((acumulator, trasaction) => {
      if (trasaction.type === 'CREDIT') {
        return acumulator + trasaction.value;
      }

      return acumulator;
    }, 0);

    const debitTotal = companyTransactions.reduce((acumulator, trasaction) => {
      if (trasaction.type === 'DEBIT') {
        return acumulator + trasaction.value;
      }

      return acumulator;
    }, 0);

    return {
      balanceTotal: creditTotal - debitTotal,
      creditTotal,
      debitTotal,
    };
  }

  public async create({
    company_Id,
    description,
    trasactionType,
    value,
    cardNumber,
    establishment,
    type,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();

    Object.assign(transaction, {
      id: v4(),
      company_Id,
      description,
      trasactionType,
      value,
      cardNumber,
      establishment,
      type,
      created_at: Date.now(),
    });

    this.trasactions.push(transaction);

    return transaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    const index = this.trasactions.findIndex(
      item => item.id === transaction.id,
    );

    if (index === -1) {
      this.trasactions.push(transaction);
    } else {
      this.trasactions[index] = transaction;
    }

    return transaction;
  }
}

export default FakeTransactionRepository;

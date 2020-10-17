import IFindAllInDayFromCompanyDTO from '@modules/transactions/dtos/IFindAllInDayFromCompanyDTO';
import IFindAllInMonthFromCompanyDTO from '@modules/transactions/dtos/IFindAllInMonthFromCompanyDTO';
import IFindAllWithCardFromCompanyDTO from '@modules/transactions/dtos/IFindAllWithCardFromCompanyDTO';
import Transaction from '../infra/typeorm/entities/Transactions';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IGetBalenceResponseDTO from '../dtos/IGetBalenceResponseDTO';

export default interface ITransactionRepository {
  findAllInDayFromCompany(
    data: IFindAllInDayFromCompanyDTO,
  ): Promise<Transaction[]>;

  findAllInMonthFromCompany(
    data: IFindAllInMonthFromCompanyDTO,
  ): Promise<Transaction[]>;

  findAllWithCardFromCompany(
    data: IFindAllWithCardFromCompanyDTO,
  ): Promise<Transaction[]>;

  findLasTransaction(company_Id: string): Promise<Transaction>;

  getBalence(company_Id: string): Promise<IGetBalenceResponseDTO>;

  create(data: ICreateTransactionDTO): Promise<Transaction>;

  save(transaction: Transaction): Promise<Transaction>;
}

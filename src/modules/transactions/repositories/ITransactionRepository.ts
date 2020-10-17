import IlistAllTransactionsFilteringByDateAndTypeDTO from '@modules/transactions/dtos/IListAllTransactionsFilteringByDateAndTypeDTO';
import Transaction from '../infra/typeorm/entities/Transactions';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IGetBalenceResponseDTO from '../dtos/IGetBalenceResponseDTO';

export default interface ITransactionRepository {
  findAllTransactionsFilteringByDateAndType(
    data: IlistAllTransactionsFilteringByDateAndTypeDTO,
  ): Promise<Transaction[]>;
  findLasTransaction(company_Id: string): Promise<Transaction>;
  getBalence(company_Id: string): Promise<IGetBalenceResponseDTO>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(transaction: Transaction): Promise<Transaction>;
}

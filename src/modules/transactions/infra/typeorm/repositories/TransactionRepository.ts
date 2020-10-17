import { Repository, getRepository, Raw } from 'typeorm';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import IGetBalenceResponseDTO from '@modules/transactions/dtos/IGetBalenceResponseDTO';
import Transactions from '@modules/transactions/infra/typeorm/entities/Transactions';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import IFindAllInDayFromCompanyDTO from '@modules/transactions/dtos/IFindAllInDayFromCompanyDTO';
import IFindAllInMonthFromCompanyDTO from '@modules/transactions/dtos/IFindAllInMonthFromCompanyDTO';

class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transactions>;

  constructor() {
    this.ormRepository = getRepository(Transactions);
  }

  public async findLasTransaction(company_Id: string): Promise<Transactions> {
    // const transaction = await this.ormRepository.find()
    // Falta terminar
    return new Transactions();
  }

  public async findAllInDayFromCompany({
    company_Id,
    day,
    month,
    year,
    type,
  }: IFindAllInDayFromCompanyDTO): Promise<Transactions[]> {
    const parserDay = String(day).padStart(2, '0');
    const parserMonth = String(month).padStart(2, '0');
    const transactions = await this.ormRepository.find({
      where: {
        company_Id,
        created_at: Raw(
          createdAtFildName =>
            `to_char(${createdAtFildName}, 'DD-MM-YYYY') = '${parserDay}-${parserMonth}-${year}'`,
        ),
        type,
      },
    });
    return transactions;
  }

  public async findAllInMonthFromCompany({
    company_Id,
    month,
    type,
    year,
  }: IFindAllInMonthFromCompanyDTO): Promise<Transactions[]> {
    const parserMonth = String(month).padStart(2, '0');
    const transactions = await this.ormRepository.find({
      where: {
        company_Id,
        created_at: Raw(
          createdAtFildName =>
            `to_char(${createdAtFildName}, 'MM-YYYY') = '${parserMonth}-${year}'`,
        ),
        type,
      },
    });
    return transactions;
  }

  public async getBalence(company_Id: string): Promise<IGetBalenceResponseDTO> {
    const companyTransactions = await this.ormRepository.find({
      where: { company_Id },
    });

    const creditTotal = companyTransactions.reduce((acumulator, trasaction) => {
      if (trasaction.type === 'CREDIT') {
        return acumulator + Number(trasaction.value);
      }

      return acumulator;
    }, 0);

    const debitTotal = companyTransactions.reduce((acumulator, trasaction) => {
      if (trasaction.type === 'DEBIT') {
        return acumulator + Number(trasaction.value);
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
  }: ICreateTransactionDTO): Promise<Transactions> {
    const transaction = this.ormRepository.create({
      cardNumber,
      company_Id,
      description,
      trasactionType,
      establishment,
      type,
      value,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(transaction: Transactions): Promise<Transactions> {
    await this.ormRepository.save(transaction);

    return transaction;
  }
}

export default TransactionRepository;

import Transactions from '@modules/transactions/infra/typeorm/entities/Transactions';
import { injectable, inject } from 'tsyringe';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  company_Id: string;
  date: Date;
  type: 'CREDIT' | 'DEBIT';
}

@injectable()
class ListAllCompanyTransactionsFilteringByDateAndTypeService {
  private companyRepository: ICompanyRepository;

  private transactionRepositoy: ITransactionRepository;

  constructor(
    @inject('CompanyRepository')
    companyRepository: ICompanyRepository,
    @inject('TransactionRepository')
    transactionRepositoy: ITransactionRepository,
  ) {
    this.companyRepository = companyRepository;

    this.transactionRepositoy = transactionRepositoy;
  }

  public async execute({
    company_Id,
    date,
    type,
  }: IRequestDTO): Promise<Transactions[]> {
    const company = await this.companyRepository.findById(company_Id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const transactions = await this.transactionRepositoy.findAllTransactionsFilteringByDateAndType(
      {
        company_Id,
        date,
        type,
      },
    );

    return transactions;
  }
}

export default ListAllCompanyTransactionsFilteringByDateAndTypeService;

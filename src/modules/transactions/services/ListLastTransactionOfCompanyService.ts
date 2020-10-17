import Transactions from '@modules/transactions/infra/typeorm/entities/Transactions';
import { injectable, inject } from 'tsyringe';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListLastTransactionOfCompanyService {
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

  public async execute(company_Id: string): Promise<Transactions> {
    const company = await this.companyRepository.findById(company_Id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const transaction = await this.transactionRepositoy.findLasTransaction(
      company_Id,
    );

    return transaction;
  }
}

export default ListLastTransactionOfCompanyService;

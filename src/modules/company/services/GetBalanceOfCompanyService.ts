import { injectable, inject } from 'tsyringe';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import AppError from '@shared/errors/AppError';

interface IResponse {
  creditTotal: number;
  debitTotal: number;
  balanceTotal: number;
}

@injectable()
class GetBalanceOfCompanyService {
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

  public async execute(company_Id: string): Promise<IResponse> {
    const company = await this.companyRepository.findById(company_Id);
    if (!company) {
      throw new AppError('Company not found');
    }
    const balance = await this.transactionRepositoy.getBalence(company_Id);
    return balance;
  }
}

export default GetBalanceOfCompanyService;

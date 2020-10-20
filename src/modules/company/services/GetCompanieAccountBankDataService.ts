import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import BankAccount from '../infra/typeorm/entities/BankAccount';
import IBankAccountRepository from '../repositories/IBankAccountRepository';
import ICompanyRepository from '../repositories/ICompanyRepository';
import generateAccountNumber from './utils/generateAccoutNuber';
import generateNumber from './utils/generateNumber';

interface IRequestDTO {
  company_Id: string;
}
@injectable()
class GetCompanieAccountBankDataService {
  private bankAccountRepository: IBankAccountRepository;

  private companyRepository: ICompanyRepository;

  constructor(
    @inject('BankAccountRepository')
    bankAccountRepository: IBankAccountRepository,
    @inject('CompanyRepository')
    companyRepository: ICompanyRepository,
  ) {
    this.bankAccountRepository = bankAccountRepository;
    this.companyRepository = companyRepository;
  }

  public async execute(company_Id: string): Promise<BankAccount | undefined> {
    const companyExist = await this.companyRepository.findById(company_Id);

    if (!companyExist) {
      throw new AppError('Company not found');
    }

    const bankAccount = await this.bankAccountRepository.findByCompnayId(
      company_Id,
    );

    return bankAccount;
  }
}

export default GetCompanieAccountBankDataService;

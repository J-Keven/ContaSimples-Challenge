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
class CreateBankAccauntService {
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

  public async execute({ company_Id }: IRequestDTO): Promise<BankAccount> {
    const companyExist = await this.companyRepository.findById(company_Id);
    if (!companyExist) {
      throw new AppError('Company not found');
    }
    const accounts = await this.bankAccountRepository.findAllAccounts();
    const accountsNumber = accounts.map(account => account.accountNumber);

    const accountNumber = generateAccountNumber(accountsNumber);

    const accountDigit = generateNumber({ max: 99, min: 1 })
      .toString()
      .padStart(2, '0');
    const bankAccount = await this.bankAccountRepository.create({
      company_Id,
      BankNumber: 999,
      bankName: 'CONTA SIMPLES',
      agencyNumber: 1,
      accountNumber,
      accountDigit,
    });

    await this.bankAccountRepository.save(bankAccount);
    return bankAccount;
  }
}

export default CreateBankAccauntService;

import BankAccount from '@modules/company/infra/typeorm/entities/BankAccount';
import ICreateBankAccountDTO from '@modules/company/dtos/ICreateBankAccountDTO';
import AppError from '@shared/errors/AppError';
import { v4 } from 'uuid';
import IBankAccountRepositry from '../IBankAccountRepository';
import ICompanyRepository from '../ICompanyRepository';

class BankAccountRepositry implements IBankAccountRepositry {
  private bankAccouts: BankAccount[] = [];

  private companyRepository: ICompanyRepository;

  constructor(companyRepository: ICompanyRepository) {
    this.companyRepository = companyRepository;
  }

  public async findAllAccounts(): Promise<BankAccount[]> {
    return this.bankAccouts;
  }

  public async finByAccountNumber(
    accountNumber: string,
  ): Promise<BankAccount | undefined> {
    const bankAccaount = this.bankAccouts.find(
      account => account.accountNumber === accountNumber,
    );
    return bankAccaount;
  }

  public async finByCnpj(cnpj: string): Promise<BankAccount | undefined> {
    const company = await this.companyRepository.findByCnpj(cnpj);
    if (!company) {
      throw new AppError('no companies were found with this CNPJ');
    }

    const bankAccaount = this.bankAccouts.find(
      account => account.company_Id === company.id,
    );

    return bankAccaount;
  }

  public async create({
    BankNumber,
    accountDigit,
    accountNumber,
    agencyNumber,
    bankName,
    company_Id,
  }: ICreateBankAccountDTO): Promise<BankAccount> {
    const bankAccount = new BankAccount();

    Object.assign(bankAccount, {
      id: v4(),
      company_Id,
      BankNumber,
      accountDigit,
      accountNumber,
      agencyNumber,
      bankName,
    });

    this.bankAccouts.push(bankAccount);

    return bankAccount;
  }

  public async save(bankAccaout: BankAccount): Promise<BankAccount> {
    const accountIndex = this.bankAccouts.findIndex(
      account => account.id === bankAccaout.id,
    );

    if (accountIndex === -1) {
      this.bankAccouts.push(bankAccaout);
    } else {
      this.bankAccouts[accountIndex] = bankAccaout;
    }
    return bankAccaout;
  }
}

export default BankAccountRepositry;

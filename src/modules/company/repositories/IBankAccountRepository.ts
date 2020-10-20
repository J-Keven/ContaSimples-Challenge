import BankAccount from '@modules/company/infra/typeorm/entities/BankAccount';
import ICreateBankAccountDTO from '@modules/company/dtos/ICreateBankAccountDTO';

export default interface IBankAccountRepositry {
  findAllAccounts(): Promise<BankAccount[]>;
  finByAccountNumber(accountNumber: string): Promise<BankAccount | undefined>;
  findByCompnayId(company_Id: string): Promise<BankAccount | undefined>;
  create(data: ICreateBankAccountDTO): Promise<BankAccount>;
  save(bankAccaout: BankAccount): Promise<BankAccount>;
}

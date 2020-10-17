import { Repository, getRepository, createQueryBuilder } from 'typeorm';
import BankAccount from '@modules/company/infra/typeorm/entities/BankAccount';
import ICreateBankAccountDTO from '@modules/company/dtos/ICreateBankAccountDTO';
import IBankAccountRepository from '@modules/company/repositories/IBankAccountRepository';

class BankAccountRepository implements IBankAccountRepository {
  private ormRepository: Repository<BankAccount>;

  constructor() {
    this.ormRepository = getRepository(BankAccount);
  }

  public async findAllAccounts(): Promise<BankAccount[]> {
    const bankAccount = await this.ormRepository.find();

    return bankAccount;
  }

  public async finByAccountNumber(
    accountNumber: string,
  ): Promise<BankAccount | undefined> {
    const bankAccount = await this.ormRepository.findOne({
      where: { accountNumber },
    });

    return bankAccount;
  }

  public async create({
    BankNumber,
    accountDigit,
    accountNumber,
    agencyNumber,
    bankName,
    company_Id,
  }: ICreateBankAccountDTO): Promise<BankAccount> {
    const bankAccount = this.ormRepository.create({
      BankNumber,
      accountDigit,
      accountNumber,
      agencyNumber,
      bankName,
      company_Id,
    });

    await this.ormRepository.save(bankAccount);
    return bankAccount;
  }

  public async save(bankAccout: BankAccount): Promise<BankAccount> {
    await this.ormRepository.save(bankAccout);
    return bankAccout;
  }
}

export default BankAccountRepository;
/*







*/

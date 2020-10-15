import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import FakeBankAccountRepository from '@modules/company/repositories/fake/FakeBankAccountRepository';
import CreateBankAccountService from '@modules/company/services/CreateBankAccountService';
import AppError from '@shared/errors/AppError';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeBankAccountRepository: FakeBankAccountRepository;
let createBankAccountService: CreateBankAccountService;
describe('CreateBankAccountService', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeBankAccountRepository = new FakeBankAccountRepository(
      fakeCompanyRepository,
    );
    createBankAccountService = new CreateBankAccountService(
      fakeBankAccountRepository,
      fakeCompanyRepository,
    );
  });

  it('should be able to create a bank account for a company', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    const bankAccount = await createBankAccountService.execute({
      company_Id: company.id,
    });

    expect(bankAccount.id).not.toBeNull();
    expect(bankAccount.company_Id).toBe(company.id);
  });

  it('should not be able to create a bank account for a company no-exist', async () => {
    await expect(
      createBankAccountService.execute({
        company_Id: 'company-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import FakeBankAccountRepository from '@modules/company/repositories/fake/FakeBankAccountRepository';
import GetCompanieAccountBankDataService from '@modules/company/services/GetCompanieAccountBankDataService';
import AppError from '@shared/errors/AppError';
import companyRoutes from '@modules/company/infra/http/routes/company.routes';

let fakeCompanyRepository: FakeCompanyRepository;
let fakeBankAccountRepository: FakeBankAccountRepository;
let getCompanieAccountBankDataService: GetCompanieAccountBankDataService;

describe('GetCompanyAccountBankData', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeBankAccountRepository = new FakeBankAccountRepository(
      fakeCompanyRepository,
    );
    getCompanieAccountBankDataService = new GetCompanieAccountBankDataService(
      fakeBankAccountRepository,
      fakeCompanyRepository,
    );
  });

  it('should be able to list all data of bank account from company', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-da-empresa',
      email: 'empresa@empresa.com',
      name: 'Empresa S/A',
      password: '123456',
    });

    const bacnkAccount = await fakeBankAccountRepository.create({
      BankNumber: 999,
      accountNumber: '123456789',
      accountDigit: '01',
      agencyNumber: 0,
      bankName: 'jest test',
      company_Id: company.id,
    });

    const bankAccountOfCompany = await getCompanieAccountBankDataService.execute(
      company.id,
    );

    expect(bankAccountOfCompany?.BankNumber).toBe(bacnkAccount.BankNumber);
  });

  it('should not be able to list all data of bank account from company if company no exist', async () => {
    expect(
      getCompanieAccountBankDataService.execute('12356'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

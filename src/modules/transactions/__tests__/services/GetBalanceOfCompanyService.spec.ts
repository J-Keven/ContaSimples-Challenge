import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import FakeTransactionRepository from '@modules/transactions/repositories/fake/FakeTransactionRepository';
import GetBalanceOfCompanyService from '@modules/transactions/services/GetBalanceOfCompanyService';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import AppError from '@shared/errors/AppError';

let fakeComapanyRepository: ICompanyRepository;
let fakeTransacionRepository: ITransactionRepository;
let getBalanceOfCompanyService: GetBalanceOfCompanyService;

describe('GetBalanceOfCompany', () => {
  beforeEach(() => {
    fakeComapanyRepository = new FakeCompanyRepository();
    fakeTransacionRepository = new FakeTransactionRepository();
    getBalanceOfCompanyService = new GetBalanceOfCompanyService(
      fakeComapanyRepository,
      fakeTransacionRepository,
    );
  });
  it('should be able to return of balance from company', async () => {
    const company = await fakeComapanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'jets-credit',
      trasactionType: 'TED',
      value: 1000,
      establishment: 'test-test',
      type: 'CREDIT',
    });

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'cloud s3 amazon',
      trasactionType: 'PIX',
      value: 200,
      establishment: 'amazon s3',
      type: 'DEBIT',
    });

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'stickers',
      trasactionType: 'TED',
      value: 100,
      establishment: 'stickers-company',
      type: 'DEBIT',
    });

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'monitor gamer',
      trasactionType: 'TED',
      value: 900,
      establishment: 'gamer-company',
      type: 'DEBIT',
    });

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'salary',
      trasactionType: 'PIX',
      value: 3000,
      establishment: 'my-company',
      type: 'CREDIT',
    });

    const balance = await getBalanceOfCompanyService.execute(company.id);

    expect(balance.balanceTotal).toBe(2800);
    expect(balance.creditTotal).toBe(4000);
    expect(balance.debitTotal).toBe(1200);
  });

  it('should be able to return of balance from company', async () => {
    expect(
      getBalanceOfCompanyService.execute('company-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import FakeTransactionRepository from '@modules/transactions/repositories/fake/FakeTransactionRepository';
import ListLastTransactionOfComapny from '@modules/transactions/services/ListLastTransactionOfCompanyService';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import AppError from '@shared/errors/AppError';

let fakeComapanyRepository: ICompanyRepository;
let fakeTransacionRepository: ITransactionRepository;
let listLastTransactionOfComapny: ListLastTransactionOfComapny;

describe('ListLastTransactionOfComapny', () => {
  beforeEach(() => {
    fakeComapanyRepository = new FakeCompanyRepository();
    fakeTransacionRepository = new FakeTransactionRepository();
    listLastTransactionOfComapny = new ListLastTransactionOfComapny(
      fakeComapanyRepository,
      fakeTransacionRepository,
    );
  });
  it(`should be able to return a company's last transaction`, async () => {
    const company = await fakeComapanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 9, 15).getTime());

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'jets-credit',
      trasactionType: 'TED',
      value: 1000,
      establishment: 'test-test',
      type: 'CREDIT',
    });

    const transaction2 = await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'monitor gamer',
      trasactionType: 'TED',
      value: 900,
      establishment: 'gamer-company',
      type: 'CREDIT',
    });

    const transaction = await listLastTransactionOfComapny.execute(company.id);
    expect(transaction).toBe(transaction2);
  });

  it('should not be able to return all transactions on the specified date and filtered by type "credit" if company id no exist', async () => {
    await expect(
      listLastTransactionOfComapny.execute('company_id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

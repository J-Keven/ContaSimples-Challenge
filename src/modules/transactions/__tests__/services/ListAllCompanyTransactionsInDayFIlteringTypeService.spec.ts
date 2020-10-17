import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import FakeTransactionRepository from '@modules/transactions/repositories/fake/FakeTransactionRepository';
import ListAllCompanyTransactionsInDayFIlteringTypeService from '@modules/transactions/services/ListAllCompanyTransactionsInDayFilteringTypeService';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import AppError from '@shared/errors/AppError';

let fakeComapanyRepository: ICompanyRepository;
let fakeTransacionRepository: ITransactionRepository;
let listAllCompanyTransactionsInDayFIlteringTypeService: ListAllCompanyTransactionsInDayFIlteringTypeService;

describe('ListAllCompanyTransactionsInDayFIlteringType', () => {
  beforeEach(() => {
    fakeComapanyRepository = new FakeCompanyRepository();
    fakeTransacionRepository = new FakeTransactionRepository();
    listAllCompanyTransactionsInDayFIlteringTypeService = new ListAllCompanyTransactionsInDayFIlteringTypeService(
      fakeComapanyRepository,
      fakeTransacionRepository,
    );
  });
  it('should be able to return all transactions on the day and filtered by type "credit"', async () => {
    const company = await fakeComapanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 9, 15).getTime());

    const transaction1 = await fakeTransacionRepository.create({
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

    const transaction3 = await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'cloud s3 amazon',
      trasactionType: 'PIX',
      value: 200,
      establishment: 'amazon s3',
      type: 'DEBIT',
    });

    const transaction4 = await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'stickers',
      trasactionType: 'TED',
      value: 100,
      establishment: 'stickers-company',
      type: 'DEBIT',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 16).getTime());

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'salary',
      trasactionType: 'PIX',
      value: 3000,
      establishment: 'my-company',
      type: 'CREDIT',
    });

    const transactions = await listAllCompanyTransactionsInDayFIlteringTypeService.execute(
      {
        company_Id: company.id,
        day: 15,
        month: 10,
        year: 2020,
        type: 'CREDIT',
      },
    );
    expect(transactions.length).toBe(2);
    expect(transactions).toStrictEqual([transaction1, transaction2]);
  });

  it('should not be able to return all transactions on the day and filtered by type "credit" if company id no exist', async () => {
    await expect(
      listAllCompanyTransactionsInDayFIlteringTypeService.execute({
        company_Id: 'company-id',
        day: 15,
        month: 10,
        year: 2020,
        type: 'CREDIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return all transactions on the day and filtered by type "debit"', async () => {
    const company = await fakeComapanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 9, 15).getTime());

    const transaction1 = await fakeTransacionRepository.create({
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

    const transaction3 = await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'cloud s3 amazon',
      trasactionType: 'PIX',
      value: 200,
      establishment: 'amazon s3',
      type: 'DEBIT',
    });

    const transaction4 = await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'stickers',
      trasactionType: 'TED',
      value: 100,
      establishment: 'stickers-company',
      type: 'DEBIT',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 9, 16).getTime());

    await fakeTransacionRepository.create({
      company_Id: company.id,
      description: 'salary',
      trasactionType: 'PIX',
      value: 3000,
      establishment: 'my-company',
      type: 'CREDIT',
    });

    const transactions = await listAllCompanyTransactionsInDayFIlteringTypeService.execute(
      {
        company_Id: company.id,
        day: 15,
        month: 10,
        year: 2020,
        type: 'DEBIT',
      },
    );
    expect(transactions.length).toBe(2);
    expect(transactions).toStrictEqual([transaction3, transaction4]);
  });

  it('should not be able to return all transactions on the day and filtered by type "debit" if company id no exist', async () => {
    await expect(
      listAllCompanyTransactionsInDayFIlteringTypeService.execute({
        company_Id: 'company-id',
        day: 15,
        month: 10,
        year: 2020,
        type: 'DEBIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

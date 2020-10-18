import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import FakeTransactionRepository from '@modules/transactions/repositories/fake/FakeTransactionRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import IComapnyRepository from '@modules/company/repositories/ICompanyRepository';
import IBankAccountRepository from '@modules/company/repositories/IBankAccountRepository';
import FakeBankAccountRepository from '@modules/company/repositories/fake/FakeBankAccountRepository';
import ICardRepository from '@modules/cards/repositories/ICardsRepository';
import FakeCardRepository from '@modules/cards/repositories/fake/FakeCardsRepository';
import AppError from '@shared/errors/AppError';

let fakeTransactionRepository: ITransactionRepository;
let fakeCompanyRepository: IComapnyRepository;
let fakeBankAccountRepository: IBankAccountRepository;
let fakeCardRepository: ICardRepository;
let createTransactionService: CreateTransactionService;

describe('CreateTransaction', () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();

    fakeCompanyRepository = new FakeCompanyRepository();

    fakeCardRepository = new FakeCardRepository();

    fakeBankAccountRepository = new FakeBankAccountRepository(
      fakeCompanyRepository,
    );

    createTransactionService = new CreateTransactionService(
      fakeTransactionRepository,
      fakeCompanyRepository,
      fakeCardRepository,
    );
  });

  it('shoud be able to create a credit transaction for a company', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeBankAccountRepository.create({
      BankNumber: 999,
      accountDigit: '01',
      accountNumber: '123456',
      agencyNumber: 1,
      bankName: 'test bank',
      company_Id: company.id,
    });

    const transaction = await createTransactionService.execute({
      company_Id: company.id,
      description: 'transaction test',
      trasactionType: 'TED',
      value: 500.0,
      type: 'CREDIT',
    });

    const balance = await fakeTransactionRepository.getBalence(company.id);
    expect(transaction.id).not.toBeNull();
    expect(transaction.company_Id).toBe(company.id);
    expect(balance.balanceTotal).toBe(500.0);
  });

  it('shoud be able to create a debit transaction for a company', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeBankAccountRepository.create({
      BankNumber: 999,
      accountDigit: '01',
      accountNumber: '123456',
      agencyNumber: 1,
      bankName: 'test bank',
      company_Id: company.id,
    });

    await createTransactionService.execute({
      company_Id: company.id,
      description: 'transaction test',
      trasactionType: 'TED',
      value: 1000.0,
      type: 'CREDIT',
    });

    const transaction = await createTransactionService.execute({
      company_Id: company.id,
      description: 'transaction test',
      trasactionType: 'TED',
      establishment: 'jets-test',
      value: 300.0,
      type: 'DEBIT',
    });

    const balance = await fakeTransactionRepository.getBalence(company.id);

    expect(transaction.id).not.toBeNull();
    expect(transaction.company_Id).toBe(company.id);
    expect(balance.balanceTotal).toBe(700.0);
  });

  it('should not be able to create a new transaction for a company if the company ID does not exist', async () => {
    await expect(
      createTransactionService.execute({
        company_Id: 'id-company-test',
        description: 'transaction test',
        trasactionType: 'TED',
        value: 500.0,
        type: 'CREDIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a debit transaction for a company with an insufficient balance', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeBankAccountRepository.create({
      BankNumber: 999,
      accountDigit: '01',
      accountNumber: '123456',
      agencyNumber: 1,
      bankName: 'test bank',
      company_Id: company.id,
    });

    await expect(
      createTransactionService.execute({
        company_Id: company.id,
        description: 'transaction test',
        trasactionType: 'TED',
        value: 500.0,
        type: 'DEBIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a debit transaction with card', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeBankAccountRepository.create({
      BankNumber: 999,
      accountDigit: '01',
      accountNumber: '123456',
      agencyNumber: 1,
      bankName: 'test bank',
      company_Id: company.id,
    });

    const card = await fakeCardRepository.create({
      cardName: 'jest-card',
      cardNumber: '0101 0202 0303 0404',
      ccv: 123,
      company_Id: company.id,
    });

    await createTransactionService.execute({
      company_Id: company.id,
      description: 'jest test credit',
      trasactionType: 'PIX',
      value: 600,
      type: 'CREDIT',
    });

    const transaction = await createTransactionService.execute({
      company_Id: company.id,
      description: 'jest test debit of card',
      trasactionType: 'CARD',
      value: 400,
      cardNumber: card.cardNumber,
      establishment: 'test-test',
      type: 'DEBIT',
    });

    const balance = await fakeTransactionRepository.getBalence(company.id);

    expect(balance.balanceTotal).toBe(200);
    expect(transaction.endOfCard).toBe('0404');
  });

  it('should not be able to create a debit transaction with transaction type CARD if card if card number no exist', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeBankAccountRepository.create({
      BankNumber: 999,
      accountDigit: '01',
      accountNumber: '123456',
      agencyNumber: 1,
      bankName: 'test bank',
      company_Id: company.id,
    });

    const card = await fakeCardRepository.create({
      cardName: 'jest-card',
      cardNumber: '0101 0202 0303 0404',
      ccv: 123,
      company_Id: company.id,
    });

    await createTransactionService.execute({
      company_Id: company.id,
      description: 'jest test credit',
      trasactionType: 'PIX',
      value: 600,
      type: 'CREDIT',
    });

    expect(
      createTransactionService.execute({
        company_Id: company.id,
        description: 'jest test debit of card',
        trasactionType: 'CARD',
        value: 400,
        establishment: 'test-test',
        type: 'DEBIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a debit transaction with transaction type CARD if card format is invalid', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeCardRepository.create({
      cardName: 'jest-card',
      cardNumber: '0101 0202 0303 0404',
      ccv: 123,
      company_Id: company.id,
    });

    await createTransactionService.execute({
      company_Id: company.id,
      description: 'jest test debit of card',
      trasactionType: 'TED',
      value: 1000,
      establishment: 'test-test',
      type: 'CREDIT',
    });

    await expect(
      createTransactionService.execute({
        company_Id: company.id,
        description: 'jest test debit of card',
        trasactionType: 'CARD',
        cardNumber: '0101 0202 0303-0404',
        value: 400,
        establishment: 'test-test',
        type: 'DEBIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a debit transaction with transaction type CARD if card number is invalid', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await fakeCardRepository.create({
      cardName: 'jest-card',
      cardNumber: '0101 0202 0303 0404',
      ccv: 123,
      company_Id: company.id,
    });

    await createTransactionService.execute({
      company_Id: company.id,
      description: 'jest test debit of card',
      trasactionType: 'TED',
      value: 1000,
      establishment: 'test-test',
      type: 'CREDIT',
    });

    await expect(
      createTransactionService.execute({
        company_Id: company.id,
        description: 'jest test debit of card',
        trasactionType: 'CARD',
        cardNumber: '0101 0202 0303 04',
        value: 400,
        establishment: 'test-test',
        type: 'DEBIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a debit transaction with transaction type CARD if card no exist', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await createTransactionService.execute({
      company_Id: company.id,
      description: 'jest test debit of card',
      trasactionType: 'TED',
      value: 1000,
      establishment: 'test-test',
      type: 'CREDIT',
    });

    await expect(
      createTransactionService.execute({
        company_Id: company.id,
        description: 'jest test debit of card',
        trasactionType: 'CARD',
        cardNumber: '0101 0202 0303 0404',
        value: 400,
        establishment: 'test-test',
        type: 'DEBIT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// Credito === deposito
// Debito === saque

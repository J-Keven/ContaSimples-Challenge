import FakeCardRepository from '@modules/cards/repositories/fake/FakeCardRepository';
import ICardRepository from '@modules/cards/repositories/ICardRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import FakeTransactionRepository from '@modules/transactions/repositories/fake/FakeTransactionRepository';
import ListAllCompanyTransacitionFilteringToCard from '@modules/transactions/services/ListAllCompanyTransacitionFilteringToCardService';
import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import AppError from '@shared/errors/AppError';

let fakeCardRepository: ICardRepository;
let fakeCompanyRepository: ICompanyRepository;
let fakeTransactionRepository: ITransactionRepository;
let listAllCompanyTransacitionFilteringToCard: ListAllCompanyTransacitionFilteringToCard;
describe('ListAllCompanyTransacitionFilteringToCard', () => {
  beforeEach(() => {
    fakeCardRepository = new FakeCardRepository();
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeTransactionRepository = new FakeTransactionRepository();

    listAllCompanyTransacitionFilteringToCard = new ListAllCompanyTransacitionFilteringToCard(
      fakeTransactionRepository,
      fakeCompanyRepository,
      fakeCardRepository,
    );
  });
  it('should be albe to list all transaction filtiring by cart', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'compane-cnpj',
      email: 'company@example.cpm',
      name: 'EMPRESA S/A',
      password: '123456',
    });

    const card1 = await fakeCardRepository.create({
      cardName: 'debit card',
      cardNumber: '1234 1234 1234 1234',
      ccv: 123,
      company_Id: company.id,
    });

    const card2 = await fakeCardRepository.create({
      cardName: 'debit card',
      cardNumber: '0000 0000 0000 0000',
      ccv: 123,
      company_Id: company.id,
    });

    await fakeTransactionRepository.create({
      company_Id: company.id,
      description: 'jets-credit',
      trasactionType: 'TED',
      value: 100000,
      establishment: 'test-test',
      type: 'CREDIT',
    });

    const transaction1 = await fakeTransactionRepository.create({
      company_Id: company.id,
      description: 'jets-credit',
      trasactionType: 'CARD',
      cardNumber: card1.cardNumber,
      value: 100,
      establishment: 'test-test',
      type: 'DEBIT',
    });

    await fakeTransactionRepository.create({
      company_Id: company.id,
      description: 'monitor gamer',
      trasactionType: 'CARD',
      cardNumber: card2.cardNumber,
      value: 90,
      establishment: 'gamer-company',
      type: 'CREDIT',
    });

    const transaction3 = await fakeTransactionRepository.create({
      company_Id: company.id,
      description: 'cloud s3 amazon',
      trasactionType: 'CARD',
      cardNumber: card1.cardNumber,
      value: 200,
      establishment: 'amazon s3',
      type: 'DEBIT',
    });

    const transaction4 = await fakeTransactionRepository.create({
      company_Id: company.id,
      description: 'stickers',
      trasactionType: 'CARD',
      cardNumber: card1.cardNumber,
      value: 100,
      establishment: 'stickers-company',
      type: 'DEBIT',
    });

    await fakeTransactionRepository.create({
      company_Id: company.id,
      description: 'salary',
      trasactionType: 'PIX',
      value: 3000,
      establishment: 'my-company',
      type: 'CREDIT',
    });

    const transactios = await listAllCompanyTransacitionFilteringToCard.execute(
      {
        cardNumber: card1.cardNumber,
        company_Id: company.id,
      },
    );
    expect(transactios.length).toBe(3);
  });
  it('should not be albe to list all transaction filtiring by cart if company no exist', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'compane-cnpj',
      email: 'company@example.cpm',
      name: 'EMPRESA S/A',
      password: '123456',
    });

    const card1 = await fakeCardRepository.create({
      cardName: 'debit card',
      cardNumber: '1234 1234 1234 1234',
      ccv: 123,
      company_Id: company.id,
    });

    await expect(
      listAllCompanyTransacitionFilteringToCard.execute({
        cardNumber: card1.cardNumber,
        company_Id: 'comany-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be albe to list all transaction filtiring by cart if cart from company no exist', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'compane-cnpj',
      email: 'company@example.cpm',
      name: 'EMPRESA S/A',
      password: '123456',
    });

    const card1 = await fakeCardRepository.create({
      cardName: 'debit card',
      cardNumber: '1234 1234 1234 1234',
      ccv: 123,
      company_Id: company.id,
    });

    await expect(
      listAllCompanyTransacitionFilteringToCard.execute({
        cardNumber: '0000 0000 0000 0000',
        company_Id: company.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import ICardReporsitory from '@modules/cards/repositories/ICardsRepository';
import FakeCardReporsitory from '@modules/cards/repositories/fake/FakeCardsRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import CreateCardService from '@modules/cards/services/CreateCardService';
import AppError from '@shared/errors/AppError';

let fakeCardRepository: ICardReporsitory;
let fakeCompanyRepository: ICompanyRepository;
let createCardService: CreateCardService;
describe('CreateCard', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeCardRepository = new FakeCardReporsitory();
    createCardService = new CreateCardService(
      fakeCardRepository,
      fakeCompanyRepository,
    );
  });

  it('should be able to add a new card to company', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    const card = await createCardService.execute({
      cardName: 'card-test',
      cardNumber: '1234 5678 1234 3456',
      ccv: 123,
      company_Id: company.id,
    });

    expect(card.id).not.toBeNull();
    expect(card.company_Id).toBe(company.id);
  });

  it('should not be able to add a new card to company if the namber or format is invalid', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await expect(
      createCardService.execute({
        cardName: 'card-test',
        cardNumber: '1234 5678 1234',
        ccv: 123,
        company_Id: company.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createCardService.execute({
        cardName: 'card-test',
        cardNumber: '1234567812343456',
        ccv: 123,
        company_Id: company.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a new card if company id does not exist', async () => {
    await expect(
      createCardService.execute({
        cardName: 'card-test',
        cardNumber: '1234 5678 1234 3456',
        ccv: 123,
        company_Id: 'company-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a new card with the number already registered', async () => {
    const company = await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await createCardService.execute({
      cardName: 'card-test',
      cardNumber: '1234 5678 1234 3456',
      ccv: 123,
      company_Id: company.id,
    });

    await expect(
      createCardService.execute({
        cardName: 'card2-test',
        cardNumber: '1234 5678 1234 3456',
        ccv: 456,
        company_Id: company.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

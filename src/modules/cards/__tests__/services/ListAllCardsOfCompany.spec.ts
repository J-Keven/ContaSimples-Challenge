import ICardsRepsoitory from '@modules/cards/repositories/ICardsRepository';
import FakeCardsRepository from '@modules/cards/repositories/fake/FakeCardsRepository';
import ICompanyRepositroy from '@modules/company/repositories/ICompanyRepository';
import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import ListAllCardsOfCompany from '@modules/cards/services/ListAllCardsOfCompanyService';
import AppError from '@shared/errors/AppError';

let fakeCardsRepository: ICardsRepsoitory;
let fakeCompanyRepsitroy: ICompanyRepositroy;
let listAllCardsOfCompany: ListAllCardsOfCompany;

describe('ListAllCardsOfCompany', () => {
  beforeEach(() => {
    fakeCardsRepository = new FakeCardsRepository();
    fakeCompanyRepsitroy = new FakeCompanyRepository();
    listAllCardsOfCompany = new ListAllCardsOfCompany(
      fakeCardsRepository,
      fakeCompanyRepsitroy,
    );
  });
  it('should be able to list all cards the a company', async () => {
    const company = await fakeCompanyRepsitroy.create({
      cnpj: '123456789011',
      email: 'company@example.com',
      name: 'EMPRESA S/A',
      password: '123456',
    });

    const card1 = await fakeCardsRepository.create({
      cardName: 'card1',
      cardNumber: '0000 0000 0000 0000',
      ccv: 123,
      company_Id: company.id,
    });

    const card2 = await fakeCardsRepository.create({
      cardName: 'card1',
      cardNumber: '0000 0000 0000 0000',
      ccv: 123,
      company_Id: company.id,
    });

    const cards = await listAllCardsOfCompany.execute(company.id);

    expect(cards).toStrictEqual([card1, card2]);
  });

  it('should not be albe to list all carts of company if company no exist', async () => {
    await expect(
      listAllCardsOfCompany.execute('company-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

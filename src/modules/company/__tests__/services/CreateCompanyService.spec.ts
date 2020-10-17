import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepository';
import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import AppError from '@shared/errors/AppError';
import IHasProvider from '@shared/container/HashProvider/model/IHashProvider';
import FakeHashProvider from '@shared/container/HashProvider/fake/FakeHashProvider';

let fakeCompanyRepository: FakeCompanyRepository;
let createCompanyService: CreateCompanyService;
let fakeHashProvider: IHasProvider;
describe('CreateCompanyService', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeHashProvider = new FakeHashProvider();
    createCompanyService = new CreateCompanyService(
      fakeCompanyRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new accout', async () => {
    const createCompany = jest.spyOn(fakeCompanyRepository, 'create');

    const company = await createCompanyService.execute({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    expect(createCompany).toHaveBeenCalledWith({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    expect(company.id).not.toBeNull();
  });

  it('should not be able to create a new account with a exist cnpj', async () => {
    await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa1',
      name: 'EMPRESA 1 S/A',
      email: 'empresasa1@exmaple.com',
      password: '123456',
    });

    await expect(
      createCompanyService.execute({
        cnpj: 'cnpj-empresa1',
        name: 'EMPRESA 2 S/A',
        email: 'empresasa2@exmaple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new account with a exist email', async () => {
    await fakeCompanyRepository.create({
      cnpj: 'cnpj-empresa1',
      name: 'EMPRESA 1 S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    await expect(
      createCompanyService.execute({
        cnpj: 'cnpj-empresa2',
        name: 'EMPRESA 2 S/A',
        email: 'empresasa@exmaple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new accout if password does not encrypted', async () => {
    const createHash = jest.spyOn(fakeHashProvider, 'create');

    await createCompanyService.execute({
      cnpj: 'cnpj-empresa',
      name: 'EMPRESA S/A',
      email: 'empresasa@exmaple.com',
      password: '123456',
    });

    expect(createHash).toBeCalledWith('123456');
  });
});

import FakeCompanyRepository from '@modules/company/repositories/fake/FakeCompanyRepositry';
import CreateSessionService from '@modules/company/services/CreateSessionService';
import AppError from '@shared/errors/AppError';
import IHasProvider from '@modules/company/infra/providers/HashProvider/model/IHashProvider';
import FakeHashProvider from '@modules/company/infra/providers/HashProvider/fake/FakeHashProvider';
import ITokenProvider from '@modules/company/infra/providers/TokenProvider/models/ITokenProvider';
import FakeTokenProvider from '@modules/company/infra/providers/TokenProvider/fake/FakeTokenProvider';

let fakeCompanyRepository: FakeCompanyRepository;
let createSessionService: CreateSessionService;
let fakeHashProvider: IHasProvider;
let fakeTokenProvider: ITokenProvider;

describe('CreateCompanyService', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();
    createSessionService = new CreateSessionService(
      fakeCompanyRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it('should be able to create a login session for a company', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'EMPRESA s/a',
      cnpj: 'cnpj-empresa',
      email: 'empresa@example.com',
      password: '123456',
    });

    const createToken = jest.spyOn(fakeTokenProvider, 'create');

    const session = await createSessionService.execute({
      email: 'empresa@example.com',
      password: '123456',
    });

    expect(createToken).toBeCalledWith(company);
    expect(session.company.id).toBe(company.id);
  });
  it('should be able to create a login session for a company with email or password incorrect', async () => {
    const company = await fakeCompanyRepository.create({
      name: 'EMPRESA s/a',
      cnpj: 'cnpj-empresa',
      email: 'empresa@example.com',
      password: '123456',
    });

    await expect(
      createSessionService.execute({
        email: 'example@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createSessionService.execute({
        email: 'empresa@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

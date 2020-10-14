import AppError from '@shared/errors/AppError';
import IHashProvider from '../infra/providers/HashProvider/model/IHashProvider';
import ITokenProvider from '../infra/providers/TokenProvider/models/ITokenProvider';
import Company from '../infra/typeorm/entities/Company';
import ICompanyRepository from '../repositories/ICompanyRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  company: Company;
  token: string;
}

class CreateSessionService {
  private hashProvider: IHashProvider;

  private companyRepository: ICompanyRepository;

  private tokenProvider: ITokenProvider;

  constructor(
    companyRepository: ICompanyRepository,
    hashProvider: IHashProvider,
    tokenProvider: ITokenProvider,
  ) {
    this.companyRepository = companyRepository;
    this.hashProvider = hashProvider;
    this.tokenProvider = tokenProvider;
  }

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const company = await this.companyRepository.findByEmail(email);

    if (!company) {
      throw new AppError('Email/passwor incorrect');
    }

    const isPassword = await this.hashProvider.compare({
      hash: company.password,
      payload: password,
    });

    if (!isPassword) {
      throw new AppError('Email/passwor incorrect');
    }

    const token = await this.tokenProvider.create(company);

    return {
      company,
      token,
    };
  }
}

export default CreateSessionService;

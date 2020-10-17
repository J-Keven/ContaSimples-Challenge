import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../../../shared/container/HashProvider/model/IHashProvider';
import ITokenProvider from '../infra/providers/TokenProvider/models/ITokenProvider';
import Company from '../infra/typeorm/entities/Company';
import ICompanyRepository from '../repositories/ICompanyRepository';

interface IRequestDTO {
  cnpj: string;
  password: string;
}

interface IResponseDTO {
  company: Company;
  token: string;
}

@injectable()
class CreateSessionService {
  private hashProvider: IHashProvider;

  private companyRepository: ICompanyRepository;

  private tokenProvider: ITokenProvider;

  constructor(
    @inject('CompanyRepository')
    companyRepository: ICompanyRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
    @inject('TokenProvider')
    tokenProvider: ITokenProvider,
  ) {
    this.companyRepository = companyRepository;
    this.hashProvider = hashProvider;
    this.tokenProvider = tokenProvider;
  }

  public async execute({ cnpj, password }: IRequestDTO): Promise<IResponseDTO> {
    const company = await this.companyRepository.findByCnpj(cnpj);

    if (!company) {
      throw new AppError('Cnpj/password incorrect');
    }

    const isPassword = await this.hashProvider.compare({
      hash: company.password,
      payload: password,
    });

    if (!isPassword) {
      throw new AppError('Cnpj/password incorrect');
    }

    const token = await this.tokenProvider.create(company);

    return {
      company,
      token,
    };
  }
}

export default CreateSessionService;

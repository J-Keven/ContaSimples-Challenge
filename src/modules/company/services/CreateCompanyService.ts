import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHasProvider from '@shared/container/HashProvider/model/IHashProvider';
import ICreateCompany from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';
import ICompanyRepositry from '../repositories/ICompanyRepository';

@injectable()
class CreateCompanyService {
  private companyRepository: ICompanyRepositry;

  private hashProvider: IHasProvider;

  constructor(
    @inject('CompanyRepository')
    companyRepository: ICompanyRepositry,
    @inject('HashProvider')
    hashProvider: IHasProvider,
  ) {
    this.companyRepository = companyRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    name,
    cnpj,
    email,
    password,
  }: ICreateCompany): Promise<Company> {
    if (await this.companyRepository.findByCnpj(cnpj)) {
      throw new AppError(
        'there is already a company registered with this cnpj',
      );
    }

    if (await this.companyRepository.findByEmail(email)) {
      throw new AppError(
        'there is already a company registered with this email',
      );
    }

    const hasPasswor = await this.hashProvider.create(password);

    const company = await this.companyRepository.create({
      name,
      email,
      cnpj,
      password: hasPasswor,
    });

    return company;
  }
}

export default CreateCompanyService;

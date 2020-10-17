import { v4 } from 'uuid';
import Company from '@modules/company/infra/typeorm/entities/Company';
import ICreateCompany from '@modules/company/dtos/ICreateCompanyDTO';
import AppError from '@shared/errors/AppError';
import ICompanyRepository from '../ICompanyRepository';

class FakeCompanyRepository implements ICompanyRepository {
  private companies: Company[] = [];

  public async findById(id: string): Promise<Company | undefined> {
    const company = this.companies.find(companyItem => companyItem.id === id);
    return company;
  }

  public async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const company = this.companies.find(
      companyItem => companyItem.cnpj === cnpj,
    );
    return company;
  }

  public async findByEmail(emial: string): Promise<Company | undefined> {
    const company = this.companies.find(
      companyItem => companyItem.email === emial,
    );
    return company;
  }

  public async create({
    cnpj,
    email,
    name,
    password,
  }: ICreateCompany): Promise<Company> {
    const company = new Company();
    Object.assign(company, {
      id: v4(),
      name,
      cnpj,
      email,
      password,
      balance: 0,
    });

    this.companies.push(company);
    return company;
  }
}

export default FakeCompanyRepository;

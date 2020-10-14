import { v4 } from 'uuid';
import Company from '@modules/company/infra/typeorm/entities/Company';
import ICreateCompany from '@modules/company/dtos/ICreateCompanyDTO';
import ICompanyRepository from '../ICompanyRepository';

class FakeCompanyRepository implements ICompanyRepository {
  private companies: Company[] = [];

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
    });

    this.companies.push(company);
    return company;
  }
}

export default FakeCompanyRepository;

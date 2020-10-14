import { Repository, getRepository } from 'typeorm';
import Company from '@modules/company/infra/typeorm/entities/Company';
import ICreateCompany from '@modules/company/dtos/ICreateCompanyDTO';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

class CompanyRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: cnpj,
    });

    return company;
  }

  public async findByEmail(emial: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: emial,
    });

    return company;
  }

  public async create({
    cnpj,
    email,
    name,
    password,
  }: ICreateCompany): Promise<Company> {}
}

export default CompanyRepository;

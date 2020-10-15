import Company from '../infra/typeorm/entities/Company';
import ICreateCompany from '../dtos/ICreateCompanyDTO';

export default interface ICompanyRepositry {
  create(data: ICreateCompany): Promise<Company>;
  findByCnpj(cnpj: string): Promise<Company | undefined>;
  findByEmail(email: string): Promise<Company | undefined>;
  findById(id: string): Promise<Company | undefined>;
}

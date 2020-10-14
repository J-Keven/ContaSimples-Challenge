import Company from '@modules/company/infra/typeorm/entities/Company';

export default interface ITokenProvider {
  create(payload: Company): Promise<string>;
  verify(token: string): Promise<string>;
}

import Company from '@modules/company/infra/typeorm/entities/Company';
import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public async create({ id }: Company): Promise<string> {
    return id;
  }

  public async verify(token: string): Promise<string> {
    return '';
  }
}

export default FakeTokenProvider;

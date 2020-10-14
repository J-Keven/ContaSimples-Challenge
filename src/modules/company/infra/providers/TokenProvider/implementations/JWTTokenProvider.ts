import jwt from 'jsonwebtoken';
import Company from '@modules/company/infra/typeorm/entities/Company';
import jwtConfigs from '@modules/company/configs/jwtConfigs';
import ITokenProvider from '../models/ITokenProvider';

class JWTTokenProvider implements ITokenProvider {
  public async create({ id }: Company): Promise<string> {
    const { expiresIn, secretKey } = jwtConfigs;
    const token = jwt.sign({}, secretKey, {
      subject: id,
      expiresIn,
    });
    return token;
  }

  public async verify(token: string): Promise<string> {
    const { secretKey } = jwtConfigs;
    const decode = jwt.verify(token, secretKey);
    console.log(decode);
    return '';
  }
}

export default JWTTokenProvider;

import bcrypt from 'bcryptjs';
import IHashProvider from '../model/IHashProvider';
import ICompareDTO from '../dtos/ICompareDTO';

class BcrytpHashProvider implements IHashProvider {
  public async create(payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, 8);
    return hash;
  }

  public async compare({ hash, payload }: ICompareDTO): Promise<boolean> {
    return bcrypt.compare(payload, hash);
  }
}

export default BcrytpHashProvider;

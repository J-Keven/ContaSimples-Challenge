import IHashPasswordProvider from '../model/IHashProvider';
import ICompareDTO from '../dtos/ICompareDTO';

class FakeHashPasswordProvider implements IHashPasswordProvider {
  public async create(payload: string): Promise<string> {
    return payload;
  }

  public async compare({ hash, payload }: ICompareDTO): Promise<boolean> {
    return hash === payload;
  }
}

export default FakeHashPasswordProvider;

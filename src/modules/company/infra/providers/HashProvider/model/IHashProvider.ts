import ICompareDTO from '../dtos/ICompareDTO';

export default interface IHashPassword {
  create(paylod: string): Promise<string>;
  compare(data: ICompareDTO): Promise<boolean>;
}

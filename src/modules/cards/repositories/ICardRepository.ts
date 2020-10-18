import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import IFindByNumberDTO from '@modules/cards/dtos/IFindByNumberDTO';

export default interface ICardRepository {
  create(data: ICreateCardDTO): Promise<Cards>;
  findByNumber(data: IFindByNumberDTO): Promise<Cards | undefined>;
}

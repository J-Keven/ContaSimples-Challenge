import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';

export default interface ICardRepository {
  create(data: ICreateCardDTO): Promise<Cards>;
  findByNumber(number: string): Promise<Cards | undefined>;
}

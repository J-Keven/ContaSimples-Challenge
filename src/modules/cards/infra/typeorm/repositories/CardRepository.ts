import { Repository, getRepository } from 'typeorm';

import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import ICardRepository from '@modules/cards/repositories/ICardRepository';

class CardsRepository implements ICardRepository {
  private ormRepository: Repository<Cards>;

  constructor() {
    this.ormRepository = getRepository(Cards);
  }

  public async findByNumber(number: string): Promise<Cards | undefined> {
    const card = await this.ormRepository.findOne({
      where: { cardNumber: number },
    });
    return card;
  }

  public async create({
    cardName,
    cardNumber,
    ccv,
    company_Id,
  }: ICreateCardDTO): Promise<Cards> {
    const card = this.ormRepository.create({
      cardName,
      cardNumber,
      ccv,
      company_Id,
    });

    this.ormRepository.save(card);

    return card;
  }
}

export default CardsRepository;

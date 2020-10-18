import { Repository, getRepository } from 'typeorm';

import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import ICardRepository from '@modules/cards/repositories/ICardsRepository';
import IFindByNumber from '@modules/cards/dtos/IFindByNumberDTO';

class CardsRepository implements ICardRepository {
  private ormRepository: Repository<Cards>;

  constructor() {
    this.ormRepository = getRepository(Cards);
  }

  public async findByNumber({
    company_Id,
    number,
  }: IFindByNumber): Promise<Cards | undefined> {
    const card = await this.ormRepository.findOne({
      where: { cardNumber: number, company_Id },
    });
    return card;
  }

  public async listAllWithCompanyId(company_Id: string): Promise<Cards[]> {
    const cards = await this.ormRepository.find({
      where: { company_Id },
    });

    return cards;
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

import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import ICardRepository from '../ICardRepository';

class FakeCardsRepository implements ICardRepository {
  private cards: Cards[] = [];

  public async findByNumber(number: string): Promise<Cards | undefined> {
    const card = this.cards.find(item => item.cardNumber === number);
    return card;
  }

  public async create({
    cardName,
    cardNumber,
    ccv,
    company_Id,
  }: ICreateCardDTO): Promise<Cards> {
    const card = new Cards();

    Object.assign(card, {
      cardName,
      cardNumber,
      ccv,
      company_Id,
    });

    this.cards.push(card);

    return card;
  }
}

export default FakeCardsRepository;

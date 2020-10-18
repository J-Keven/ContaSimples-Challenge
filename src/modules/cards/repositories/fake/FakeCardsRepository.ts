import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import IFindByNumberDTO from '@modules/cards/dtos/IFindByNumberDTO';
import ICardRepository from '../ICardsRepository';

class FakeCardsRepository implements ICardRepository {
  private cards: Cards[] = [];

  public async findByNumber({
    company_Id,
    number,
  }: IFindByNumberDTO): Promise<Cards | undefined> {
    const card = this.cards.find(
      item => item.cardNumber === number && item.company_Id === company_Id,
    );
    return card;
  }

  public async listAllWithCompanyId(company_Id: string): Promise<Cards[]> {
    const cards = this.cards.filter(card => card.company_Id === company_Id);
    return cards;
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

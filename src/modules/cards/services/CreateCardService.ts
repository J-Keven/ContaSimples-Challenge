import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import AppError from '@shared/errors/AppError';
import ICardRepository from '../repositories/ICardRepository';
import Cards from '../infra/typeorm/entities/Cards';

interface IRequestDTO {
  cardName: string;
  cardNumber: string;
  ccv: number;
  company_Id: string;
}

@injectable()
class CreateCardService {
  private cardRepository: ICardRepository;

  private companyRepository: ICompanyRepository;

  constructor(
    @inject('CardsRepository')
    cardRepository: ICardRepository,
    @inject('CompanyRepository')
    companyRepository: ICompanyRepository,
  ) {
    this.cardRepository = cardRepository;
    this.companyRepository = companyRepository;
  }

  public async execute({
    cardName,
    cardNumber,
    ccv,
    company_Id,
  }: IRequestDTO): Promise<Cards> {
    const company = await this.companyRepository.findById(company_Id);
    if (!company) {
      throw new AppError('Comapny not found');
    }

    const cardExist = await this.cardRepository.findByNumber(cardNumber);

    if (cardExist) {
      throw new AppError('There is already a card registered with that number');
    }

    const card = await this.cardRepository.create({
      cardName,
      cardNumber,
      ccv,
      company_Id,
    });
    return card;
  }
}

export default CreateCardService;

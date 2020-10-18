import { inject, injectable } from 'tsyringe';
import ICardsRepsitory from '@modules/cards/repositories/ICardsRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import Cards from '@modules/cards/infra/typeorm/entities/Cards';
import AppError from '@shared/errors/AppError';

@injectable()
class ListAllCardsOfCompany {
  private cardsRepository: ICardsRepsitory;

  private companyRepository: ICompanyRepository;

  constructor(
    @inject('CardsRepository')
    cardsRepository: ICardsRepsitory,
    @inject('CompanyRepository')
    companyRepositroy: ICompanyRepository,
  ) {
    this.cardsRepository = cardsRepository;
    this.companyRepository = companyRepositroy;
  }

  public async execute(company_Id: string): Promise<Cards[]> {
    const company = await this.companyRepository.findById(company_Id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const cards = await this.cardsRepository.listAllWithCompanyId(company_Id);
    return cards;
  }
}

export default ListAllCardsOfCompany;

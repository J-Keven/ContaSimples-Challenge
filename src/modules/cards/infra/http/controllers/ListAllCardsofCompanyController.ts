import { Request, Response } from 'express';
import ListAllCardsofCompanyService from '@modules/cards/services/ListAllCardsOfCompanyService';
import { container } from 'tsyringe';

class ListAllCardsofCompanyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const listAllCardsOfCompanyService = container.resolve(
      ListAllCardsofCompanyService,
    );

    const cards = await listAllCardsOfCompanyService.execute(company_Id);
    return response.json(cards);
  }
}

export default ListAllCardsofCompanyController;

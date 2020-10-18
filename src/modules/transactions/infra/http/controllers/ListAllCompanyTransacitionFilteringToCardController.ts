import { Request, Response } from 'express';
import ListAllCompanyTransacitionFilteringToCardService from '@modules/transactions/services/ListAllCompanyTransacitionFilteringToCardService';
import { container } from 'tsyringe';

class ListAllCompanyTransacitionFilteringToCardController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { cardNumber } = request.body;
    const company_Id = request.company.id;

    const listAllCompanyTransacitionFilteringToCard = container.resolve(
      ListAllCompanyTransacitionFilteringToCardService,
    );
    const transactions = await listAllCompanyTransacitionFilteringToCard.execute(
      {
        cardNumber,
        company_Id,
      },
    );
    return response.json(transactions);
  }
}

export default ListAllCompanyTransacitionFilteringToCardController;

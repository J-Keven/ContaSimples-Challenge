import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCompanyTransactionsFilteringByDateAndTypeService from '@modules/transactions/services/ListAllCompanyTransactionsFilteringByDateAndTypeService';

class ListAllCompanyTransactionsFilteringByDateAndTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const { date, type } = request.body;

    const ListAllTransactionsFilteringByDateAndType = container.resolve(
      ListAllCompanyTransactionsFilteringByDateAndTypeService,
    );

    const transactions = await ListAllTransactionsFilteringByDateAndType.execute(
      {
        company_Id,
        date: new Date(date),
        type,
      },
    );

    return response.json(transactions);
  }
}

export default ListAllCompanyTransactionsFilteringByDateAndTypeController;

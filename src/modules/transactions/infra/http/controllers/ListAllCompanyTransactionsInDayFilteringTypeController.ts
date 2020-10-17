import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCompanyTransactionsInDayFIlteringType from '@modules/transactions/services/ListAllCompanyTransactionsInDayFilteringTypeService';

class ListAllCompanyTransactionsInDayFilterinTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const { day, month, year, type } = request.body;

    const listAllCompanyTransactionsInDayFIlteringType = container.resolve(
      ListAllCompanyTransactionsInDayFIlteringType,
    );

    const transactions = await listAllCompanyTransactionsInDayFIlteringType.execute(
      {
        company_Id,
        day,
        month,
        year,
        type,
      },
    );

    return response.json(transactions);
  }
}

export default ListAllCompanyTransactionsInDayFilterinTypeController;

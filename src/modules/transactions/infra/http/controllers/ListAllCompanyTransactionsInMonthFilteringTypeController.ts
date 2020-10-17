import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCompanyTransactionsInMonthFIlteringType from '@modules/transactions/services/ListAllCompanyTransactionsInMonthFilteringTypeService';

class ListAllCompanyTransactionsInMonthFlteringTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const { month, year, type } = request.body;

    const listAllCompanyTransactionsInMonthFIlteringType = container.resolve(
      ListAllCompanyTransactionsInMonthFIlteringType,
    );

    const transactions = await listAllCompanyTransactionsInMonthFIlteringType.execute(
      {
        company_Id,
        month,
        year,
        type,
      },
    );

    return response.json(transactions);
  }
}

export default ListAllCompanyTransactionsInMonthFlteringTypeController;

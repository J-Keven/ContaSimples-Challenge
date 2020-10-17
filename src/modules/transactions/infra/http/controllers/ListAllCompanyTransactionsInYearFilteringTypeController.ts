import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCompanyTransactionsInYearFIlteringType from '@modules/transactions/services/ListAllCompanyTransactionsInYearFilteringTypeService';

class ListAllCompanyTransactionsInYearFilteringTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const { year, type } = request.body;

    const listAllCompanyTransactionsInYearFIlteringType = container.resolve(
      ListAllCompanyTransactionsInYearFIlteringType,
    );

    const transactions = await listAllCompanyTransactionsInYearFIlteringType.execute(
      {
        company_Id,
        year,
        type,
      },
    );

    return response.json(transactions);
  }
}

export default ListAllCompanyTransactionsInYearFilteringTypeController;

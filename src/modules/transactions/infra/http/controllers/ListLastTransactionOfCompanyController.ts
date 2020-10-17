import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListLastTransactionOfCompanyService from '@modules/transactions/services/ListLastTransactionOfCompanyService';

class ListLastTransactionOfCompanyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;

    const listLastTransactionOfCompanyService = container.resolve(
      ListLastTransactionOfCompanyService,
    );

    const transactions = await listLastTransactionOfCompanyService.execute(
      company_Id,
    );

    return response.json(transactions);
  }
}

export default ListLastTransactionOfCompanyController;

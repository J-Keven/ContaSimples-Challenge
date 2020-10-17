import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetBalanceOfCompanyService from '@modules/company/services/GetBalanceOfCompanyService';

class GetBalanceOfCompanyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const getBalanceOfCompanyService = container.resolve(
      GetBalanceOfCompanyService,
    );

    const balance = await getBalanceOfCompanyService.execute(company_Id);
    return response.status(201).json(balance);
  }
}

export default GetBalanceOfCompanyController;

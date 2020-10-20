import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import GetCompanieAccountBankDataService from '@modules/company/services/GetCompanieAccountBankDataService';

class GetBakAccountOfCompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const compan_Id = request.company.id;

    const createCompanyService = container.resolve(CreateCompanyService);
    const getCompanieAccountBankDataService = container.resolve(
      GetCompanieAccountBankDataService,
    );

    const bankAccount = await getCompanieAccountBankDataService.execute(
      compan_Id,
    );

    return response.status(201).json(bankAccount);
  }
}

export default GetBakAccountOfCompanyController;

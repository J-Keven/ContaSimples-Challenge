import { Response, Request } from 'express';
import { container } from 'tsyringe';
import GetCompanyAccountBankDataService from '@modules/company/services/GetCompanieAccountBankDataService';

class GetCompanyAccountBankDataController {
  public async index(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const getCompanyAccountBankDataService = container.resolve(
      GetCompanyAccountBankDataService,
    );

    const bankAccountCompany = await getCompanyAccountBankDataService.execute(
      company_Id,
    );

    delete bankAccountCompany?.company.password;

    return response.json(bankAccountCompany);
  }
}

export default GetCompanyAccountBankDataController;

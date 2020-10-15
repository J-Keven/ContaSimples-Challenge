import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import CreateBankAccountService from '@modules/company/services/CreateBankAccountService';

class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cnpj, email, password } = request.body;
    const createCompanyService = container.resolve(CreateCompanyService);
    const createBankAccountService = container.resolve(
      CreateBankAccountService,
    );

    const company = await createCompanyService.execute({
      name,
      cnpj,
      email,
      password,
    });

    const bankAccount = await createBankAccountService.execute({
      company_Id: company.id,
    });
    delete company.password;

    return response.status(201).json({ company, bankAccount });
  }
}

export default CompanyController;

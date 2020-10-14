import { Request, Response } from 'express';

class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

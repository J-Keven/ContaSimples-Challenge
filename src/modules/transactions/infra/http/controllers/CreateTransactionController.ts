import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';

class TransactionService {
  public async create(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const {
      description,
      trasactionType,
      type,
      value,
      cardNumber,
      establishment,
    } = request.body;

    const createTransactionService = container.resolve(
      CreateTransactionService,
    );
    const transaction = await createTransactionService.execute({
      company_Id,
      description,
      trasactionType,
      type,
      value,
      cardNumber,
      establishment,
    });

    return response.json(transaction);
  }
}

export default TransactionService;

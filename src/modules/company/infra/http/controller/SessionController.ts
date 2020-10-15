import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '@modules/company/services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, password } = request.body;
    const createSessionService = container.resolve(CreateSessionService);

    const session = await createSessionService.execute({
      cnpj,
      password,
    });

    delete session.company.password;
    return response.status(201).json(session);
  }
}

export default SessionController;

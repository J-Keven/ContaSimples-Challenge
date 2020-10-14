import { Response, Request, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ITokenProvider from '../../providers/TokenProvider/models/ITokenProvider';

class EnsureAuthenticated {
  private companyRepository: ICompanyRepository;

  private tokenProvider: ITokenProvider;

  constructor(
    companyRepository: ICompanyRepository,
    tokenProvider: ITokenProvider,
  ) {
    this.companyRepository = companyRepository;
    this.tokenProvider = tokenProvider;
  }

  public async execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError('An authentication token is required', 401);
    }

    const [, token] = authorization.split(' ');

    try {
      const decoded = await this.tokenProvider.verify(token);
    } catch (error) {
      throw new AppError('authentication token invalid or expirad', 401);
    }
  }
}
export default EnsureAuthenticated;

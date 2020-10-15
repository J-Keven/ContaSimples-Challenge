import { container } from 'tsyringe';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';

import IBankAccountRepository from '@modules/company/repositories/IBankAccountRepository';
// import CompanyRepository from '@modules/company/infra/typeorm/repositories/';

import '@modules/company/infra/providers';

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  CompanyRepository,
);

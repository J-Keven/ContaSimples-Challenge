import { container } from 'tsyringe';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';

import IBankAccountRepository from '@modules/company/repositories/IBankAccountRepository';
import BankAccountRepository from '@modules/company/infra/typeorm/repositories/BankAccountRepository';

import ITransactionRepostory from '@modules/transactions/repositories/ITransactionRepository';
import TransactionRepository from '@modules/transactions/infra/typeorm/repositories/TransactionRepository';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import CardsRepository from '@modules/cards/infra/typeorm/repositories/CardsRepository';
import '@modules/company/infra/providers';

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  CompanyRepository,
);

container.registerSingleton<IBankAccountRepository>(
  'BankAccountRepository',
  BankAccountRepository,
);

container.registerSingleton<ITransactionRepostory>(
  'TransactionRepository',
  TransactionRepository,
);

container.registerSingleton<ICardsRepository>(
  'CardsRepository',
  CardsRepository,
);

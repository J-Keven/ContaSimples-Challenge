import { Router } from 'express';

import ensureAuthenticated from '@modules/company/infra/http/middlewares/ensureAutheticated';
import ListAllCompanyTransactionsInDayFilteringTypeController from '../controllers/ListAllCompanyTransactionsInDayFilteringTypeController';
import ListAllCompanyTransactionsInMonthFilteringTypeController from '../controllers/ListAllCompanyTransactionsInMonthFilteringTypeController';
import ListAllCompanyTransactionsInMonthFilteringToCardController from '../controllers/ListAllCompanyTransacitionFilteringToCardController';

const transacionsRoutes = Router();

const listAllCompanyTransactionsInDayFilteringTypeController = new ListAllCompanyTransactionsInDayFilteringTypeController();
const listAllCompanyTransactionsInMonthFilteringTypeController = new ListAllCompanyTransactionsInMonthFilteringTypeController();
const listAllCompanyTransactionsInMonthFilteringToCardController = new ListAllCompanyTransactionsInMonthFilteringToCardController();
transacionsRoutes.use(ensureAuthenticated);

transacionsRoutes.get(
  '/day',
  listAllCompanyTransactionsInDayFilteringTypeController.index,
);

transacionsRoutes.get(
  '/month',
  listAllCompanyTransactionsInMonthFilteringTypeController.index,
);

transacionsRoutes.get(
  '/card',
  listAllCompanyTransactionsInMonthFilteringToCardController.index,
);

export default transacionsRoutes;

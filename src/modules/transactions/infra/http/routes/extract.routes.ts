import { Router } from 'express';

import ensureAuthenticated from '@modules/company/infra/http/middlewares/ensureAutheticated';
import ListAllCompanyTransactionsInDayFilteringTypeController from '../controllers/ListAllCompanyTransactionsInDayFilteringTypeController';
import ListAllCompanyTransactionsInMonthFilteringTypeController from '../controllers/ListAllCompanyTransactionsInMonthFilteringTypeController';

const transacionsRoutes = Router();

const listAllCompanyTransactionsInDayFilteringTypeController = new ListAllCompanyTransactionsInDayFilteringTypeController();
const listAllCompanyTransactionsInMonthFilteringTypeController = new ListAllCompanyTransactionsInMonthFilteringTypeController();

transacionsRoutes.use(ensureAuthenticated);

transacionsRoutes.get(
  '/day',
  listAllCompanyTransactionsInDayFilteringTypeController.index,
);

transacionsRoutes.get(
  '/month',
  listAllCompanyTransactionsInMonthFilteringTypeController.index,
);

export default transacionsRoutes;

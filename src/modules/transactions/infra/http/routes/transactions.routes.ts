import { Router } from 'express';

import ensureAuthenticated from '@modules/company/infra/http/middlewares/ensureAutheticated';
import TransactionController from '../controllers/CreateTransactionController';
import ListAllCompanyTransactionsFilteringByDateAndTypeController from '../controllers/ListAllCompanyTransactionsFilteringByDateAndTypeController';

const transacionsRoutes = Router();
const transactionsController = new TransactionController();
const listAllCompanyTransactionsFilteringByDateAndTypeController = new ListAllCompanyTransactionsFilteringByDateAndTypeController();
transacionsRoutes.use(ensureAuthenticated);
transacionsRoutes.get(
  '/extract',
  listAllCompanyTransactionsFilteringByDateAndTypeController.index,
);
transacionsRoutes.post('/', transactionsController.create);

export default transacionsRoutes;

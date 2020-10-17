import { Router } from 'express';

import ensureAuthenticated from '@modules/company/infra/http/middlewares/ensureAutheticated';
import TransactionController from '../controllers/CreateTransactionController';
import ListLastTransactionOfCompanyService from '../controllers/ListLastTransactionOfCompanyController';

const transacionsRoutes = Router();
const transactionsController = new TransactionController();
const listLastTransactionOfCompanyService = new ListLastTransactionOfCompanyService();

transacionsRoutes.use(ensureAuthenticated);

transacionsRoutes.get('/me/last', listLastTransactionOfCompanyService.index);

transacionsRoutes.post('/', transactionsController.create);

export default transacionsRoutes;

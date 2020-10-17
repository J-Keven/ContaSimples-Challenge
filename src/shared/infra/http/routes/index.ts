import { Router } from 'express';
import companyRoutes from '@modules/company/infra/http/routes/company.routes';
import sessionRoutes from '@modules/company/infra/http/routes/session.routes';
import cardsRoutes from '@modules/cards/infra/http/routes/cards.routes';
import transactionRoutes from '@modules/transactions/infra/http/routes/transactions.routes';

const appRoutes = Router();

appRoutes.use('/company', companyRoutes);
appRoutes.use('/login', sessionRoutes);
appRoutes.use('/transactions', transactionRoutes);
appRoutes.use('/cards', cardsRoutes);

export default appRoutes;

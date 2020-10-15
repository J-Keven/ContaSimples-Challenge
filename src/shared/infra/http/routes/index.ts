import { Router } from 'express';
import companyRoutes from '@modules/company/infra/http/routes/company.routes';
import sessionRoutes from '@modules/company/infra/http/routes/session.routes';

const appRoutes = Router();

appRoutes.use('/company', companyRoutes);
appRoutes.use('/login', sessionRoutes);

export default appRoutes;

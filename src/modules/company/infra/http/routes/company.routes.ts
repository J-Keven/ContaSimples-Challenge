import { Router } from 'express';
import CompanyController from '../controller/ConpanyController';
import GetBalanceOfCompanyController from '../controller/GetBalanceOfCompanyController';
import ensureAutheticated from '../middlewares/ensureAutheticated';

const getBalanceOfCompanyController = new GetBalanceOfCompanyController();
const companyRoutes = Router();
const companyController = new CompanyController();

companyRoutes.post('/', companyController.create);

companyRoutes.use(ensureAutheticated);
companyRoutes.get('/balance', getBalanceOfCompanyController.index);

export default companyRoutes;

import { Router } from 'express';
import CompanyController from '../controller/ConpanyController';
import GetBalanceOfCompanyController from '../controller/GetBalanceOfCompanyController';
import GetCompanyAccountBankDataController from '../controller/GetCompanyAccountBankDataController';
import ensureAutheticated from '../middlewares/ensureAutheticated';

const getBalanceOfCompanyController = new GetBalanceOfCompanyController();
const getCompanyAccountBankDataController = new GetCompanyAccountBankDataController();
const companyRoutes = Router();
const companyController = new CompanyController();

companyRoutes.post('/', companyController.create);

companyRoutes.use(ensureAutheticated);
companyRoutes.get('/balance', getBalanceOfCompanyController.index);
companyRoutes.get('/bankAccount/me', getCompanyAccountBankDataController.index);

export default companyRoutes;

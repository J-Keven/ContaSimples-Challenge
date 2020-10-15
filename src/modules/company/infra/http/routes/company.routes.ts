import { Router } from 'express';
import CompanyController from '../controller/ConpanyController';

const companyRoutes = Router();
const companyController = new CompanyController();
companyRoutes.post('/', companyController.create);

export default companyRoutes;

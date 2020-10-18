import { Router } from 'express';
import ensureAuthenticated from '@modules/company/infra/http/middlewares/ensureAutheticated';
import CardController from '../controllers/CardController';
import ListAllCardsOfCompany from '../controllers/ListAllCardsofCompanyController';

const cardsRoutes = Router();
const cardController = new CardController();
const listAllCardsOfCompany = new ListAllCardsOfCompany();

cardsRoutes.use(ensureAuthenticated);
cardsRoutes.post('/', cardController.create);
cardsRoutes.get('/me', listAllCardsOfCompany.index);

export default cardsRoutes;

import { Router } from 'express';
import ensureAuthenticated from '@modules/company/infra/http/middlewares/ensureAutheticated';
import CardController from '../controllers/CardController';

const cardsRoutes = Router();
const cardController = new CardController();
cardsRoutes.use(ensureAuthenticated);
cardsRoutes.post('/', cardController.create);
export default cardsRoutes;

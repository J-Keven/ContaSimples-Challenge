import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateCardService from '@modules/cards/services/CreateCardService';

class CardController {
  public async create(request: Request, response: Response): Promise<Response> {
    const company_Id = request.company.id;
    const { cardName, cardNumber, ccv } = request.body;
    const createCardeService = container.resolve(CreateCardService);

    const card = await createCardeService.execute({
      cardName,
      cardNumber,
      ccv,
      company_Id,
    });

    return response.status(201).json(card);
  }
}
export default CardController;

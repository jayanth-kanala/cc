// controllers/CardController.ts
import { Request, Response } from 'express';
import { AmexCardService } from '../services/amex-card-service';
import { HdfcCardService } from '../services/hdfc-card-service';
import { IciciCardService } from '../services/icici-card-service';

export class CardController {
    async fetchCards(req: Request, res: Response) {
        const bankId = req.params.id;
        let cardService;

        // Select the service based on bank ID
        switch (bankId) {
            case '1':
                cardService = new AmexCardService();
                break;
            case '2':
                cardService = new HdfcCardService();
                break;
            case '3':
                cardService = new IciciCardService();
                break;
            default:
                return res.status(400).json({ error: 'Invalid bank ID' });
        }

        try {
            const output = await cardService.fetchCards();
            res.json(output);
        } catch (error) {
            console.error('Error fetching cards:', error);
            res.status(500).json({ error: 'Failed to fetch cards' });
        }
    }
}

// src/routes/cards.ts

import { Router, Request, Response } from 'express';
import { Banks } from '../models/banks.js';
import { BANK_NAMES } from '../constants/bank.js';
import { AmexCardService } from '../services/amex-card-service.js';

const router = Router();

// GET /banks
router.get('/', async (req: Request, res: Response) => {
    let banks:Banks[] = []
    banks.push(new Banks(1, BANK_NAMES[1], 'https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/Amex_Bluebox-Logo.png'))
    banks.push(new Banks(2, BANK_NAMES[2], 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/4f9ea091-71e0-484e-b00b-07f39e1fa4e2/Common/DAP/Adobe%20Forms/June-2021/logo_regular.jpg'))
    banks.push(new Banks(3, BANK_NAMES[3], 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd2SufMo9hay75vGgsFcIX0kbzn1fCuOPQqg&s'))
    res.json(banks)
});

// GET /banks/:id
router.get('/:id', async(req: Request, res: Response) => {
    const userId = req.params.id;
    res.send(`Bank details for bank ID: ${userId}`);
});

// POST /banks
router.post('/', (req: Request, res: Response) => {
    // Here you would normally handle creating a new user
    res.send('Bank created');
});

// PUT /banks/:id
router.put('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    // Handle updating user information
    res.send(`Bank with ID ${userId} updated`);
});

// DELETE /banks/:id
router.delete('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    // Handle deleting a user
    res.send(`Bank with ID ${userId} deleted`);
});

// GET /banks/:id/cards
router.get('/:id/cards', async (req: Request, res: Response) => {
    let amexCardService = new AmexCardService();
    let output = await amexCardService.fetchCards()
    // res.json(testCardType())
    res.json(output)
});

export default router;

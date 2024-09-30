// src/routes/cards.ts

import { Router, Request, Response } from 'express';
import { AmexCardService } from '../services/amex-card-service.js';
import creditCardType from 'credit-card-type';

const router = Router();

// GET /cards
router.get('/', async (req: Request, res: Response) => {
    let amexCardService = new AmexCardService();
    let output = await amexCardService.fetchCards()
    // res.json(testCardType())
    res.json(output)
});

// function testCardType() {

//     // The card number provided should be normalized prior to usage here.
//     var visaCards = creditCardType("378282246310005");
//     console.log(visaCards[0].type); // 'visa'

//     return [visaCards]
// }

// GET /users/:id
router.get('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    res.send(`User details for user ID: ${userId}`);
});

// POST /users
router.post('/', (req: Request, res: Response) => {
    // Here you would normally handle creating a new user
    res.send('User created');
});

// PUT /users/:id
router.put('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    // Handle updating user information
    res.send(`User with ID ${userId} updated`);
});

// DELETE /users/:id
router.delete('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    // Handle deleting a user
    res.send(`User with ID ${userId} deleted`);
});

export default router;

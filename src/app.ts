import express, { Request, Response } from 'express';
import creditCardRoutes from './routes/credit-card-routes.js'
import bankRoutes from './routes/bank-routes.js'

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Define a route with parameters
app.get('/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
});

// Use the credit cards routes
app.use('/banks', bankRoutes);
app.use('/banks/:id/cards', creditCardRoutes);

export default app;

import { CreditCard } from "../credit-card.js";

export interface CardFetchService {
    fetchCards(): Promise<CreditCard[]>;
}


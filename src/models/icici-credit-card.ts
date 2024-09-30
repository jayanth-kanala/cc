// src/models/ICICICreditCard.ts
import { CreditCard } from "./credit-card";
import { ICICIRewardStrategy } from "../strategies/RewardStrategy";

export class ICICICreditCard extends CreditCard {
    constructor(
        id: string,
        name: string,
        type: string,
        annualFee: string[],
        highlights: string[],
        benefits: string[],
        eligibility: string[],
        bank: string,
        rewards: string[],
        imageUrl: string,
        // interestRate: number
    ) {
        super(id, name, type, annualFee, rewards, highlights, benefits, eligibility, bank, imageUrl, new ICICIRewardStrategy());
    }


}

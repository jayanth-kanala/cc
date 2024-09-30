// src/models/HDFCCreditCard.ts
import { CreditCard } from "./credit-card";
import { HDFCRewardStrategy } from "../strategies/RewardStrategy";

export class HDFCCreditCard extends CreditCard {

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
        imageUrl: string
    ) {
        super(id, name, type, annualFee, rewards, highlights, benefits, eligibility, bank, imageUrl, new HDFCRewardStrategy());
    }

}

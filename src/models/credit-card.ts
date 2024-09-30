// src/models/CreditCard.ts
import { RewardStrategy } from "../strategies/RewardStrategy";

export class CreditCard {
    constructor(
        public id: string,
        public name: string,
        public type: string,
        public annualFee: string[],
        public rewards: string[],
        public highlights: string[],
        public benefits: string[],
        public eligibility: string[],
        public bank: string,
        public imageUrl: string,
        private rewardStrategy: RewardStrategy,// Inject strategy
    ) { }

    getCardInfo(): string {
        return `
        Card Name: ${this.name}
        Annual Fee: ${this.annualFee}
        Benefits: ${this.benefits.join(", ")}
        Rewards: ${this.rewards.join(", ")}`;
    }

    calculateRewards(amount: number): number {
        return this.rewardStrategy.calculateReward(amount);
    }
}

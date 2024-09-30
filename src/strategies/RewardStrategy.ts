// RewardStrategy interface for calculating rewards
// src/strategies/RewardStrategy.ts
export interface RewardStrategy {
    calculateReward(amount: number): number;
}

// Concrete strategy for HDFC Bank
export class HDFCRewardStrategy implements RewardStrategy {
    calculateReward(amount: number): number {
        return amount * 0.05; // 5% rewards on purchases for HDFC
    }
}

// Concrete strategy for ICICI Bank
export class ICICIRewardStrategy implements RewardStrategy {
    calculateReward(amount: number): number {
        return amount * 0.03; // 3% rewards on purchases for ICICI
    }
}

// Concrete strategy for American Express
export class AmexRewardStrategy implements RewardStrategy {
    calculateReward(amount: number): number {
        return amount * 0.07; // 7% rewards on purchases for Amex
    }
}

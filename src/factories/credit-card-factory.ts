// src/factories/CreditCardFactory.ts
import { CreditCard } from "../models/credit-card";
import { HDFCCreditCard } from "../models/hdfc-credit-card";
import { ICICICreditCard } from "../models/icici-credit-card";
import { AmexCreditCard } from "../models/amex-credit-card";

export class CreditCardFactory {
  static createCreditCard(
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
    // interestRate: number
  ): CreditCard {
    switch (bank.toLowerCase()) {
      case 'hdfc':
        return new HDFCCreditCard(id, name, type, annualFee, highlights, benefits, eligibility, bank, rewards, imageUrl);
      case 'icici':
        return new ICICICreditCard(id, name, type, annualFee, highlights, benefits, eligibility, bank, rewards, imageUrl);
      case 'american express':
        return new AmexCreditCard(id, name, type, annualFee, highlights, benefits, eligibility, bank, rewards, imageUrl);
      default:
        throw new Error('Unknown bank name');
    }
  }
}

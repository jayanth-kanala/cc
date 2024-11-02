export interface CreditCardInteface {
  id: string;
  name: string;
  type: CardType;
  issuer: string;
  network: CardNetwork;
  annualFee: AnnualFee;
  rewards: Reward[];
  benefits: Benefit[];
  eligibility: EligibilityCriteria;
  imageUrl: string;
  rewardStrategy: RewardStrategy;
  highlights: string[];
}

export enum CardType {
  Credit = "Credit Card",
  Charge = "Charge Card",
  Debit = "Debit Card",
}

export enum CardNetwork {
  AmericanExpress = "American Express",
  Discover = "Discover",
  Mastercard = "Master Card",
  Visa = "Visa"
}

export interface AnnualFee {
  description: string[];
  firstYear: number;
  secondYear: number;
  subsequentYears: number;
}

export interface Reward {
  type: RewardStrategy;
  description: string;
  earningRate: number;
  redemptionRate: number;
}

export enum RewardStrategy {
  Cashback,
  Points,
  Travel,
}

export interface Benefit {
  title: string;
  description: string[];
}

export interface EligibilityCriteria {
  description: string[];
  income: number;
  creditScore: number;
  age: number;
  residency: string;
}
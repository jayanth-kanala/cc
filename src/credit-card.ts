import { AnnualFee, Benefit, CardNetwork, CardType, CreditCardInteface, EligibilityCriteria, Reward, RewardStrategy } from "./interface/credit-card.interface";

export class CreditCard implements CreditCardInteface {
    id: string;
    name: string;
    type: CardType;
    issuer: string;
    network: CardNetwork;
    annualFee: AnnualFee;
    highlights: string[];
    benefits: Benefit[];
    rewards: Reward[];
    rewardStrategy: RewardStrategy;
    imageUrl: string;
    eligibility: EligibilityCriteria;

    constructor(params: CreditCard) {
        this.id = params.id;
        this.name = params.name;
        this.type = params.type;
        this.issuer = params.issuer;
        this.network = params.network;
        this.annualFee = params.annualFee || {
            firstYear: 0,
            secondYear: 0,
            subsequentYears: 0,
        };
        this.rewards = params.rewards || [];
        this.benefits = params.benefits || [];
        this.eligibility = params.eligibility || {
            income: 0,
            creditScore: 0,
            age: 0,
            residency: '',
        };
        this.imageUrl = params.imageUrl || '';
        this.rewardStrategy = params.rewardStrategy;
        this.highlights = params.highlights || [];
    }
}

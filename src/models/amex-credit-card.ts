// src/models/AmexCreditCard.ts
import { CreditCard } from "../credit-card.js";
import { Issuer } from "../enums/issuer.enum.js";
import { AmexRewardStrategy } from "../strategies/RewardStrategy";

export class AmericanExpressCreditCard extends CreditCard {
    constructor(params: CreditCard) {
      super(params);
      this.issuer = Issuer.American_Express;
    }
  }
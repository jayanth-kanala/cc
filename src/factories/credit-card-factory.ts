// src/factories/CreditCardFactory.ts
import { CreditCardInteface } from "../interface/credit-card.interface";
import { CreditCard } from "../credit-card";
import { AmericanExpressCreditCard } from "../models/amex-credit-card";
import { Issuer } from "../enums/issuer.enum";

export function createCreditCard(params: CreditCardInteface): CreditCard {
  switch (params.issuer) {
    case Issuer.American_Express:
      return new AmericanExpressCreditCard(params);
    default:
      throw new Error(`Unsupported issuer: ${params.issuer}`);
  }
}
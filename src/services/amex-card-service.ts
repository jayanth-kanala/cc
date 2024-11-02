import { CreditCard } from "../credit-card.js";
import { Issuer } from "../enums/issuer.enum.js";
import { AnnualFee, Benefit, CardNetwork, CardType, EligibilityCriteria, RewardStrategy } from "../interface/credit-card.interface.js";
import { CardFetchService } from "./card-fetch-service.js";

export class AmexCardService implements CardFetchService {
  private static readonly AMEX_URL = 'https://dainternationalshop.americanexpress.com/us/cardshop-api/api/v1/intl/content/compare-cards/in/default';

  async fetchCards(): Promise<CreditCard[]> {
    try {
      const response = await fetch(AmexCardService.AMEX_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AmericanExpressResponseInterface[] = await response.json();
      return this.mapApiCardsToCreditCards(data);
    } catch (error) {
      console.error('Error fetching credit cards:', error);
      throw error;
    }
  }

  mapApiCardsToCreditCards(cards: AmericanExpressResponseInterface[]): CreditCard[] {
    return cards.map((card) => this.mapApiCardToCreditCard(card));
  }

  mapApiCardToCreditCard(card: AmericanExpressResponseInterface): CreditCard {
    return {
      id: card.productCode,
      name: this.extractCardName(card.productName),
      type: this.extractCardType(card.cardType),
      issuer: Issuer.American_Express,
      network: CardNetwork.AmericanExpress,
      annualFee: this.mapCardInfoToAnnualFee(card.cardInfo),
      highlights: this.extractHighlights(card.highlights),
      benefits: this.extractBenefits(card.benefits),
      rewards: [],
      rewardStrategy: RewardStrategy.Travel,
      imageUrl: card.cardImageURL,
      eligibility: this.mapEligibilityCriteria(card.eligibility),
    };
  }

  extractCardName(productName: string) {
    return productName.replace(/&nbsp;/g, ' ');
  }

  extractCardType(cardType: string) {
    switch (cardType) {
      case 'Credit Card':
        return CardType.Credit
      case 'Charge Card':
        return CardType.Charge
      default:
        return CardType.Credit
    }
  }

  private removeBrTags(htmlString: string): string {
    // Use a regular expression to replace all <br> tags (with or without attributes)
    return htmlString.replace(/<br\s*\/?>/gi, '');
  }

  private mapCardInfoToAnnualFee(cardInfo: AmericanExpressResponseInterface['cardInfo']): AnnualFee {
    const annualFee: AnnualFee = {
      description: [],
      firstYear: 0,
      secondYear: 0,
      subsequentYears: 0
    };

    cardInfo.forEach((info) => {
      info.description.forEach((desc) => {
        if (desc.descriptionCopy) {
          annualFee.description.push(desc.descriptionCopy)
          const match = desc.descriptionCopy.match(/([0-9,]+)/);
          if (match) {
            const amount = parseInt(match[0].replace(',', ''), 10);
            if (desc.descriptionCopy.toLowerCase().includes('first year')) {
              annualFee.firstYear = amount;
            } else if (desc.descriptionCopy.toLowerCase().includes('second year')) {
              annualFee.secondYear = amount;
            }
            if (desc.descriptionCopy.toLowerCase().includes('second year onwards')) {
              annualFee.subsequentYears = amount;
            }
          }
        }
      });
    });
    return annualFee;
  }
  
  private extractHighlights(highlights: any[]): string[] {
    return highlights
      .filter(highlight => highlight.applicable)
      .flatMap(highlight => highlight.description.map((desc: any) => desc.descriptionCopy));
  }

  private extractBenefits(benefits: AmericanExpressResponseInterface['benefits']): Benefit[] {
    return benefits.flatMap((benefit) =>
      benefit.benefitList.map((subBenefit) => ({
        title: benefit.title === 'Rewards' ? subBenefit.title : `${benefit.title} - ${subBenefit.title}`,
        description: subBenefit.details.flatMap((detail) =>
          detail.description.map((desc) => desc.descriptionCopy)
        ),
      }))
    );
  }

  private mapEligibilityCriteria(eligibility: AmericanExpressResponseInterface['eligibility']): EligibilityCriteria {
    const criteria = eligibility[0].description.map((desc) => desc.descriptionCopy);
    const income = criteria.find((criterion) => criterion.includes('annual income'))?.match(/Rs\. (\d+) Lacs/)?.[1];
    const age = criteria.find((criterion) => criterion.includes('years of age'))?.match(/over (\d+) years/)?.[1];
    const residency = criteria.find((criterion) => criterion.includes('residential address'))?.match(/current\/permanent residential address in (.*)/)?.[1]||'';
    // Assuming no credit score requirement mentioned in the eligibility criteria
    const creditScore = 0;
    return {
      income: income ? parseInt(income, 10) * 100000 : 0,
      creditScore,
      age: age ? parseInt(age, 10) : 0,
      residency,
      description: criteria
    };
  }

}

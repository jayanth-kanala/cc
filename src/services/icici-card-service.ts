import { CreditCard } from "../credit-card.js";
import { CardFetchService } from "./card-fetch-service.js";

export class IciciCardService implements CardFetchService {
    private static readonly ICICI_URL = 'https://acquisition-1.americanexpress.com/api/acquisition/digital/v1/shop/us/cardshop-api/api/v1/intl/content/compare-cards/in/default';
  
    async fetchCards(): Promise<CreditCard[]> {
      try {
        const response = await fetch(IciciCardService.ICICI_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return []
      } catch (error) {
        console.error('Error fetching credit cards:', error);
        throw error;
      }
    }
  
    private removeBrTags(htmlString: string): string {
      // Use a regular expression to replace all <br> tags (with or without attributes)
      return htmlString.replace(/<br\s*\/?>/gi, '');
    }
  
    // Mark helper methods as static since they don't need instance-specific data
    private static extractFee(cardInfo: any[], id: number): string {
      const feeInfo = cardInfo.find(info => info.id === id);
      return feeInfo?.description?.find((desc: any) => desc.isTooltip === "N")?.descriptionCopy || "N/A";
    }
  
    private static extractRewards(benefits: any[]): string[] {
      const rewards = benefits.find(b => b.title === "Rewards");
      return rewards?.benefitList?.flatMap((reward: any) =>
        reward.details?.flatMap((detail: any) =>
          detail.description?.map((desc: any) => desc.descriptionCopy))) || [];
    }
  
    private static extractHighlights(highlights: any[]): string[] {
      return highlights
        .filter(highlight => highlight.applicable)
        .flatMap(highlight => highlight.description.map((desc: any) => desc.descriptionCopy));
    }
  
    private static extractBenefits(benefits: any[]): string[] {
      return benefits.flatMap((benefit: any) =>
        benefit.benefitList?.flatMap((item: any) =>
          item.details?.flatMap((detail: any) =>
            detail.description.map((desc: any) => desc.descriptionCopy)
          )
        )
      ) || [];
    }
  
    private static extractEligibility(eligibility: any[]): string[] {
      return eligibility.flatMap(e =>
        e.description.map((desc: any) => desc.descriptionCopy)
      ) || [];
    }
  }
  
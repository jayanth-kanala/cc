interface AmericanExpressResponseInterface {
    productCode: string;
    productName: string;
    cardType: string;
    cardInfo: [{
        id: number,
        description: [{
            descriptionCopy: string
        }]
    }];
    benefits: [{
        title: string,
        benefitList: [{
            title: string,
            details: [{
                id: number,
                description: [{
                    descriptionCopy: string
                }]
            }]
        }]
    }];
    highlights: [{
        applicable: string,
        description: [
            {
                descriptionCopy: string
            }
        ]
    }];
    eligibility: [{
        id: number,
        title: string,
        description: [{
            descriptionCopy: string
        }]
    }];
    cardImageURL: string;
}
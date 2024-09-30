// bankConstants.ts

// Define the constants
export const BANK_NAMES = Object.freeze({
    1: 'American Express',
    2: 'HDFC Bank',
    3: 'ICICI Bank',
});

// Define the API URLs
export const API_URLS = Object.freeze({
    AMEX: 'https://acquisition-1.americanexpress.com/api/acquisition/digital/v1/shop/us/cardshop-api/api/v1/intl/content/compare-cards/in/default',
    HDFC: 'https://api.hdfc.com/credit-cards', // Example, replace with actual URL
    ICICI: 'https://api.icici.com/credit-cards', // Example, replace with actual URL
});

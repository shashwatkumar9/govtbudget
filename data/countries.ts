import { Country } from '@/types';

export const COUNTRIES: Country[] = [
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    currencyCode: 'USD',
    currencySymbol: '$',
    flagEmoji: '🇺🇸',
    fiscalYearStart: 'October 1',
    taxSeason: 'January - April',
  },
  {
    id: 'india',
    name: 'India',
    code: 'IN',
    currencyCode: 'INR',
    currencySymbol: '₹',
    flagEmoji: '🇮🇳',
    fiscalYearStart: 'April 1',
    taxSeason: 'July - March',
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    currencyCode: 'CAD',
    currencySymbol: 'C$',
    flagEmoji: '🇨🇦',
    fiscalYearStart: 'April 1',
    taxSeason: 'February - April',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    currencyCode: 'GBP',
    currencySymbol: '£',
    flagEmoji: '🇬🇧',
    fiscalYearStart: 'April 1',
    taxSeason: 'April - January',
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    flagEmoji: '🇦🇺',
    fiscalYearStart: 'July 1',
    taxSeason: 'July - October',
  },
];

export function getCountryById(id: string): Country | undefined {
  return COUNTRIES.find(c => c.id === id);
}

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

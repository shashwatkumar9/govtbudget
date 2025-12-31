import { TaxBracket, FilingStatus } from '@/types';

// USA Tax Brackets 2024
export const US_TAX_BRACKETS_2024: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10, baseAmount: 0 },
    { min: 11600, max: 47150, rate: 0.12, baseAmount: 1160 },
    { min: 47150, max: 100525, rate: 0.22, baseAmount: 5426 },
    { min: 100525, max: 191950, rate: 0.24, baseAmount: 17168.50 },
    { min: 191950, max: 243725, rate: 0.32, baseAmount: 39110.50 },
    { min: 243725, max: 609350, rate: 0.35, baseAmount: 55678.50 },
    { min: 609350, max: null, rate: 0.37, baseAmount: 183647.25 },
  ],
  married_joint: [
    { min: 0, max: 23200, rate: 0.10, baseAmount: 0 },
    { min: 23200, max: 94300, rate: 0.12, baseAmount: 2320 },
    { min: 94300, max: 201050, rate: 0.22, baseAmount: 10852 },
    { min: 201050, max: 383900, rate: 0.24, baseAmount: 34337 },
    { min: 383900, max: 487450, rate: 0.32, baseAmount: 78221 },
    { min: 487450, max: 731200, rate: 0.35, baseAmount: 111357 },
    { min: 731200, max: null, rate: 0.37, baseAmount: 196669.50 },
  ],
  married_separate: [
    { min: 0, max: 11600, rate: 0.10, baseAmount: 0 },
    { min: 11600, max: 47150, rate: 0.12, baseAmount: 1160 },
    { min: 47150, max: 100525, rate: 0.22, baseAmount: 5426 },
    { min: 100525, max: 191950, rate: 0.24, baseAmount: 17168.50 },
    { min: 191950, max: 243725, rate: 0.32, baseAmount: 39110.50 },
    { min: 243725, max: 365600, rate: 0.35, baseAmount: 55678.50 },
    { min: 365600, max: null, rate: 0.37, baseAmount: 98334.75 },
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.10, baseAmount: 0 },
    { min: 16550, max: 63100, rate: 0.12, baseAmount: 1655 },
    { min: 63100, max: 100500, rate: 0.22, baseAmount: 7241 },
    { min: 100500, max: 191950, rate: 0.24, baseAmount: 15469 },
    { min: 191950, max: 243700, rate: 0.32, baseAmount: 37417 },
    { min: 243700, max: 609350, rate: 0.35, baseAmount: 53977 },
    { min: 609350, max: null, rate: 0.37, baseAmount: 181954.50 },
  ],
};

export const INDIA_TAX_BRACKETS_2024_NEW: TaxBracket[] = [
  { min: 0, max: 300000, rate: 0, baseAmount: 0 },
  { min: 300000, max: 600000, rate: 0.05, baseAmount: 0 },
  { min: 600000, max: 900000, rate: 0.10, baseAmount: 15000 },
  { min: 900000, max: 1200000, rate: 0.15, baseAmount: 45000 },
  { min: 1200000, max: 1500000, rate: 0.20, baseAmount: 90000 },
  { min: 1500000, max: null, rate: 0.30, baseAmount: 150000 },
];

export const INDIA_TAX_BRACKETS_2024_OLD: TaxBracket[] = [
  { min: 0, max: 250000, rate: 0, baseAmount: 0 },
  { min: 250000, max: 500000, rate: 0.05, baseAmount: 0 },
  { min: 500000, max: 1000000, rate: 0.20, baseAmount: 12500 },
  { min: 1000000, max: null, rate: 0.30, baseAmount: 112500 },
];

export const CANADA_TAX_BRACKETS_2024: TaxBracket[] = [
  { min: 0, max: 53359, rate: 0.15, baseAmount: 0 },
  { min: 53359, max: 106717, rate: 0.205, baseAmount: 8003.85 },
  { min: 106717, max: 165430, rate: 0.26, baseAmount: 18942.24 },
  { min: 165430, max: 235675, rate: 0.29, baseAmount: 34207.62 },
  { min: 235675, max: null, rate: 0.33, baseAmount: 54578.67 },
];

export const UK_TAX_BRACKETS_2024: TaxBracket[] = [
  { min: 0, max: 12570, rate: 0, baseAmount: 0 },
  { min: 12570, max: 50270, rate: 0.20, baseAmount: 0 },
  { min: 50270, max: 125140, rate: 0.40, baseAmount: 7540 },
  { min: 125140, max: null, rate: 0.45, baseAmount: 37488 },
];

export const AUSTRALIA_TAX_BRACKETS_2024: TaxBracket[] = [
  { min: 0, max: 18200, rate: 0, baseAmount: 0 },
  { min: 18200, max: 45000, rate: 0.19, baseAmount: 0 },
  { min: 45000, max: 120000, rate: 0.325, baseAmount: 5092 },
  { min: 120000, max: 180000, rate: 0.37, baseAmount: 29467 },
  { min: 180000, max: null, rate: 0.45, baseAmount: 51667 },
];

export function calculateTax(
  income: number,
  brackets: TaxBracket[]
): { tax: number; effectiveRate: number; marginalRate: number } {
  let tax = 0;
  let marginalRate = 0;

  for (const bracket of brackets) {
    if (income <= bracket.min) break;

    const taxableInBracket = bracket.max
      ? Math.min(income, bracket.max) - bracket.min
      : income - bracket.min;

    if (taxableInBracket > 0) {
      tax = (bracket.baseAmount || 0) + (taxableInBracket * bracket.rate);
      marginalRate = bracket.rate;
    }
  }

  const effectiveRate = income > 0 ? tax / income : 0;

  return { tax, effectiveRate, marginalRate };
}

export function calculateUSFederalTax(income: number, filingStatus: FilingStatus): number {
  const brackets = US_TAX_BRACKETS_2024[filingStatus];
  return calculateTax(income, brackets).tax;
}

export function calculateIndiaIncomeTax(income: number, regime: 'old' | 'new' = 'new'): number {
  const brackets = regime === 'new' ? INDIA_TAX_BRACKETS_2024_NEW : INDIA_TAX_BRACKETS_2024_OLD;
  return calculateTax(income, brackets).tax;
}

export function calculateCanadaFederalTax(income: number): number {
  return calculateTax(income, CANADA_TAX_BRACKETS_2024).tax;
}

export function calculateUKIncomeTax(income: number): number {
  return calculateTax(income, UK_TAX_BRACKETS_2024).tax;
}

export function calculateAustraliaIncomeTax(income: number): number {
  return calculateTax(income, AUSTRALIA_TAX_BRACKETS_2024).tax;
}

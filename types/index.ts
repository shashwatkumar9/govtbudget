export interface Country {
  id: string;
  name: string;
  code: string;
  currencyCode: string;
  currencySymbol: string;
  flagEmoji: string;
  fiscalYearStart: string;
  taxSeason: string;
}

export interface BudgetCategory {
  category: string;
  percentage: number;
  icon: string;
  color: string;
  description?: string;
}

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  baseAmount?: number;
}

export interface TaxCalculationResult {
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  breakdown: BudgetBreakdownItem[];
}

export interface BudgetBreakdownItem extends BudgetCategory {
  amount: number;
  daily: number;
  monthly: number;
}

export type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household';

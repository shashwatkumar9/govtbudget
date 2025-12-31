import { BudgetCategory } from '@/types';

export const US_BUDGET_2024: BudgetCategory[] = [
  { category: 'Healthcare (Medicare/Medicaid)', percentage: 25, icon: '🏥', color: '#ef4444' },
  { category: 'Social Security', percentage: 23, icon: '🛡️', color: '#f97316' },
  { category: 'Defense & Military', percentage: 15, icon: '🎖️', color: '#84cc16' },
  { category: 'Interest on Debt', percentage: 12, icon: '💰', color: '#06b6d4' },
  { category: 'Income Security', percentage: 7, icon: '👨‍👩‍👧‍👦', color: '#8b5cf6' },
  { category: 'Education', percentage: 4, icon: '🎓', color: '#f59e0b' },
  { category: 'Veterans Benefits', percentage: 4, icon: '🏛️', color: '#ec4899' },
  { category: 'Transportation', percentage: 2, icon: '🚗', color: '#10b981' },
  { category: 'Other', percentage: 8, icon: '📦', color: '#6b7280' },
];

export const INDIA_BUDGET_2024: BudgetCategory[] = [
  { category: 'Interest Payments', percentage: 20, icon: '💰', color: '#ef4444' },
  { category: 'Defence', percentage: 13, icon: '🎖️', color: '#f97316' },
  { category: 'Subsidies (Food, Fuel, Fertilizer)', percentage: 10, icon: '🌾', color: '#84cc16' },
  { category: 'Central Sector Schemes', percentage: 15, icon: '🏗️', color: '#06b6d4' },
  { category: 'Finance Commission Transfers', percentage: 9, icon: '🏛️', color: '#8b5cf6' },
  { category: 'Pensions', percentage: 5, icon: '👴', color: '#f59e0b' },
  { category: 'Health', percentage: 3, icon: '🏥', color: '#ec4899' },
  { category: 'Education', percentage: 3, icon: '🎓', color: '#10b981' },
  { category: 'Agriculture & Rural Development', percentage: 6, icon: '🚜', color: '#14b8a6' },
  { category: 'Other', percentage: 16, icon: '📦', color: '#6b7280' },
];

export const CANADA_BUDGET_2024: BudgetCategory[] = [
  { category: 'Elderly Benefits (OAS, GIS)', percentage: 17, icon: '👴', color: '#ef4444' },
  { category: 'Health Transfers', percentage: 15, icon: '🏥', color: '#f97316' },
  { category: 'Children & Families (CCB)', percentage: 8, icon: '👨‍👩‍👧‍👦', color: '#84cc16' },
  { category: 'Employment Insurance', percentage: 7, icon: '💼', color: '#06b6d4' },
  { category: 'Defence', percentage: 7, icon: '🎖️', color: '#8b5cf6' },
  { category: 'Indigenous Services', percentage: 5, icon: '🪶', color: '#f59e0b' },
  { category: 'Public Debt Charges', percentage: 11, icon: '💰', color: '#ec4899' },
  { category: 'Other Transfers to Provinces', percentage: 10, icon: '🏛️', color: '#10b981' },
  { category: 'Other Programs', percentage: 20, icon: '📦', color: '#6b7280' },
];

export const UK_BUDGET_2024: BudgetCategory[] = [
  { category: 'Health (NHS)', percentage: 20, icon: '🏥', color: '#ef4444' },
  { category: 'Welfare & Pensions', percentage: 25, icon: '👴', color: '#f97316' },
  { category: 'Education', percentage: 11, icon: '🎓', color: '#84cc16' },
  { category: 'Defence', percentage: 5, icon: '🎖️', color: '#06b6d4' },
  { category: 'Debt Interest', percentage: 8, icon: '💰', color: '#8b5cf6' },
  { category: 'Transport', percentage: 3, icon: '🚗', color: '#f59e0b' },
  { category: 'Public Order & Safety', percentage: 4, icon: '👮', color: '#ec4899' },
  { category: 'Housing & Environment', percentage: 3, icon: '🏠', color: '#10b981' },
  { category: 'Other', percentage: 21, icon: '📦', color: '#6b7280' },
];

export const AUSTRALIA_BUDGET_2024: BudgetCategory[] = [
  { category: 'Social Security & Welfare', percentage: 35, icon: '👴', color: '#ef4444' },
  { category: 'Health', percentage: 16, icon: '🏥', color: '#f97316' },
  { category: 'Education', percentage: 8, icon: '🎓', color: '#84cc16' },
  { category: 'Defence', percentage: 6, icon: '🎖️', color: '#06b6d4' },
  { category: 'General Public Services', percentage: 7, icon: '🏛️', color: '#8b5cf6' },
  { category: 'Public Debt Interest', percentage: 4, icon: '💰', color: '#f59e0b' },
  { category: 'Transport & Communication', percentage: 3, icon: '🚗', color: '#ec4899' },
  { category: 'Other', percentage: 21, icon: '📦', color: '#6b7280' },
];

export function getBudgetByCountry(countryId: string): BudgetCategory[] {
  const budgets: Record<string, BudgetCategory[]> = {
    us: US_BUDGET_2024,
    india: INDIA_BUDGET_2024,
    canada: CANADA_BUDGET_2024,
    uk: UK_BUDGET_2024,
    australia: AUSTRALIA_BUDGET_2024,
  };

  return budgets[countryId] || [];
}

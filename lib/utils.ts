import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    INR: "₹",
    CAD: "C$",
    GBP: "£",
    AUD: "A$",
  };

  const symbol = symbols[currency] || currency;

  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDaily(amount: number): number {
  return amount / 365;
}

export function formatMonthly(amount: number): number {
  return amount / 12;
}

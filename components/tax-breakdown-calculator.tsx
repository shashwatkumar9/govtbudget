"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BudgetCategory, BudgetBreakdownItem, FilingStatus } from "@/types";
import { formatCurrency, formatDaily, formatMonthly } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  calculateUSFederalTax,
  calculateIndiaIncomeTax,
  calculateCanadaFederalTax,
  calculateUKIncomeTax,
  calculateAustraliaIncomeTax,
} from "@/data/tax-calculators";

interface TaxBreakdownCalculatorProps {
  countryId: string;
  countryName: string;
  currencySymbol: string;
  currencyCode: string;
  budgetData: BudgetCategory[];
  showFilingStatus?: boolean;
  showStateSelector?: boolean;
}

export function TaxBreakdownCalculator({
  countryId,
  countryName,
  currencySymbol,
  currencyCode,
  budgetData,
  showFilingStatus = false,
  showStateSelector = false,
}: TaxBreakdownCalculatorProps) {
  const [income, setIncome] = React.useState<string>("");
  const [filingStatus, setFilingStatus] = React.useState<FilingStatus>("single");
  const [breakdown, setBreakdown] = React.useState<BudgetBreakdownItem[]>([]);
  const [totalTax, setTotalTax] = React.useState<number>(0);

  const handleCalculate = () => {
    const incomeValue = parseFloat(income.replace(/,/g, ""));
    if (isNaN(incomeValue) || incomeValue <= 0) {
      alert("Please enter a valid income amount");
      return;
    }

    // Calculate tax based on country
    let tax = 0;
    switch (countryId) {
      case "us":
        tax = showFilingStatus
          ? calculateUSFederalTax(incomeValue, filingStatus)
          : calculateUSFederalTax(incomeValue, "single");
        break;
      case "india":
        tax = calculateIndiaIncomeTax(incomeValue, "new");
        break;
      case "canada":
        tax = calculateCanadaFederalTax(incomeValue);
        break;
      case "uk":
        tax = calculateUKIncomeTax(incomeValue);
        break;
      case "australia":
        tax = calculateAustraliaIncomeTax(incomeValue);
        break;
      default:
        alert(`Tax calculator not found for country: ${countryId}`);
        return;
    }

    setTotalTax(tax);

    const breakdownItems: BudgetBreakdownItem[] = budgetData.map((item) => ({
      ...item,
      amount: tax * (item.percentage / 100),
      daily: formatDaily(tax * (item.percentage / 100)),
      monthly: formatMonthly(tax * (item.percentage / 100)),
    }));

    setBreakdown(breakdownItems);
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    if (value === "") {
      setIncome("");
      return;
    }
    const numValue = parseInt(value);
    setIncome(numValue.toLocaleString());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Where Do Your Taxes Go? - {countryName}</CardTitle>
          <CardDescription>
            Enter your annual income to see how your tax dollars are allocated
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {currencySymbol}
              </span>
              <Input
                type="text"
                value={income}
                onChange={handleIncomeChange}
                placeholder="75,000"
                className="pl-8"
              />
            </div>
          </div>

          {showFilingStatus && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filing Status
              </label>
              <div className="space-y-2">
                {[
                  { value: "single", label: "Single" },
                  { value: "married_joint", label: "Married Filing Jointly" },
                  { value: "married_separate", label: "Married Filing Separately" },
                  { value: "head_of_household", label: "Head of Household" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={option.value}
                      checked={filingStatus === option.value}
                      onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full" size="lg">
            Calculate My Tax Breakdown
          </Button>
        </CardContent>
      </Card>

      {breakdown.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Your Tax Breakdown</CardTitle>
              <CardDescription>
                Total Tax: {formatCurrency(totalTax, currencyCode)} / year (
                {formatCurrency(formatMonthly(totalTax), currencyCode)}/month,{" "}
                {formatCurrency(formatDaily(totalTax), currencyCode)}/day)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={breakdown} layout="horizontal">
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={150} fontSize={12} />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value, currencyCode)}
                      />
                      <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                        {breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">
                    Here's where your {formatCurrency(totalTax, currencyCode)} goes:
                  </h3>
                  {breakdown.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="font-medium">{item.category}</div>
                          <div className="text-sm text-gray-500">
                            {item.percentage}% of your taxes
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(item.amount, currencyCode)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.daily, currencyCode)}/day
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">
                Every day, you pay {formatCurrency(formatDaily(totalTax), currencyCode)} in
                taxes:
              </p>
              <ul className="space-y-1 text-sm">
                {breakdown.map((item, index) => (
                  <li key={index}>
                    • {formatCurrency(item.daily, currencyCode)} for {item.category}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

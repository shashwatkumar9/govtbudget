"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BudgetOverviewProps {
  country: string;
  flagEmoji: string;
  fiscalYear: number;
  totalSpending: number;
  totalRevenue: number;
  deficit: number;
  debt: number;
  currencyCode: string;
  budgetData: BudgetCategory[];
}

export function BudgetOverview({
  country,
  flagEmoji,
  fiscalYear,
  totalSpending,
  totalRevenue,
  deficit,
  debt,
  currencyCode,
  budgetData,
}: BudgetOverviewProps) {
  const chartData = budgetData.map((item) => ({
    name: item.category,
    value: item.percentage,
    color: item.color,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">{flagEmoji}</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {country} Federal Budget {fiscalYear}
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive breakdown of government spending and revenue
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spending</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalSpending, currencyCode)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalRevenue, currencyCode)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Deficit</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(deficit, currencyCode)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>National Debt</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(debt, currencyCode)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>
            Breakdown of {fiscalYear} budget allocation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetData.map((item, index) => {
              const amount = totalSpending * (item.percentage / 100);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.category}
                      </h3>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg text-gray-900">
                      {formatCurrency(amount, currencyCode)}
                    </p>
                    <p className="text-sm text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

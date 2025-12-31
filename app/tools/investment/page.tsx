"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [years, setYears] = useState("10");
  const [returnRate, setReturnRate] = useState("7");

  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [totalEarnings, setTotalEarnings] = useState<number | null>(null);

  const calculate = () => {
    const initial = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyContribution);
    const yearsNum = parseFloat(years);
    const rate = parseFloat(returnRate) / 100;

    if (!isNaN(initial) && !isNaN(monthly) && !isNaN(yearsNum) && !isNaN(rate)) {
      const months = yearsNum * 12;
      const monthlyRate = rate / 12;

      // Future value of initial amount
      const fvInitial = initial * Math.pow(1 + monthlyRate, months);

      // Future value of monthly contributions
      const fvContributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

      const total = fvInitial + fvContributions;
      const contributions = initial + (monthly * months);
      const earnings = total - contributions;

      setFutureValue(total);
      setTotalContributions(contributions);
      setTotalEarnings(earnings);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            💼 Investment Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate how your investments will grow over time with regular contributions and compound returns.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Plan your long-term investment strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="initialAmount">Initial Investment ($)</Label>
              <Input
                id="initialAmount"
                type="number"
                step="1000"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                placeholder="e.g., 10000"
              />
            </div>

            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                step="50"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="e.g., 500"
              />
            </div>

            <div>
              <Label htmlFor="years">Investment Period (years)</Label>
              <Input
                id="years"
                type="number"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="e.g., 10"
              />
              <div className="flex gap-2 mt-2">
                {[5, 10, 20, 30].map((y) => (
                  <Button
                    key={y}
                    variant={years === y.toString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setYears(y.toString())}
                    className="text-xs"
                  >
                    {y}yr
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="returnRate">Expected Annual Return (%)</Label>
              <Input
                id="returnRate"
                type="number"
                step="0.1"
                value={returnRate}
                onChange={(e) => setReturnRate(e.target.value)}
                placeholder="e.g., 7"
              />
              <p className="text-xs text-gray-500 mt-1">
                Historical S&P 500 average: ~10% (7% after inflation)
              </p>
            </div>

            <Button onClick={calculate} className="w-full" size="lg">
              Calculate Future Value
            </Button>

            {futureValue !== null && (
              <div className="space-y-4">
                <Card className="border-2 border-blue-300 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardDescription>Future Value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-blue-600">
                      ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      after {years} years at {returnRate}% annual return
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Contributions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        ${totalContributions?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        your money invested
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50">
                    <CardHeader className="pb-3">
                      <CardDescription>Investment Earnings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        ${totalEarnings?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        compound growth
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Initial Investment</span>
                        <span className="font-bold">${parseFloat(initialAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Contributions ({parseFloat(years) * 12} months)</span>
                        <span className="font-bold">${(parseFloat(monthlyContribution) * parseFloat(years) * 12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total Contributed</span>
                        <span className="font-bold">${totalContributions?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Investment Earnings</span>
                        <span className="font-bold">+${totalEarnings?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 text-lg">
                        <span className="font-bold">Future Value</span>
                        <span className="font-bold text-blue-600">${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Earnings as % of Contributions</span>
                        <span>{((totalEarnings! / totalContributions!) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle>Investment Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">⏰ Start Early</div>
                <div className="text-gray-600">Time is your biggest advantage. Starting 10 years earlier can double your returns.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">📅 Invest Regularly</div>
                <div className="text-gray-600">Consistent monthly contributions are more important than trying to time the market.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">🔄 Compound Interest</div>
                <div className="text-gray-600">Reinvesting earnings creates exponential growth over time.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">📊 Diversify</div>
                <div className="text-gray-600">Spread investments across different assets to reduce risk.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/tools">
            <Button variant="outline" size="lg">
              ← Back to All Tools
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

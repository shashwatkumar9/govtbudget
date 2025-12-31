"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100;

    const years = retAge - age;
    const monthlyRate = rate / 12;
    const months = years * 12;

    // Future value of current savings
    const fvSavings = savings * Math.pow(1 + rate, years);

    // Future value of monthly contributions
    const fvContributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalAtRetirement = fvSavings + fvContributions;
    const totalContributed = savings + (monthly * months);

    // Generate chart data
    const chartData = [];
    for (let year = 0; year <= years; year++) {
      const currentYear = age + year;
      const monthsElapsed = year * 12;
      const savingsGrowth = savings * Math.pow(1 + rate, year);
      const contributionsGrowth = monthly * ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate);

      chartData.push({
        year: currentYear,
        balance: Math.round(savingsGrowth + contributionsGrowth),
      });
    }

    setResult({
      totalAtRetirement: Math.round(totalAtRetirement),
      totalContributed: Math.round(totalContributed),
      interestEarned: Math.round(totalAtRetirement - totalContributed),
      years,
      chartData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💰 Retirement Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Plan your retirement savings and see how much you'll have
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Retirement Planning Calculator</CardTitle>
            <CardDescription>
              Calculate how much you'll have saved by retirement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Age
                </label>
                <Input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retirement Age
                </label>
                <Input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  placeholder="65"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Savings ($)
                </label>
                <Input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Contribution ($)
                </label>
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(e.target.value)}
                  placeholder="7"
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Retirement Savings
            </Button>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Total at Retirement</div>
                        <div className="text-2xl font-bold text-green-600">
                          ${result.totalAtRetirement.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Total Contributed</div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${result.totalContributed.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Interest Earned</div>
                        <div className="text-2xl font-bold text-purple-600">
                          ${result.interestEarned.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={result.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                        <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

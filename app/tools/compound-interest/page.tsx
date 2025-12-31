"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState<string>("10000");
  const [rate, setRate] = useState<string>("7");
  const [time, setTime] = useState<string>("10");
  const [frequency, setFrequency] = useState<string>("12");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("0");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalContributions: number;
    totalInterest: number;
    chartData: Array<{ year: number; value: number }>;
  } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);
    const pmt = parseFloat(monthlyContribution);

    if (isNaN(p) || p < 0 || isNaN(r) || r < 0 || isNaN(t) || t <= 0 || isNaN(n) || n <= 0) {
      alert("Please enter valid values");
      return;
    }

    const chartData = [];
    let currentAmount = p;

    for (let year = 0; year <= t; year++) {
      if (year > 0) {
        // Compound interest on principal + contributions
        const periodsPerYear = n;
        for (let period = 0; period < periodsPerYear; period++) {
          currentAmount = currentAmount * (1 + r / n);
          if (n === 12 && pmt > 0) {
            currentAmount += pmt;
          }
        }
      }
      chartData.push({ year, value: parseFloat(currentAmount.toFixed(2)) });
    }

    const finalAmount = currentAmount;
    const totalContributions = p + (pmt * 12 * t);
    const totalInterest = finalAmount - totalContributions;

    setResult({
      finalAmount,
      totalContributions,
      totalInterest,
      chartData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compound Interest Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate how your investments grow over time
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>
              Enter your investment information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Principal ($)
                </label>
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="7"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period (Years)
                </label>
                <Input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compound Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1">Annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                  <option value="365">Daily</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Contribution ($)
                </label>
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Optional: Additional monthly deposits
                </p>
              </div>
            </div>

            <Button onClick={handleCalculate} className="w-full" size="lg">
              Calculate
            </Button>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <p className="text-sm text-gray-600">Final Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${result.finalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <p className="text-sm text-gray-600">Total Contributions</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${result.totalContributions.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <p className="text-sm text-gray-600">Total Interest Earned</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${result.totalInterest.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-semibold text-gray-700 mb-4">Growth Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: "Years", position: "insideBottom", offset: -5 }} />
                        <YAxis label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }} />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} name="Investment Value" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Understanding Compound Interest</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none text-sm">
            <p>
              Compound interest is interest calculated on the initial principal and
              also on the accumulated interest from previous periods. Einstein
              reportedly called it "the eighth wonder of the world."
            </p>
            <h4 className="font-semibold mt-4 mb-2">Formula:</h4>
            <p className="font-mono bg-gray-100 p-2 rounded">
              A = P(1 + r/n)^(nt)
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>A = Final amount</li>
              <li>P = Principal (initial investment)</li>
              <li>r = Annual interest rate (decimal)</li>
              <li>n = Compounding frequency per year</li>
              <li>t = Time in years</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

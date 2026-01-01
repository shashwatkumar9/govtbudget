"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CarLoanCalculator() {
  const [carPrice, setCarPrice] = useState("30000");
  const [downPayment, setDownPayment] = useState("5000");
  const [loanTerm, setLoanTerm] = useState("60");
  const [interestRate, setInterestRate] = useState("6.5");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculate = () => {
    const price = parseFloat(carPrice);
    const down = parseFloat(downPayment);
    const months = parseInt(loanTerm);
    const rate = parseFloat(interestRate) / 100 / 12;

    if (!isNaN(price) && !isNaN(down) && !isNaN(months) && !isNaN(rate)) {
      const principal = price - down;

      if (rate === 0) {
        const payment = principal / months;
        setMonthlyPayment(payment);
        setTotalPayment(principal);
        setTotalInterest(0);
        setLoanAmount(principal);
      } else {
        const payment = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        const total = payment * months;
        const interest = total - principal;

        setMonthlyPayment(payment);
        setTotalPayment(total);
        setTotalInterest(interest);
        setLoanAmount(principal);

        // Generate amortization chart data (yearly breakdown)
        const years = Math.ceil(months / 12);
        const data = [];
        let remainingBalance = principal;

        for (let year = 0; year <= years; year++) {
          const monthsElapsed = Math.min(year * 12, months);
          const paymentsRemaining = months - monthsElapsed;

          if (paymentsRemaining > 0) {
            remainingBalance = principal * (Math.pow(1 + rate, months) - Math.pow(1 + rate, monthsElapsed)) / (Math.pow(1 + rate, months) - 1);
          } else {
            remainingBalance = 0;
          }

          data.push({
            year: year,
            balance: Math.max(0, Math.round(remainingBalance)),
            paid: Math.round(principal - remainingBalance),
          });
        }

        setChartData(data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            🚗 Auto Loan Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Car Loan Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly car loan payment and see how much interest you'll pay over the life of the loan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your car purchase information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="carPrice">Car Price ($)</Label>
                <Input
                  id="carPrice"
                  type="number"
                  step="1000"
                  value={carPrice}
                  onChange={(e) => setCarPrice(e.target.value)}
                  placeholder="e.g., 30000"
                />
              </div>

              <div>
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  step="500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="e.g., 5000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {parseFloat(downPayment) && parseFloat(carPrice)
                    ? `${((parseFloat(downPayment) / parseFloat(carPrice)) * 100).toFixed(1)}% down`
                    : ''}
                </p>
              </div>

              <div>
                <Label htmlFor="loanTerm">Loan Term (months)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="e.g., 60"
                />
                <div className="flex gap-2 mt-2">
                  {[36, 48, 60, 72, 84].map((term) => (
                    <Button
                      key={term}
                      variant={loanTerm === term.toString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoanTerm(term.toString())}
                      className="text-xs"
                    >
                      {term / 12}yr
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="interestRate">Interest Rate (% per year)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="e.g., 6.5"
                />
              </div>

              <Button onClick={calculate} className="w-full" size="lg">
                Calculate Payment
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {monthlyPayment !== null && (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-2 border-blue-300 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardDescription>Monthly Payment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        ${monthlyPayment.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        for {loanTerm} months
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Loan Amount</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        ${loanAmount?.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        after ${parseFloat(downPayment).toLocaleString()} down
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Interest</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        ${totalInterest?.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        over life of loan
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Payment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        ${totalPayment?.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        principal + interest
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Loan Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Car Price</span>
                        <span className="font-bold">${parseFloat(carPrice).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Down Payment</span>
                        <span className="font-bold">-${parseFloat(downPayment).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Amount Financed</span>
                        <span className="font-bold">${loanAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-orange-600">
                        <span>Total Interest</span>
                        <span className="font-bold">+${totalInterest?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 text-lg">
                        <span className="font-bold">Total Amount Paid</span>
                        <span className="font-bold text-blue-600">${(totalPayment! + parseFloat(downPayment)).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payoff Chart */}
                {chartData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Loan Payoff Progress</CardTitle>
                      <CardDescription>Balance remaining over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                          <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip formatter={(value) => `$${Number(value || 0).toLocaleString()}`} />
                          <Legend />
                          <Line type="monotone" dataKey="balance" stroke="#ef4444" name="Balance Remaining" strokeWidth={2} />
                          <Line type="monotone" dataKey="paid" stroke="#22c55e" name="Amount Paid" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle>Car Loan Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">💰 Put More Down</div>
                <div className="text-gray-600">A larger down payment (20%+) reduces monthly payments and total interest paid.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">⏱️ Shorter Terms</div>
                <div className="text-gray-600">Shorter loan terms (36-48 months) mean higher monthly payments but much less interest.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">📊 Shop Around</div>
                <div className="text-gray-600">Compare rates from multiple lenders. Even 0.5% difference can save thousands.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">🎯 Stay Under Budget</div>
                <div className="text-gray-600">Total monthly car costs (payment + insurance + gas + maintenance) should be under 20% of income.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <div className="mt-8 text-center">
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

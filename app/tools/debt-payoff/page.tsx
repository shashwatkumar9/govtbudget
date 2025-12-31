"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DebtPayoffCalculator() {
  const [totalDebt, setTotalDebt] = useState("10000");
  const [interestRate, setInterestRate] = useState("18");
  const [monthlyPayment, setMonthlyPayment] = useState("300");
  const [payoffMonths, setPayoffMonths] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPaid, setTotalPaid] = useState<number | null>(null);

  const calculate = () => {
    const debt = parseFloat(totalDebt);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);

    if (!isNaN(debt) && !isNaN(rate) && !isNaN(payment) && payment > 0) {
      if (payment <= debt * rate) {
        // Payment too small to cover interest
        setPayoffMonths(null);
        setTotalInterest(null);
        setTotalPaid(null);
        alert("Monthly payment must be greater than the monthly interest to pay off debt!");
        return;
      }

      let balance = debt;
      let months = 0;
      let interestPaid = 0;

      while (balance > 0 && months < 600) {
        const interest = balance * rate;
        const principal = Math.min(payment - interest, balance);
        balance -= principal;
        interestPaid += interest;
        months++;
      }

      setPayoffMonths(months);
      setTotalInterest(interestPaid);
      setTotalPaid(debt + interestPaid);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            💳 Debt Management Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Debt Payoff Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate how long it will take to pay off your debt and how much interest you'll pay.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Debt Details</CardTitle>
            <CardDescription>Enter your debt information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="totalDebt">Total Debt ($)</Label>
              <Input
                id="totalDebt"
                type="number"
                step="100"
                value={totalDebt}
                onChange={(e) => setTotalDebt(e.target.value)}
                placeholder="e.g., 10000"
              />
            </div>

            <div>
              <Label htmlFor="interestRate">Interest Rate (% per year)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g., 18"
              />
            </div>

            <div>
              <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
              <Input
                id="monthlyPayment"
                type="number"
                step="10"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                placeholder="e.g., 300"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum payment usually around {(parseFloat(totalDebt) * 0.02).toFixed(0)} (2% of balance)
              </p>
            </div>

            <Button onClick={calculate} className="w-full" size="lg">
              Calculate Payoff Time
            </Button>

            {payoffMonths !== null && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-blue-300 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardDescription>Time to Payoff</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {payoffMonths} months
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {Math.floor(payoffMonths / 12)} years, {payoffMonths % 12} months
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Interest Paid</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        ${totalInterest?.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {((totalInterest! / parseFloat(totalDebt)) * 100).toFixed(1)}% of principal
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Payoff Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Original Debt</span>
                        <span className="font-bold">${parseFloat(totalDebt).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-orange-600">
                        <span>+ Total Interest</span>
                        <span className="font-bold">${totalInterest?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 text-lg">
                        <span className="font-bold">Total Amount Paid</span>
                        <span className="font-bold text-blue-600">${totalPaid?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Monthly Payment</span>
                        <span>${parseFloat(monthlyPayment).toFixed(2)}</span>
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
            <CardTitle>Debt Payoff Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">⚡ Debt Avalanche</div>
                <div className="text-gray-600">Pay minimums on all debts, extra goes to highest interest rate first. Saves most money.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">❄️ Debt Snowball</div>
                <div className="text-gray-600">Pay minimums on all debts, extra goes to smallest balance first. Best for motivation.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">💰 Pay More</div>
                <div className="text-gray-600">Even small extra payments significantly reduce payoff time and interest paid.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">📞 Negotiate</div>
                <div className="text-gray-600">Call creditors to negotiate lower interest rates. Many will reduce rates for good customers.</div>
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

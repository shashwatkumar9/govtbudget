"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const years = parseInt(loanTerm);
    const rate = parseFloat(interestRate) / 100 / 12;

    const principal = price - down;
    const months = years * 12;

    const monthlyPayment = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal),
      downPaymentPercent: ((down / price) * 100).toFixed(1),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏠 Mortgage Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your monthly mortgage payment
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Home Loan Calculator</CardTitle>
            <CardDescription>
              Find out your monthly payment, total cost, and interest
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price ($)
                </label>
                <Input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  placeholder="300000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment ($)
                </label>
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="60000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (years)
                </label>
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="6.5"
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Mortgage
            </Button>

            {result && (
              <div className="mt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                        <div className="text-3xl font-bold text-blue-600">
                          ${result.monthlyPayment.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${result.principal.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Down: {result.downPaymentPercent}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Total Payment</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${result.totalPayment.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                        <div className="text-2xl font-bold text-red-600">
                          ${result.totalInterest.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

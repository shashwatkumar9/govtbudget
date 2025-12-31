"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>("200000");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    principalPercentage: number;
    interestPercentage: number;
  } | null>(null);

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (isNaN(principal) || principal <= 0) {
      alert("Please enter a valid loan amount");
      return;
    }

    if (isNaN(annualRate) || annualRate < 0) {
      alert("Please enter a valid interest rate");
      return;
    }

    if (isNaN(years) || years <= 0) {
      alert("Please enter a valid loan term");
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const principalPercentage = (principal / totalPayment) * 100;
    const interestPercentage = (totalInterest / totalPayment) * 100;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principalPercentage,
      interestPercentage,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loan EMI Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your monthly loan payments and total interest
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>
              Enter your loan information to calculate EMI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($)
              </label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="200000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Principal amount you want to borrow
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="6.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (Years)
              </label>
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="30"
              />
            </div>

            <Button onClick={handleCalculate} className="w-full" size="lg">
              Calculate EMI
            </Button>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Monthly Payment (EMI)
                    </p>
                    <p className="text-4xl font-bold text-blue-600">
                      ${result.monthlyPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">per month</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600">Total Payment</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${result.totalPayment.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Over {loanTerm} years
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ${result.totalInterest.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {result.interestPercentage.toFixed(1)}% of total
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-semibold text-gray-700 mb-4">
                    Payment Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Principal</span>
                        <span className="text-sm font-semibold">
                          ${parseFloat(loanAmount).toLocaleString()} (
                          {result.principalPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${result.principalPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Interest</span>
                        <span className="text-sm font-semibold">
                          ${result.totalInterest.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          ({result.interestPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${result.interestPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Summary:</strong> You'll pay{" "}
                      <strong>
                        ${result.monthlyPayment.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </strong>{" "}
                      per month for{" "}
                      <strong>{parseFloat(loanTerm) * 12} months</strong>. Total
                      interest paid will be{" "}
                      <strong>
                        ${result.totalInterest.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Understanding Loan EMI</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none text-sm">
            <p>
              EMI (Equated Monthly Installment) is the fixed amount you pay to your
              lender every month to repay your loan. It includes both the principal
              amount and the interest on the loan.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Common Loan Types:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Home Loan:</strong> Typically 15-30 years, 3-7% interest
              </li>
              <li>
                <strong>Car Loan:</strong> Typically 3-7 years, 4-9% interest
              </li>
              <li>
                <strong>Personal Loan:</strong> Typically 1-5 years, 6-15% interest
              </li>
              <li>
                <strong>Student Loan:</strong> Typically 10-25 years, 3-8% interest
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

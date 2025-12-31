"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SavingsGoalPage() {
  const [goalAmount, setGoalAmount] = useState<string>("50000");
  const [currentSavings, setCurrentSavings] = useState<string>("5000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [interestRate, setInterestRate] = useState<string>("5");
  const [result, setResult] = useState<{
    monthsToGoal: number;
    yearsToGoal: number;
    totalContributions: number;
    interestEarned: number;
    finalAmount: number;
  } | null>(null);

  const handleCalculate = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate);

    if (isNaN(goal) || goal <= 0) {
      alert("Please enter a valid goal amount");
      return;
    }

    if (isNaN(current) || current < 0) {
      alert("Please enter a valid current savings amount");
      return;
    }

    if (isNaN(monthly) || monthly <= 0) {
      alert("Please enter a valid monthly contribution");
      return;
    }

    if (isNaN(rate) || rate < 0) {
      alert("Please enter a valid interest rate");
      return;
    }

    // Calculate months to reach goal with compound interest
    const monthlyRate = rate / 100 / 12;
    let balance = current;
    let months = 0;
    const maxMonths = 1200; // 100 years limit

    while (balance < goal && months < maxMonths) {
      balance = balance * (1 + monthlyRate) + monthly;
      months++;
    }

    if (months >= maxMonths) {
      alert("Goal will take more than 100 years to achieve with current settings");
      return;
    }

    const totalContributions = monthly * months;
    const interestEarned = balance - current - totalContributions;
    const yearsToGoal = months / 12;

    setResult({
      monthsToGoal: months,
      yearsToGoal,
      totalContributions,
      interestEarned,
      finalAmount: balance,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Savings Goal Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate how long it will take to reach your savings goal
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Savings Goal</CardTitle>
            <CardDescription>
              Enter your goal details to see when you'll reach it
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Savings Goal ($)
              </label>
              <Input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="50000"
              />
              <p className="text-sm text-gray-500 mt-1">
                How much do you want to save?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Savings ($)
              </label>
              <Input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                placeholder="5000"
              />
              <p className="text-sm text-gray-500 mt-1">
                How much have you already saved?
              </p>
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
              <p className="text-sm text-gray-500 mt-1">
                How much will you save each month?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Annual Return (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="5"
              />
              <p className="text-sm text-gray-500 mt-1">
                Expected interest/return rate on savings
              </p>
            </div>

            <Button onClick={handleCalculate} className="w-full" size="lg">
              Calculate
            </Button>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Time to Reach Goal
                    </p>
                    <p className="text-4xl font-bold text-green-600">
                      {result.yearsToGoal.toFixed(1)} Years
                    </p>
                    <p className="text-lg text-gray-600 mt-1">
                      ({result.monthsToGoal} months)
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600">Total Contributions</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${result.totalContributions.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ${parseFloat(monthlyContribution).toLocaleString()}/month
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600">Interest Earned</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${result.interestEarned.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      From {interestRate}% annual return
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-semibold text-gray-700 mb-4">Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Savings</span>
                      <span className="font-semibold">
                        ${parseFloat(currentSavings).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Monthly Contributions ({result.monthsToGoal} months)
                      </span>
                      <span className="font-semibold">
                        ${result.totalContributions.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Interest Earned</span>
                      <span className="font-semibold text-purple-600">
                        +$
                        {result.interestEarned.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Final Amount</span>
                      <span className="font-bold text-green-600 text-xl">
                        ${result.finalAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
                    <p className="text-sm text-gray-700">
                      <strong>Target Date:</strong> You'll reach your savings goal of $
                      {parseFloat(goalAmount).toLocaleString()} in approximately{" "}
                      <strong>
                        {new Date(
                          Date.now() + result.monthsToGoal * 30 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
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
            <CardTitle>Popular Savings Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">Emergency Fund</p>
                <p className="text-gray-600">3-6 months of expenses</p>
                <p className="text-xs text-gray-500 mt-1">Typical: $15,000-30,000</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">House Down Payment</p>
                <p className="text-gray-600">10-20% of home price</p>
                <p className="text-xs text-gray-500 mt-1">Typical: $40,000-80,000</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">Vacation</p>
                <p className="text-gray-600">Dream trip or holiday</p>
                <p className="text-xs text-gray-500 mt-1">Typical: $3,000-10,000</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">Car Purchase</p>
                <p className="text-gray-600">New or used vehicle</p>
                <p className="text-xs text-gray-500 mt-1">Typical: $15,000-35,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

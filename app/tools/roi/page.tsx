"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [finalValue, setFinalValue] = useState("12500");
  const [roi, setRoi] = useState<number | null>(null);
  const [gain, setGain] = useState<number | null>(null);

  // Additional costs
  const [additionalCosts, setAdditionalCosts] = useState("0");

  const calculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const costs = parseFloat(additionalCosts);

    if (!isNaN(initial) && !isNaN(final) && !isNaN(costs)) {
      const netGain = final - initial - costs;
      const roiPercent = (netGain / (initial + costs)) * 100;

      setRoi(roiPercent);
      setGain(netGain);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            📊 Investment Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ROI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate Return on Investment (ROI) to measure the profitability of your investments.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>ROI = (Net Gain / Cost of Investment) × 100%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                step="100"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="e.g., 10000"
              />
            </div>

            <div>
              <Label htmlFor="finalValue">Final Value ($)</Label>
              <Input
                id="finalValue"
                type="number"
                step="100"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                placeholder="e.g., 12500"
              />
            </div>

            <div>
              <Label htmlFor="additionalCosts">Additional Costs ($)</Label>
              <Input
                id="additionalCosts"
                type="number"
                step="10"
                value={additionalCosts}
                onChange={(e) => setAdditionalCosts(e.target.value)}
                placeholder="e.g., 0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Fees, commissions, taxes, etc.
              </p>
            </div>

            <Button onClick={calculate} className="w-full" size="lg">
              Calculate ROI
            </Button>

            {roi !== null && (
              <div className="space-y-4">
                <Card className={`border-2 ${roi >= 0 ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <CardHeader className="pb-3">
                    <CardDescription>Return on Investment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {roi >= 0 ? '✓ Profitable Investment' : '✗ Loss'}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Net Gain/Loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${gain! >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gain! >= 0 ? '+' : ''}${gain?.toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Cost</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        ${(parseFloat(initialInvestment) + parseFloat(additionalCosts)).toLocaleString()}
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
                        <span className="font-bold">${parseFloat(initialInvestment).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Costs</span>
                        <span className="font-bold">${parseFloat(additionalCosts).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total Cost</span>
                        <span className="font-bold">${(parseFloat(initialInvestment) + parseFloat(additionalCosts)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Value</span>
                        <span className="font-bold">${parseFloat(finalValue).toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between border-t pt-2 ${gain! >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span className="font-bold">Net Gain/Loss</span>
                        <span className="font-bold">{gain! >= 0 ? '+' : ''}${gain?.toFixed(2)}</span>
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
            <CardTitle>Understanding ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <div className="font-bold text-blue-600 mb-1">What is ROI?</div>
                <div>ROI (Return on Investment) measures the efficiency of an investment. A positive ROI means profit, negative means loss.</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 mb-1">Good vs Bad ROI</div>
                <div>• Excellent: 20%+ annually • Good: 10-20% annually • Average: 5-10% annually • Poor: Below 5% or negative</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 mb-1">Include All Costs</div>
                <div>For accurate ROI, include all expenses: fees, taxes, commissions, maintenance, etc.</div>
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

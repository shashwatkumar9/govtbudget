"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PropertyTaxCalculator() {
  const [homeValue, setHomeValue] = useState("300000");
  const [taxRate, setTaxRate] = useState("1.2");
  const [annualTax, setAnnualTax] = useState<number | null>(null);
  const [monthlyTax, setMonthlyTax] = useState<number | null>(null);

  const calculate = () => {
    const value = parseFloat(homeValue);
    const rate = parseFloat(taxRate);

    if (!isNaN(value) && !isNaN(rate)) {
      const annual = (value * rate) / 100;
      const monthly = annual / 12;

      setAnnualTax(annual);
      setMonthlyTax(monthly);
    }
  };

  // Common US state property tax rates
  const stateRates = [
    { state: "New Jersey", rate: "2.49" },
    { state: "Illinois", rate: "2.27" },
    { state: "New Hampshire", rate: "2.18" },
    { state: "Connecticut", rate: "2.14" },
    { state: "Wisconsin", rate: "1.85" },
    { state: "Texas", rate: "1.80" },
    { state: "California", rate: "0.76" },
    { state: "Florida", rate: "0.98" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            🏡 Property Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Tax Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estimate your annual and monthly property taxes based on your home value and local tax rate.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>Enter your home value and local property tax rate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="homeValue">Home Value ($)</Label>
              <Input
                id="homeValue"
                type="number"
                step="1000"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                placeholder="e.g., 300000"
              />
            </div>

            <div>
              <Label htmlFor="taxRate">Property Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="e.g., 1.2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Check your local county assessor's website for your exact rate
              </p>
            </div>

            {/* Quick State Rates */}
            <div>
              <Label className="mb-2 block">Common State Rates:</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {stateRates.map((item) => (
                  <Button
                    key={item.state}
                    variant="outline"
                    size="sm"
                    onClick={() => setTaxRate(item.rate)}
                    className="text-xs"
                  >
                    {item.state.split(' ')[0]} ({item.rate}%)
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={calculate} className="w-full" size="lg">
              Calculate Property Tax
            </Button>

            {annualTax !== null && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-blue-300 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardDescription>Annual Property Tax</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        ${annualTax.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        per year
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-300 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardDescription>Monthly Estimate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        ${monthlyTax?.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        per month (escrow)
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Home Value</span>
                        <span className="font-bold">${parseFloat(homeValue).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax Rate</span>
                        <span className="font-bold">{taxRate}%</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-bold">Annual Property Tax</span>
                        <span className="font-bold text-blue-600">${annualTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Monthly Payment (if escrowed)</span>
                        <span>${monthlyTax?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>% of Home Value</span>
                        <span>{((annualTax / parseFloat(homeValue)) * 100).toFixed(2)}%</span>
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
            <CardTitle>Property Tax Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <div className="font-bold text-blue-600 mb-1">📍 Where Tax Money Goes</div>
                <div>Property taxes typically fund local schools (50-60%), police/fire departments, roads, parks, and municipal services.</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 mb-1">🏠 Escrow Accounts</div>
                <div>Many mortgages include property taxes in monthly payments via escrow accounts, paid by lender on your behalf.</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 mb-1">📊 Reassessments</div>
                <div>Property values are periodically reassessed. Your taxes may change even if rates stay the same.</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 mb-1">💰 Deductions</div>
                <div>Property taxes may be tax-deductible on federal returns (subject to $10K SALT cap).</div>
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

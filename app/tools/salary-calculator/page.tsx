"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState("75000");
  const [taxRate, setTaxRate] = useState("22");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const annual = parseFloat(annualSalary);
    const rate = parseFloat(taxRate) / 100;

    const annualTax = annual * rate;
    const netAnnual = annual - annualTax;
    const monthlyGross = annual / 12;
    const monthlyTax = annualTax / 12;
    const monthlyNet = netAnnual / 12;
    const weeklyNet = netAnnual / 52;
    const dailyNet = netAnnual / 260; // 5 day week

    setResult({
      annualGross: Math.round(annual),
      annualTax: Math.round(annualTax),
      annualNet: Math.round(netAnnual),
      monthlyGross: Math.round(monthlyGross),
      monthlyTax: Math.round(monthlyTax),
      monthlyNet: Math.round(monthlyNet),
      weeklyNet: Math.round(weeklyNet),
      dailyNet: Math.round(dailyNet),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💼 Salary Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your take-home pay after taxes
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gross to Net Salary Calculator</CardTitle>
            <CardDescription>
              See your actual take-home pay
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Salary ($)
                </label>
                <Input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value)}
                  placeholder="75000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Tax Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="22"
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full">
              Calculate Take-Home Pay
            </Button>

            {result && (
              <div className="mt-6 space-y-4">
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Annual Net Income</div>
                      <div className="text-3xl font-bold text-green-600">
                        ${result.annualNet.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        After ${result.annualTax.toLocaleString()} in taxes
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Monthly</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${result.monthlyNet.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          From ${result.monthlyGross.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Weekly</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${result.weeklyNet.toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Daily</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${result.dailyNet.toLocaleString()}
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

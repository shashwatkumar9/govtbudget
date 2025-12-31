"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("100");
  const [tipPercent, setTipPercent] = useState("18");
  const [numPeople, setNumPeople] = useState("1");
  const [result, setResult] = useState<any>(null);

  const calculateTip = (percent: string) => {
    setTipPercent(percent);
    const bill = parseFloat(billAmount);
    const tip = parseFloat(percent) / 100;
    const people = parseInt(numPeople);

    const tipAmount = bill * tip;
    const total = bill + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;

    setResult({
      tipAmount: Math.round(tipAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍽️ Tip Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate tips and split bills easily
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Restaurant Tip Calculator</CardTitle>
            <CardDescription>
              Quick tip calculation and bill splitting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bill Amount ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="100.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People
                </label>
                <Input
                  type="number"
                  value={numPeople}
                  onChange={(e) => setNumPeople(e.target.value)}
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tip Percentage
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {["15", "18", "20", "25"].map((percent) => (
                    <Button
                      key={percent}
                      variant={tipPercent === percent ? "default" : "outline"}
                      onClick={() => calculateTip(percent)}
                      className="w-full"
                    >
                      {percent}%
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(e.target.value)}
                  placeholder="18"
                />
              </div>
            </div>

            <Button onClick={() => calculateTip(tipPercent)} className="w-full" size="lg">
              Calculate Tip
            </Button>

            {result && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-green-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Tip Amount</div>
                        <div className="text-3xl font-bold text-green-600">
                          ${result.tipAmount.toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Total Bill</div>
                        <div className="text-3xl font-bold text-blue-600">
                          ${result.total.toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {parseInt(numPeople) > 1 && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Per Person</div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${result.perPerson.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          (Includes ${result.tipPerPerson.toFixed(2)} tip each)
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

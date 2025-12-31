"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<"what-is" | "percentage-of" | "increase" | "decrease">("what-is");

  // What is X% of Y
  const [whatIsPercent, setWhatIsPercent] = useState("10");
  const [whatIsNumber, setWhatIsNumber] = useState("100");
  const [whatIsResult, setWhatIsResult] = useState<number | null>(null);

  // X is what % of Y
  const [partValue, setPartValue] = useState("25");
  const [totalValue, setTotalValue] = useState("100");
  const [percentageResult, setPercentageResult] = useState<number | null>(null);

  // Percentage increase/decrease
  const [originalValue, setOriginalValue] = useState("100");
  const [newValue, setNewValue] = useState("120");
  const [changeResult, setChangeResult] = useState<number | null>(null);

  const calculateWhatIs = () => {
    const percent = parseFloat(whatIsPercent);
    const number = parseFloat(whatIsNumber);
    if (!isNaN(percent) && !isNaN(number)) {
      setWhatIsResult((percent / 100) * number);
    }
  };

  const calculatePercentageOf = () => {
    const part = parseFloat(partValue);
    const total = parseFloat(totalValue);
    if (!isNaN(part) && !isNaN(total) && total !== 0) {
      setPercentageResult((part / total) * 100);
    }
  };

  const calculateChange = () => {
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(original) && !isNaN(newVal) && original !== 0) {
      setChangeResult(((newVal - original) / original) * 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            📐 Math Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Percentage Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick percentage calculations for any situation. Calculate percentages, increases, decreases, and more.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="grid md:grid-cols-4 gap-3 mb-8">
          <Button
            variant={mode === "what-is" ? "default" : "outline"}
            onClick={() => setMode("what-is")}
            className="h-auto py-4"
          >
            <div>
              <div className="font-bold">What is</div>
              <div className="text-xs">X% of Y</div>
            </div>
          </Button>
          <Button
            variant={mode === "percentage-of" ? "default" : "outline"}
            onClick={() => setMode("percentage-of")}
            className="h-auto py-4"
          >
            <div>
              <div className="font-bold">Percentage</div>
              <div className="text-xs">X is what % of Y</div>
            </div>
          </Button>
          <Button
            variant={mode === "increase" ? "default" : "outline"}
            onClick={() => setMode("increase")}
            className="h-auto py-4"
          >
            <div>
              <div className="font-bold">Increase</div>
              <div className="text-xs">% change</div>
            </div>
          </Button>
          <Button
            variant={mode === "decrease" ? "default" : "outline"}
            onClick={() => setMode("decrease")}
            className="h-auto py-4"
          >
            <div>
              <div className="font-bold">Decrease</div>
              <div className="text-xs">% change</div>
            </div>
          </Button>
        </div>

        {/* What is X% of Y */}
        {mode === "what-is" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What is X% of Y?</CardTitle>
              <CardDescription>Calculate what a percentage of a number equals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatIsPercent">Percentage (%)</Label>
                  <Input
                    id="whatIsPercent"
                    type="number"
                    value={whatIsPercent}
                    onChange={(e) => setWhatIsPercent(e.target.value)}
                    placeholder="e.g., 15"
                  />
                </div>
                <div>
                  <Label htmlFor="whatIsNumber">Of Number</Label>
                  <Input
                    id="whatIsNumber"
                    type="number"
                    value={whatIsNumber}
                    onChange={(e) => setWhatIsNumber(e.target.value)}
                    placeholder="e.g., 200"
                  />
                </div>
              </div>

              <Button onClick={calculateWhatIs} className="w-full" size="lg">
                Calculate
              </Button>

              {whatIsResult !== null && (
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    {whatIsPercent}% of {whatIsNumber} equals
                  </div>
                  <div className="text-4xl font-bold text-blue-600">
                    {whatIsResult.toFixed(2)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* X is what % of Y */}
        {mode === "percentage-of" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>X is what % of Y?</CardTitle>
              <CardDescription>Find what percentage one number is of another</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partValue">Part (X)</Label>
                  <Input
                    id="partValue"
                    type="number"
                    value={partValue}
                    onChange={(e) => setPartValue(e.target.value)}
                    placeholder="e.g., 25"
                  />
                </div>
                <div>
                  <Label htmlFor="totalValue">Total (Y)</Label>
                  <Input
                    id="totalValue"
                    type="number"
                    value={totalValue}
                    onChange={(e) => setTotalValue(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              <Button onClick={calculatePercentageOf} className="w-full" size="lg">
                Calculate
              </Button>

              {percentageResult !== null && (
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    {partValue} is {percentageResult.toFixed(2)}% of {totalValue}
                  </div>
                  <div className="text-4xl font-bold text-blue-600">
                    {percentageResult.toFixed(2)}%
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Percentage Increase/Decrease */}
        {(mode === "increase" || mode === "decrease") && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Percentage Change</CardTitle>
              <CardDescription>Calculate the percentage increase or decrease between two numbers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalValue">Original Value</Label>
                  <Input
                    id="originalValue"
                    type="number"
                    value={originalValue}
                    onChange={(e) => setOriginalValue(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <Label htmlFor="newValue">New Value</Label>
                  <Input
                    id="newValue"
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g., 120"
                  />
                </div>
              </div>

              <Button onClick={calculateChange} className="w-full" size="lg">
                Calculate
              </Button>

              {changeResult !== null && (
                <div className={`p-6 rounded-lg text-center ${changeResult >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="text-sm text-gray-600 mb-2">
                    From {originalValue} to {newValue}
                  </div>
                  <div className={`text-4xl font-bold ${changeResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {changeResult >= 0 ? '+' : ''}{changeResult.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {changeResult >= 0 ? 'Increase' : 'Decrease'}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Examples */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle>Common Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">💰 Sales Tax</div>
                <div className="text-gray-600">Calculate 8% tax on $50 purchase</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">🏷️ Discounts</div>
                <div className="text-gray-600">Find 20% off on $100 item</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">🍽️ Tips</div>
                <div className="text-gray-600">Calculate 15% tip on restaurant bill</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">📊 Test Scores</div>
                <div className="text-gray-600">Convert 18/20 to percentage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
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

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SalesTaxCalculator() {
  const [priceBeforeTax, setPriceBeforeTax] = useState("100");
  const [taxRate, setTaxRate] = useState("8.5");
  const [salesTax, setSalesTax] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  // Reverse calculation: find pre-tax price
  const [priceAfterTax, setPriceAfterTax] = useState("");
  const [reverseTaxRate, setReverseTaxRate] = useState("8.5");
  const [preTaxPrice, setPreTaxPrice] = useState<number | null>(null);
  const [reverseSalesTax, setReverseSalesTax] = useState<number | null>(null);

  const [mode, setMode] = useState<"forward" | "reverse">("forward");

  const calculateSalesTax = () => {
    const price = parseFloat(priceBeforeTax);
    const rate = parseFloat(taxRate);

    if (!isNaN(price) && !isNaN(rate)) {
      const tax = (price * rate) / 100;
      const total = price + tax;
      setSalesTax(tax);
      setTotalPrice(total);
    }
  };

  const calculateReverse = () => {
    const total = parseFloat(priceAfterTax);
    const rate = parseFloat(reverseTaxRate);

    if (!isNaN(total) && !isNaN(rate)) {
      const preTax = total / (1 + rate / 100);
      const tax = total - preTax;
      setPreTaxPrice(preTax);
      setReverseSalesTax(tax);
    }
  };

  // Common US state tax rates
  const commonRates = [
    { state: "California", rate: "7.25" },
    { state: "Texas", rate: "6.25" },
    { state: "Florida", rate: "6.00" },
    { state: "New York", rate: "4.00" },
    { state: "Illinois", rate: "6.25" },
    { state: "Washington", rate: "6.50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            🛒 Shopping Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sales Tax Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate sales tax and total price for purchases. Works for any country or state tax rate.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          <Button
            variant={mode === "forward" ? "default" : "outline"}
            onClick={() => setMode("forward")}
            className="h-auto py-4"
          >
            <div>
              <div className="font-bold">Calculate Tax</div>
              <div className="text-xs">Price before tax → Total with tax</div>
            </div>
          </Button>
          <Button
            variant={mode === "reverse" ? "default" : "outline"}
            onClick={() => setMode("reverse")}
            className="h-auto py-4"
          >
            <div>
              <div className="font-bold">Reverse Calculate</div>
              <div className="text-xs">Total price → Price before tax</div>
            </div>
          </Button>
        </div>

        {/* Forward Calculation */}
        {mode === "forward" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Calculate Sales Tax</CardTitle>
              <CardDescription>Enter the price before tax and your local sales tax rate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceBeforeTax">Price Before Tax ($)</Label>
                  <Input
                    id="priceBeforeTax"
                    type="number"
                    step="0.01"
                    value={priceBeforeTax}
                    onChange={(e) => setPriceBeforeTax(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <Label htmlFor="taxRate">Sales Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    placeholder="e.g., 8.5"
                  />
                </div>
              </div>

              {/* Quick Tax Rate Buttons */}
              <div>
                <Label className="mb-2 block">Quick Select (US States):</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonRates.map((item) => (
                    <Button
                      key={item.state}
                      variant="outline"
                      size="sm"
                      onClick={() => setTaxRate(item.rate)}
                      className="text-xs"
                    >
                      {item.state} ({item.rate}%)
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={calculateSalesTax} className="w-full" size="lg">
                Calculate Total
              </Button>

              {salesTax !== null && totalPrice !== null && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Price Before Tax</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                          ${parseFloat(priceBeforeTax).toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Sales Tax ({taxRate}%)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                          ${salesTax.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-300 bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardDescription>Total Price</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                          ${totalPrice.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Reverse Calculation */}
        {mode === "reverse" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Reverse Calculate Pre-Tax Price</CardTitle>
              <CardDescription>Enter total price with tax to find the original price before tax</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceAfterTax">Total Price (with tax) ($)</Label>
                  <Input
                    id="priceAfterTax"
                    type="number"
                    step="0.01"
                    value={priceAfterTax}
                    onChange={(e) => setPriceAfterTax(e.target.value)}
                    placeholder="e.g., 108.50"
                  />
                </div>
                <div>
                  <Label htmlFor="reverseTaxRate">Sales Tax Rate (%)</Label>
                  <Input
                    id="reverseTaxRate"
                    type="number"
                    step="0.01"
                    value={reverseTaxRate}
                    onChange={(e) => setReverseTaxRate(e.target.value)}
                    placeholder="e.g., 8.5"
                  />
                </div>
              </div>

              <Button onClick={calculateReverse} className="w-full" size="lg">
                Calculate Pre-Tax Price
              </Button>

              {preTaxPrice !== null && reverseSalesTax !== null && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-2 border-blue-300 bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardDescription>Price Before Tax</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                          ${preTaxPrice.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Sales Tax ({reverseTaxRate}%)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                          ${reverseSalesTax.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Total Price</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                          ${parseFloat(priceAfterTax).toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle>Sales Tax Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <div className="font-bold text-blue-600 mb-1">📍 US Sales Tax Ranges</div>
                <div>Sales tax rates vary by state from 0% (no tax states like Oregon, New Hampshire) to 7.25% (California base rate). Combined state and local rates can exceed 10% in some areas.</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 mb-1">🌍 International VAT/GST</div>
                <div>Many countries use Value Added Tax (VAT) or Goods and Services Tax (GST). Rates typically range from 5% to 27%.</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 mb-1">💡 Pro Tip</div>
                <div>Use reverse calculation when you have a budget and need to know how much you can spend before tax.</div>
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

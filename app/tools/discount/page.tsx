"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [discountPercent, setDiscountPercent] = useState("20");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);

  // Reverse: find original price from sale price
  const [salePrice, setSalePrice] = useState("");
  const [reverseDiscountPercent, setReverseDiscountPercent] = useState("20");
  const [originalPriceResult, setOriginalPriceResult] = useState<number | null>(null);

  const [mode, setMode] = useState<"forward" | "reverse">("forward");

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (!isNaN(price) && !isNaN(discount)) {
      const discountAmount = (price * discount) / 100;
      const final = price - discountAmount;
      setFinalPrice(final);
      setSavings(discountAmount);
    }
  };

  const calculateOriginalPrice = () => {
    const sale = parseFloat(salePrice);
    const discount = parseFloat(reverseDiscountPercent);

    if (!isNaN(sale) && !isNaN(discount)) {
      const original = sale / (1 - discount / 100);
      setOriginalPriceResult(original);
    }
  };

  const quickDiscounts = [10, 15, 20, 25, 30, 40, 50, 75];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            🏷️ Shopping Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discount Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate sale prices, discounts, and savings instantly. Perfect for shopping and finding the best deals.
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
              <div className="font-bold">Calculate Sale Price</div>
              <div className="text-xs">Original price → Final price</div>
            </div>
          </Button>
          <Button
            variant={mode === "reverse" ? "default" : "outline"}
            onClick={() => setMode("reverse")}
            className="h-auto py-4"
          >
            <div>
              <div className="font-bold">Find Original Price</div>
              <div className="text-xs">Sale price → Original price</div>
            </div>
          </Button>
        </div>

        {/* Forward Calculation */}
        {mode === "forward" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Calculate Discount & Sale Price</CardTitle>
              <CardDescription>Enter the original price and discount percentage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <Label htmlFor="discountPercent">Discount (%)</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    step="1"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              {/* Quick Discount Buttons */}
              <div>
                <Label className="mb-2 block">Quick Discounts:</Label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {quickDiscounts.map((discount) => (
                    <Button
                      key={discount}
                      variant={discountPercent === discount.toString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDiscountPercent(discount.toString())}
                      className="text-xs"
                    >
                      {discount}%
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={calculateDiscount} className="w-full" size="lg">
                Calculate Sale Price
              </Button>

              {finalPrice !== null && savings !== null && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Original Price</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                          ${parseFloat(originalPrice).toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-300 bg-green-50">
                      <CardHeader className="pb-3">
                        <CardDescription>You Save</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                          ${savings.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {discountPercent}% off
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-300 bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardDescription>Sale Price</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                          ${finalPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          final price
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Deal Breakdown */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          🎉 Great Deal!
                        </div>
                        <div className="text-lg">
                          Pay <span className="font-bold text-blue-600">${finalPrice.toFixed(2)}</span> instead of <span className="line-through">${parseFloat(originalPrice).toFixed(2)}</span>
                        </div>
                        <div className="text-gray-600 mt-2">
                          Save ${savings.toFixed(2)} ({discountPercent}% discount)
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Reverse Calculation */}
        {mode === "reverse" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find Original Price from Sale Price</CardTitle>
              <CardDescription>Calculate what the original price was before discount</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salePrice">Sale Price ($)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="e.g., 80"
                  />
                </div>
                <div>
                  <Label htmlFor="reverseDiscountPercent">Discount Applied (%)</Label>
                  <Input
                    id="reverseDiscountPercent"
                    type="number"
                    step="1"
                    value={reverseDiscountPercent}
                    onChange={(e) => setReverseDiscountPercent(e.target.value)}
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              <Button onClick={calculateOriginalPrice} className="w-full" size="lg">
                Calculate Original Price
              </Button>

              {originalPriceResult !== null && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-2 border-blue-300 bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardDescription>Original Price</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                          ${originalPriceResult.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          before discount
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Discount</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                          {reverseDiscountPercent}%
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          ${(originalPriceResult - parseFloat(salePrice)).toFixed(2)} off
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardDescription>Sale Price</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                          ${parseFloat(salePrice).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          what you pay
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Common Discount Examples */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle>Common Shopping Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">🛍️ Black Friday</div>
                <div className="text-gray-600">Typical discounts: 30-75% off on select items</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">🎄 Holiday Sales</div>
                <div className="text-gray-600">Common discounts: 20-50% off during major holidays</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">🏷️ Clearance</div>
                <div className="text-gray-600">End-of-season: 40-70% off to clear inventory</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">💳 Member Discounts</div>
                <div className="text-gray-600">Loyalty programs: 10-25% off for members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Smart Shopping Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">Compare prices:</span> Check multiple stores and use price comparison websites</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">Stack discounts:</span> Combine sales with coupons and cashback for maximum savings</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">Calculate unit price:</span> Bigger discount % doesn't always mean better deal</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">Watch for fake discounts:</span> Check price history to verify genuine savings</div>
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

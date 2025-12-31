"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StockReturnCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("100");
  const [shares, setShares] = useState("10");
  const [sellPrice, setSellPrice] = useState("125");
  const [dividends, setDividends] = useState("0");
  const [commissionFees, setCommissionFees] = useState("0");

  const [totalReturn, setTotalReturn] = useState<number | null>(null);
  const [returnPercent, setReturnPercent] = useState<number | null>(null);
  const [netGain, setNetGain] = useState<number | null>(null);

  const calculate = () => {
    const purchase = parseFloat(purchasePrice);
    const numShares = parseFloat(shares);
    const sell = parseFloat(sellPrice);
    const divs = parseFloat(dividends);
    const fees = parseFloat(commissionFees);

    if (!isNaN(purchase) && !isNaN(numShares) && !isNaN(sell)) {
      const initialInvestment = purchase * numShares;
      const finalValue = sell * numShares;
      const totalGain = finalValue - initialInvestment + divs - fees;
      const returnPct = (totalGain / initialInvestment) * 100;

      setNetGain(totalGain);
      setReturnPercent(returnPct);
      setTotalReturn(finalValue + divs - fees);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            📈 Stock Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stock Return Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your stock gains, losses, and total return percentage including dividends and fees.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stock Investment Details</CardTitle>
            <CardDescription>Enter your purchase and sale information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purchasePrice">Purchase Price per Share ($)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  step="0.01"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="e.g., 100"
                />
              </div>

              <div>
                <Label htmlFor="shares">Number of Shares</Label>
                <Input
                  id="shares"
                  type="number"
                  step="1"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <Label htmlFor="sellPrice">Sell Price per Share ($)</Label>
                <Input
                  id="sellPrice"
                  type="number"
                  step="0.01"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder="e.g., 125"
                />
              </div>

              <div>
                <Label htmlFor="dividends">Total Dividends Received ($)</Label>
                <Input
                  id="dividends"
                  type="number"
                  step="0.01"
                  value={dividends}
                  onChange={(e) => setDividends(e.target.value)}
                  placeholder="e.g., 0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="commissionFees">Commission & Fees ($)</Label>
              <Input
                id="commissionFees"
                type="number"
                step="0.01"
                value={commissionFees}
                onChange={(e) => setCommissionFees(e.target.value)}
                placeholder="e.g., 0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Trading fees, commissions, and other costs
              </p>
            </div>

            <Button onClick={calculate} className="w-full" size="lg">
              Calculate Return
            </Button>

            {returnPercent !== null && (
              <div className="space-y-4">
                <Card className={`border-2 ${returnPercent >= 0 ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Return</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold ${returnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {returnPercent >= 0 ? '📈 Gain' : '📉 Loss'}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Initial Investment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        ${(parseFloat(purchasePrice) * parseFloat(shares)).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {shares} shares @ ${parseFloat(purchasePrice).toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={netGain! >= 0 ? 'bg-green-50' : 'bg-red-50'}>
                    <CardHeader className="pb-3">
                      <CardDescription>Net Gain/Loss</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${netGain! >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {netGain! >= 0 ? '+' : ''}${netGain?.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        after fees & dividends
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Final Value</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        ${(parseFloat(sellPrice) * parseFloat(shares)).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {shares} shares @ ${parseFloat(sellPrice).toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase ({shares} × ${parseFloat(purchasePrice).toFixed(2)})</span>
                        <span className="font-bold">${(parseFloat(purchasePrice) * parseFloat(shares)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sale ({shares} × ${parseFloat(sellPrice).toFixed(2)})</span>
                        <span className="font-bold">${(parseFloat(sellPrice) * parseFloat(shares)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Dividends Received</span>
                        <span className="font-bold">+${parseFloat(dividends).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-orange-600">
                        <span>Fees & Commissions</span>
                        <span className="font-bold">-${parseFloat(commissionFees).toFixed(2)}</span>
                      </div>
                      <div className={`flex justify-between border-t pt-2 text-lg ${netGain! >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span className="font-bold">Net Gain/Loss</span>
                        <span className="font-bold">{netGain! >= 0 ? '+' : ''}${netGain?.toFixed(2)}</span>
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
            <CardTitle>Stock Investment Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">📊 Track All Costs</div>
                <div className="text-gray-600">Include all fees, commissions, and taxes for accurate return calculations.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">💰 Don't Forget Dividends</div>
                <div className="text-gray-600">Dividends can significantly boost total returns over time.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">⏳ Hold Long Term</div>
                <div className="text-gray-600">Long-term capital gains (1+ year) have lower tax rates than short-term.</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-2">📈 Diversify</div>
                <div className="text-gray-600">Don't put all your money in one stock. Spread risk across multiple investments.</div>
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

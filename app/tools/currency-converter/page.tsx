"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
];

// Approximate exchange rates (as of 2024) - In production, use a real API
const EXCHANGE_RATES: Record<string, Record<string, number>> = {
  USD: { USD: 1, INR: 83.12, CAD: 1.36, GBP: 0.79, AUD: 1.52 },
  INR: { USD: 0.012, INR: 1, CAD: 0.016, GBP: 0.0095, AUD: 0.018 },
  CAD: { USD: 0.74, INR: 61.12, CAD: 1, GBP: 0.58, AUD: 1.12 },
  GBP: { USD: 1.27, INR: 105.57, CAD: 1.72, GBP: 1, AUD: 1.92 },
  AUD: { USD: 0.66, INR: 54.95, CAD: 0.89, GBP: 0.52, AUD: 1 },
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const rate = EXCHANGE_RATES[fromCurrency][toCurrency];
    const converted = amountValue * rate;
    setResult(converted);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result) {
      setAmount(result.toFixed(2));
      setResult(parseFloat(amount));
    }
  };

  const fromCurrencyData = CURRENCIES.find((c) => c.code === fromCurrency)!;
  const toCurrencyData = CURRENCIES.find((c) => c.code === toCurrency)!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Currency Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert between USD, INR, CAD, GBP, and AUD
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Convert Currency</CardTitle>
            <CardDescription>
              Real-time exchange rates between major currencies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="text-lg"
              />
            </div>

            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSwap}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Convert Button */}
            <Button onClick={handleConvert} className="w-full" size="lg">
              Convert
            </Button>

            {/* Result */}
            {result !== null && (
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Result</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {fromCurrencyData.symbol}{parseFloat(amount).toLocaleString()} {fromCurrencyData.code}
                  </p>
                  <p className="text-2xl text-gray-500 my-2">=</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {toCurrencyData.symbol}{result.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    {toCurrencyData.code}
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Exchange Rate: 1 {fromCurrencyData.code} ={" "}
                    {EXCHANGE_RATES[fromCurrency][toCurrency].toFixed(4)}{" "}
                    {toCurrencyData.code}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exchange Rate Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Current Exchange Rates</CardTitle>
            <CardDescription>
              1 {fromCurrencyData.code} equals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CURRENCIES.filter((c) => c.code !== fromCurrency).map((currency) => (
                <div
                  key={currency.code}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{currency.flag}</span>
                    <span className="font-medium">{currency.name}</span>
                  </div>
                  <span className="font-bold">
                    {EXCHANGE_RATES[fromCurrency][currency.code].toFixed(4)}{" "}
                    {currency.code}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> Exchange rates are approximate and for
            informational purposes only. For actual transactions, please check with
            your bank or currency exchange service for current rates.
          </p>
        </div>
      </div>
    </div>
  );
}

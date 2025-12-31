"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", avgInflation: 3.2 },
  { code: "IN", name: "India", flag: "🇮🇳", avgInflation: 5.5 },
  { code: "CA", name: "Canada", flag: "🇨🇦", avgInflation: 3.4 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", avgInflation: 4.0 },
  { code: "AU", name: "Australia", flag: "🇦🇺", avgInflation: 3.8 },
];

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState<string>("1000");
  const [years, setYears] = useState<string>("10");
  const [inflationRate, setInflationRate] = useState<string>("3.2");
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [result, setResult] = useState<{
    futureValue: number;
    purchasingPowerLoss: number;
    totalInflation: number;
  } | null>(null);

  const handleCalculate = () => {
    const amountValue = parseFloat(amount);
    const yearsValue = parseFloat(years);
    const rateValue = parseFloat(inflationRate);

    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (isNaN(yearsValue) || yearsValue <= 0) {
      alert("Please enter valid number of years");
      return;
    }

    if (isNaN(rateValue) || rateValue < 0) {
      alert("Please enter a valid inflation rate");
      return;
    }

    const futureValue = amountValue * Math.pow(1 + rateValue / 100, yearsValue);
    const purchasingPowerLoss = futureValue - amountValue;
    const totalInflation = ((futureValue - amountValue) / amountValue) * 100;

    setResult({
      futureValue,
      purchasingPowerLoss,
      totalInflation,
    });
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const country = COUNTRIES.find((c) => c.code === countryCode);
    if (country) {
      setInflationRate(country.avgInflation.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Inflation Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate how inflation affects your money's purchasing power over time
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Inflation Impact</CardTitle>
            <CardDescription>
              See how much your money will be worth in the future
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name} (Avg: {country.avgInflation}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Current Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Amount ($)
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
              />
            </div>

            {/* Number of Years */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Years
              </label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
              />
            </div>

            {/* Inflation Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Inflation Rate (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                placeholder="3.2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Default is the average inflation rate for the selected country
              </p>
            </div>

            {/* Calculate Button */}
            <Button onClick={handleCalculate} className="w-full" size="lg">
              Calculate
            </Button>

            {/* Results */}
            {result && (
              <div className="mt-6 space-y-4">
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="font-semibold text-gray-700 mb-4">Results</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Today's Value</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${parseFloat(amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">
                        Equivalent Value in {years} Years
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${result.futureValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Loss in Purchasing Power</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${result.purchasingPowerLoss.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Total Inflation</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {result.totalInflation.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded border border-blue-300">
                    <p className="text-sm text-gray-700">
                      <strong>What this means:</strong> ${parseFloat(amount).toLocaleString()} today will have the same purchasing power as $
                      {result.futureValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      in {years} years, assuming {inflationRate}% annual inflation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Understanding Inflation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none text-sm">
              <p>
                Inflation is the rate at which the general level of prices for goods
                and services rises, eroding purchasing power. This calculator helps
                you understand how inflation affects your money over time.
              </p>
              <h4 className="font-semibold mt-4 mb-2">Average Inflation Rates:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {COUNTRIES.map((country) => (
                  <li key={country.code}>
                    {country.flag} {country.name}: {country.avgInflation}% (recent
                    average)
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

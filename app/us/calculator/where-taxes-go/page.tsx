import { TaxBreakdownCalculator } from "@/components/tax-breakdown-calculator";
import { US_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, PieChart, Calculator, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Where Do My Taxes Go? - USA 2024 | GovtBudget",
  description:
    "Calculate how your federal tax dollars are spent. See exactly where your money goes in the US federal budget - from healthcare to defense to education.",
  keywords: [
    "where do my taxes go",
    "US federal budget",
    "tax calculator USA",
    "government spending",
    "federal tax breakdown",
  ],
};

export default function USATaxCalculatorPage() {
  const country = getCountryById("us")!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {country.flagEmoji} USA Tax Calculator
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">{country.flagEmoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Where Do Your Taxes Go?
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            United States Federal Budget 2024
          </p>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Enter your income to see exactly how your federal tax dollars are
            allocated across government programs and services
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TaxBreakdownCalculator
          countryId={country.id}
          countryName={country.name}
          currencySymbol={country.currencySymbol}
          currencyCode={country.currencyCode}
          budgetData={US_BUDGET_2024}
          showFilingStatus={true}
        />

        {/* Related Links */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link href="/us/budget/2024">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <PieChart className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Full Budget Breakdown</CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Explore the complete US Federal Budget 2024 with detailed
                  visualizations and category breakdowns
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/tools">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calculator className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>More Tools</CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access 10+ free financial calculators including currency
                  converter, inflation, and loan calculators
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Information Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">About the US Federal Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The United States federal budget for fiscal year 2024 is
                approximately $6.9 trillion. This calculator shows you how your
                federal income tax contributions are allocated across major
                spending categories.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">
                Key Budget Categories:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="text-2xl">🏥</div>
                  <div>
                    <strong className="text-gray-900">Healthcare (25%):</strong>
                    <span className="text-gray-600">
                      {" "}
                      Includes Medicare, Medicaid, CHIP, and ACA subsidies
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="text-2xl">🛡️</div>
                  <div>
                    <strong className="text-gray-900">Social Security (23%):</strong>
                    <span className="text-gray-600">
                      {" "}
                      Old-age, survivors, and disability insurance
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="text-2xl">🎖️</div>
                  <div>
                    <strong className="text-gray-900">Defense (15%):</strong>
                    <span className="text-gray-600">
                      {" "}
                      Military personnel, operations, procurement, and R&D
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="text-2xl">💰</div>
                  <div>
                    <strong className="text-gray-900">Interest on Debt (12%):</strong>
                    <span className="text-gray-600">
                      {" "}
                      Interest payments on the national debt
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="text-2xl">👨‍👩‍👧‍👦</div>
                  <div>
                    <strong className="text-gray-900">Income Security (7%):</strong>
                    <span className="text-gray-600">
                      {" "}
                      Welfare programs, unemployment insurance
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-900">Data Sources:</strong>{" "}
                  Congressional Budget Office (CBO), Office of Management and Budget
                  (OMB), USASpending.gov
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Countries CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Explore Other Countries
            </h3>
            <p className="text-gray-600 mb-6">
              See tax calculators and budget breakdowns for India, Canada, UK, and
              Australia
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/india/calculator/where-taxes-go">
                <Button variant="outline">🇮🇳 India</Button>
              </Link>
              <Link href="/canada/calculator/where-taxes-go">
                <Button variant="outline">🇨🇦 Canada</Button>
              </Link>
              <Link href="/uk/calculator/where-taxes-go">
                <Button variant="outline">🇬🇧 UK</Button>
              </Link>
              <Link href="/australia/calculator/where-taxes-go">
                <Button variant="outline">🇦🇺 Australia</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

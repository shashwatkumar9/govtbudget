import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, PieChart, Calculator, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface CalculatorPageLayoutProps {
  country: {
    id: string;
    name: string;
    flagEmoji: string;
  };
  fiscalYear: string;
  children: ReactNode;
  infoSection: ReactNode;
  otherCountries: Array<{
    id: string;
    name: string;
    flag: string;
  }>;
}

export function CalculatorPageLayout({
  country,
  fiscalYear,
  children,
  infoSection,
  otherCountries,
}: CalculatorPageLayoutProps) {
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
              {country.flagEmoji} {country.name} Tax Calculator
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
            {country.name} {fiscalYear}
          </p>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Enter your income to see exactly how your tax dollars are allocated
            across government programs and services
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}

        {/* Related Links */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link href={`/${country.id}/budget/2024`}>
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
                  Explore the complete {country.name} budget with detailed
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
        {infoSection}

        {/* Other Countries CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Explore Other Countries
            </h3>
            <p className="text-gray-600 mb-6">
              See tax calculators and budget breakdowns for other countries
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {otherCountries.map((c) => (
                <Link key={c.id} href={`/${c.id}/calculator/where-taxes-go`}>
                  <Button variant="outline">
                    {c.flag} {c.name}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

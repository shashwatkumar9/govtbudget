import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, PiggyBank, Percent } from "lucide-react";

export const metadata = {
  title: "Financial Tools & Calculators | GovtBudget",
  description:
    "Free financial calculators including currency converter, inflation calculator, compound interest, loan EMI, and savings goal calculators.",
  keywords: [
    "financial calculators",
    "currency converter",
    "inflation calculator",
    "loan calculator",
    "savings calculator",
    "compound interest",
  ],
};

const TOOLS = [
  {
    name: "Currency Converter",
    description: "Convert between USD, INR, CAD, GBP, and AUD with real-time rates",
    href: "/tools/currency-converter",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    name: "Inflation Calculator",
    description: "Calculate how inflation affects your purchasing power over time",
    href: "/tools/inflation-calculator",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    name: "Compound Interest Calculator",
    description: "See how your investments grow with compound interest",
    href: "/tools/compound-interest",
    icon: Percent,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    name: "Loan EMI Calculator",
    description: "Calculate monthly payments for home, car, or personal loans",
    href: "/tools/loan-calculator",
    icon: Calculator,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    name: "Savings Goal Calculator",
    description: "Find out how long it will take to reach your savings goal",
    href: "/tools/savings-goal",
    icon: PiggyBank,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Tools & Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free, easy-to-use financial calculators to help you make informed
            decisions about your money
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.name} href={tool.href}>
                <Card
                  className={`hover:shadow-lg transition-all cursor-pointer h-full border-2 ${tool.borderColor} ${tool.bgColor}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-2">{tool.name}</CardTitle>
                        <CardDescription className="text-gray-700">
                          {tool.description}
                        </CardDescription>
                      </div>
                      <Icon className={`h-8 w-8 ${tool.color} flex-shrink-0 ml-2`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Tax Calculators Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Tax Calculators by Country
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                country: "United States",
                flag: "🇺🇸",
                href: "/us/calculator/where-taxes-go",
              },
              { country: "India", flag: "🇮🇳", href: "/india/calculator/where-taxes-go" },
              { country: "Canada", flag: "🇨🇦", href: "/canada/calculator/where-taxes-go" },
              {
                country: "United Kingdom",
                flag: "🇬🇧",
                href: "/uk/calculator/where-taxes-go",
              },
              {
                country: "Australia",
                flag: "🇦🇺",
                href: "/australia/calculator/where-taxes-go",
              },
            ].map((item) => (
              <Link key={item.country} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="text-4xl mb-2">{item.flag}</div>
                    <CardTitle>{item.country}</CardTitle>
                    <CardDescription>Where Do My Taxes Go?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Calculate →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use Our Tools?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">✓</div>
              <h3 className="font-semibold text-lg mb-2">100% Free</h3>
              <p className="text-gray-600 text-sm">
                All tools are completely free to use, no signup required
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
              <p className="text-gray-600 text-sm">
                All calculations happen in your browser, we don't store your data
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Fast & Easy</h3>
              <p className="text-gray-600 text-sm">
                Simple interfaces with instant results, no complex forms
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              ← Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

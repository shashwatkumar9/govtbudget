import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "20+ Free Financial Calculators & Tools | GovtBudget",
  description:
    "Free financial calculators including retirement, mortgage, salary, budget planner, currency converter, inflation, compound interest, loan EMI, savings goal, and more.",
  keywords: [
    "financial calculators",
    "retirement calculator",
    "mortgage calculator",
    "salary calculator",
    "budget planner",
    "currency converter",
    "inflation calculator",
    "loan calculator",
    "savings calculator",
    "compound interest",
    "tip calculator",
  ],
};

const TOOL_CATEGORIES = [
  {
    category: "🏆 Most Popular",
    tools: [
      {
        name: "Retirement Calculator",
        description: "Plan your retirement savings with growth projections",
        href: "/tools/retirement-calculator",
        icon: "🏖️",
        badge: "Popular",
      },
      {
        name: "Mortgage Calculator",
        description: "Calculate home loan payments and total interest",
        href: "/tools/mortgage-calculator",
        icon: "🏠",
        badge: "Popular",
      },
      {
        name: "Salary Calculator",
        description: "Gross to net pay calculator with breakdowns",
        href: "/tools/salary-calculator",
        icon: "💼",
        badge: "Popular",
      },
      {
        name: "Budget Planner",
        description: "Track monthly income and expenses with charts",
        href: "/tools/budget-planner",
        icon: "📊",
        badge: "Popular",
      },
    ],
  },
  {
    category: "💰 Money & Banking",
    tools: [
      {
        name: "Currency Converter",
        description: "Convert between 5 major currencies",
        href: "/tools/currency-converter",
        icon: "💱",
      },
      {
        name: "Loan Calculator",
        description: "Calculate EMI for any type of loan",
        href: "/tools/loan-calculator",
        icon: "🏦",
      },
      {
        name: "Savings Goal",
        description: "Time to reach your savings target",
        href: "/tools/savings-goal",
        icon: "🎯",
      },
      {
        name: "Tip Calculator",
        description: "Calculate tips and split bills",
        href: "/tools/tip-calculator",
        icon: "🍽️",
      },
    ],
  },
  {
    category: "📈 Investments & Growth",
    tools: [
      {
        name: "Compound Interest",
        description: "Investment growth calculator with charts",
        href: "/tools/compound-interest",
        icon: "💰",
      },
      {
        name: "Inflation Calculator",
        description: "Track purchasing power over time",
        href: "/tools/inflation-calculator",
        icon: "📈",
      },
      {
        name: "ROI Calculator",
        description: "Return on investment calculator",
        href: "/tools/roi",
        icon: "📊",
      },
      {
        name: "Stock Return Calculator",
        description: "Calculate stock gains and losses",
        href: "/tools/stock-return",
        icon: "📈",
      },
      {
        name: "Investment Calculator",
        description: "General investment returns calculator",
        href: "/tools/investment",
        icon: "💼",
      },
    ],
  },
  {
    category: "🏡 Loans & Debt",
    tools: [
      {
        name: "Debt Payoff Calculator",
        description: "Plan your debt freedom strategy",
        href: "/tools/debt-payoff",
        icon: "💳",
      },
      {
        name: "Credit Card Payoff",
        description: "Optimize credit card payments",
        href: "/tools/credit-card-payoff",
        icon: "💰",
      },
      {
        name: "Car Loan Calculator",
        description: "Auto loan payment calculator",
        href: "/tools/car-loan",
        icon: "🚗",
      },
    ],
  },
  {
    category: "🛒 Shopping & Everyday",
    tools: [
      {
        name: "Percentage Calculator",
        description: "Quick percentage calculations",
        href: "/tools/percentage-calculator",
        icon: "📐",
      },
      {
        name: "Sales Tax Calculator",
        description: "Calculate sales tax amounts",
        href: "/tools/sales-tax",
        icon: "🛒",
      },
      {
        name: "Discount Calculator",
        description: "Find sale prices and savings",
        href: "/tools/discount",
        icon: "🏷️",
      },
      {
        name: "Property Tax Calculator",
        description: "Estimate property taxes",
        href: "/tools/property-tax",
        icon: "🏡",
      },
    ],
  },
];

const TAX_CALCULATORS = [
  { country: "United States", flag: "🇺🇸", href: "/us/calculator/where-taxes-go" },
  { country: "India", flag: "🇮🇳", href: "/india/calculator/where-taxes-go" },
  { country: "Canada", flag: "🇨🇦", href: "/canada/calculator/where-taxes-go" },
  { country: "United Kingdom", flag: "🇬🇧", href: "/uk/calculator/where-taxes-go" },
  { country: "Australia", flag: "🇦🇺", href: "/australia/calculator/where-taxes-go" },
];

export default function ToolsIndexPage() {
  const totalTools = TOOL_CATEGORIES.reduce((acc, cat) => acc + cat.tools.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {totalTools} Free Calculators
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Financial Tools & Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade financial calculators to help you make smarter money decisions.
            All tools are 100% free, privacy-focused, and require no signup.
          </p>
        </div>

        {/* Tools by Category */}
        {TOOL_CATEGORIES.map((category, categoryIndex) => (
          <div key={category.category} className={categoryIndex > 0 ? "mt-16" : ""}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.tools.map((tool) => (
                <Link key={tool.name} href={tool.href}>
                  <Card className="hover:shadow-xl transition-all cursor-pointer h-full border-2 hover:border-blue-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                          {tool.icon}
                        </span>
                        {tool.badge && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline" size="sm">
                        Use Tool →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Tax Calculators Section */}
        <div className="mt-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            🌍 Tax Calculators by Country
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Calculate your income tax and see exactly where your money goes
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TAX_CALCULATORS.map((item) => (
              <Link key={item.country} href={item.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full border-2 hover:border-blue-400 group">
                  <CardHeader className="text-center">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                      {item.flag}
                    </div>
                    <CardTitle className="text-base group-hover:text-blue-600">
                      {item.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline" size="sm">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-bold text-xl mb-2">100% Free Forever</h3>
            <p className="text-gray-600">
              All {totalTools} tools are completely free to use. No hidden fees, no signup required.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="font-bold text-xl mb-2">Privacy First</h3>
            <p className="text-gray-600">
              All calculations happen in your browser. We don't store, track, or sell your data.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-bold text-xl mb-2">Fast & Accurate</h3>
            <p className="text-gray-600">
              Instant calculations with professional-grade accuracy. Simple, clean interfaces.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing a Tool?
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Start with our most popular calculators: Retirement, Mortgage, Salary, or Budget Planner
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/retirement-calculator">
              <Button size="lg" variant="secondary">
                🏖️ Retirement Calculator
              </Button>
            </Link>
            <Link href="/tools/mortgage-calculator">
              <Button size="lg" variant="secondary">
                🏠 Mortgage Calculator
              </Button>
            </Link>
            <Link href="/tools/salary-calculator">
              <Button size="lg" variant="secondary">
                💼 Salary Calculator
              </Button>
            </Link>
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

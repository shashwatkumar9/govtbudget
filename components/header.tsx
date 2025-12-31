"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calculator, PieChart, Home, TrendingUp, BarChart3, Globe, ChevronDown } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const calculators = [
    { name: "United States", flag: "🇺🇸", href: "/us/calculator/where-taxes-go", code: "US" },
    { name: "India", flag: "🇮🇳", href: "/india/calculator/where-taxes-go", code: "IN" },
    { name: "Canada", flag: "🇨🇦", href: "/canada/calculator/where-taxes-go", code: "CA" },
    { name: "United Kingdom", flag: "🇬🇧", href: "/uk/calculator/where-taxes-go", code: "UK" },
    { name: "Australia", flag: "🇦🇺", href: "/australia/calculator/where-taxes-go", code: "AU" },
  ];

  const budgets = [
    { name: "US Budget 2024", flag: "🇺🇸", href: "/us/budget/2024", amount: "$6.9T" },
    { name: "India Budget 2024", flag: "🇮🇳", href: "/india/budget/2024", amount: "₹47.7L Cr" },
    { name: "Canada Budget 2024", flag: "🇨🇦", href: "/canada/budget/2024", amount: "C$497B" },
    { name: "UK Budget 2024", flag: "🇬🇧", href: "/uk/budget/2024", amount: "£1.1T" },
    { name: "Australia Budget 2024", flag: "🇦🇺", href: "/australia/budget/2024", amount: "A$670B" },
  ];

  const tools = [
    // Top 5 Tools (Featured in Footer)
    { name: "Currency Converter", href: "/tools/currency-converter", icon: "💱", desc: "Convert between 5 currencies", featured: true },
    { name: "Inflation Calculator", href: "/tools/inflation-calculator", icon: "📈", desc: "Track purchasing power", featured: true },
    { name: "Compound Interest", href: "/tools/compound-interest", icon: "💰", desc: "Investment growth calculator", featured: true },
    { name: "Loan Calculator", href: "/tools/loan-calculator", icon: "🏦", desc: "Calculate EMI payments", featured: true },
    { name: "Savings Goal", href: "/tools/savings-goal", icon: "🎯", desc: "Plan your savings targets", featured: true },

    // Additional Popular Tools
    { name: "Retirement Calculator", href: "/tools/retirement-calculator", icon: "🏖️", desc: "Plan your retirement savings" },
    { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠", desc: "Calculate home loan payments" },
    { name: "Salary Calculator", href: "/tools/salary-calculator", icon: "💼", desc: "Gross to net pay calculator" },
    { name: "Budget Planner", href: "/tools/budget-planner", icon: "📊", desc: "Track monthly income & expenses" },
    { name: "Tip Calculator", href: "/tools/tip-calculator", icon: "🍽️", desc: "Calculate tips & split bills" },
    { name: "Percentage Calculator", href: "/tools/percentage-calculator", icon: "📐", desc: "Quick percentage calculations" },
    { name: "Debt Payoff Calculator", href: "/tools/debt-payoff", icon: "💳", desc: "Plan your debt freedom" },
    { name: "Credit Card Payoff", href: "/tools/credit-card-payoff", icon: "💰", desc: "Optimize credit card payments" },
    { name: "Car Loan Calculator", href: "/tools/car-loan", icon: "🚗", desc: "Auto loan payment calculator" },
    { name: "Sales Tax Calculator", href: "/tools/sales-tax", icon: "🛒", desc: "Calculate sales tax amounts" },
    { name: "Discount Calculator", href: "/tools/discount", icon: "🏷️", desc: "Find sale prices & savings" },
    { name: "ROI Calculator", href: "/tools/roi", icon: "📊", desc: "Return on investment calculator" },
    { name: "Stock Return Calculator", href: "/tools/stock-return", icon: "📈", desc: "Calculate stock gains/losses" },
    { name: "Property Tax Calculator", href: "/tools/property-tax", icon: "🏡", desc: "Estimate property taxes" },
    { name: "Investment Calculator", href: "/tools/investment", icon: "💼", desc: "Investment returns calculator" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                <PieChart className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">GovtBudget</div>
                <div className="text-[10px] text-gray-500 -mt-1">Transparency Platform</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
            >
              Home
            </Link>

            {/* Tax Calculators Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("calculators")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all flex items-center space-x-1">
                <Calculator className="h-4 w-4" />
                <span>Tax Calculators</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {activeDropdown === "calculators" && (
                <div className="absolute left-0 mt-1 w-[600px] bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Tax Calculators
                      </h3>
                      <div className="space-y-1">
                        {calculators.map((calc) => (
                          <Link
                            key={calc.code}
                            href={calc.href}
                            className="block px-3 py-2 rounded-md hover:bg-blue-50 transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{calc.flag}</span>
                              <div>
                                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                  {calc.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Where do your taxes go?
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="border-l border-gray-200 pl-6">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Features
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Real-time Calculations</div>
                            <div className="text-xs text-gray-500">Instant tax breakdown</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Visual Breakdowns</div>
                            <div className="text-xs text-gray-500">Interactive charts & graphs</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Privacy First</div>
                            <div className="text-xs text-gray-500">No data stored or tracked</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Budget Breakdown Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("budgets")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all flex items-center space-x-1">
                <BarChart3 className="h-4 w-4" />
                <span>Budget Data</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {activeDropdown === "budgets" && (
                <div className="absolute left-0 mt-1 w-[500px] bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    2024 Government Budgets
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {budgets.map((budget) => (
                      <Link
                        key={budget.href}
                        href={budget.href}
                        className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{budget.flag}</span>
                          <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                            {budget.name}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">
                          {budget.amount}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      📊 Interactive visualizations • 📈 Spending categories • 💡 Detailed breakdowns
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Financial Tools Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("tools")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>Financial Tools</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {activeDropdown === "tools" && (
                <div className="absolute right-0 mt-1 w-[750px] bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      20+ Free Financial Calculators
                    </h3>
                    <Link
                      href="/tools"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block px-3 py-2 rounded-md hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-lg">{tool.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate">
                              {tool.name}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {tool.desc}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                      🔥 Most Popular: Currency Converter • Retirement • Mortgage • Salary • Budget
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Tax Calculators
              </p>
              {calculators.map((calc) => (
                <Link
                  key={calc.code}
                  href={calc.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {calc.flag} {calc.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Budget Data
              </p>
              {budgets.map((budget) => (
                <Link
                  key={budget.href}
                  href={budget.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {budget.flag} {budget.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Financial Tools
              </p>
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tool.icon} {tool.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

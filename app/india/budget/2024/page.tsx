import { BudgetOverview } from "@/components/budget-overview";
import { INDIA_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "India Union Budget 2024-25 - Complete Breakdown | GovtBudget",
  description:
    "Detailed breakdown of India's Union Budget for fiscal year 2024-25. Explore spending across defence, subsidies, infrastructure, and more.",
  keywords: [
    "india union budget 2024",
    "budget 2024 india",
    "government spending india",
    "union budget breakdown",
  ],
};

export default function IndiaBudget2024Page() {
  const country = getCountryById("india")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <BudgetOverview
          country="India"
          flagEmoji={country.flagEmoji}
          fiscalYear={2024}
          totalSpending={47660000000000} // ₹47.66 lakh crore
          totalRevenue={30800000000000} // ₹30.80 lakh crore
          deficit={16860000000000} // ₹16.86 lakh crore
          debt={155000000000000} // ₹155 lakh crore
          currencyCode={country.currencyCode}
          budgetData={INDIA_BUDGET_2024}
        />

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Related Tools & Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/india/calculator/where-taxes-go">
                  <Button variant="outline" className="w-full h-auto py-4">
                    <div className="text-left">
                      <div className="font-semibold">Where Do My Taxes Go?</div>
                      <div className="text-sm text-gray-500">
                        Calculate your tax allocation
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">About India's Union Budget</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              India's Union Budget for fiscal year 2024-25 (April 1, 2024 - March
              31, 2025) totals approximately ₹47.66 lakh crore in expenditure,
              representing the central government's fiscal plan.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-2">Key Highlights:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Interest payments on debt consume 20% of the budget</li>
              <li>Defence allocation stands at 13% for national security</li>
              <li>Subsidies (food, fuel, fertilizer) account for 10%</li>
              <li>Central sector schemes for infrastructure get 15%</li>
              <li>Finance Commission transfers to states: 9%</li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              <strong>Source:</strong> Ministry of Finance, Union Budget 2024-25
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

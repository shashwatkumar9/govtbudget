import { BudgetOverview } from "@/components/budget-overview";
import { UK_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "UK Budget 2024 - Complete Breakdown | GovtBudget",
  description:
    "Detailed breakdown of the UK Budget for fiscal year 2024-25. Explore spending on NHS, welfare, education, and more.",
};

export default function UKBudget2024Page() {
  const country = getCountryById("uk")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <BudgetOverview
          country="United Kingdom"
          flagEmoji={country.flagEmoji}
          fiscalYear={2024}
          totalSpending={1100000000000} // £1.1 trillion
          totalRevenue={1000000000000} // £1.0 trillion
          deficit={100000000000} // £100 billion
          debt={2700000000000} // £2.7 trillion
          currencyCode={country.currencyCode}
          budgetData={UK_BUDGET_2024}
        />

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Related Tools & Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/uk/calculator/where-taxes-go">
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
          <h2 className="text-2xl font-bold mb-4">About the UK Budget</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              The United Kingdom budget for fiscal year 2024-25 (April 1, 2024 -
              March 31, 2025) totals approximately £1.1 trillion in public spending.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-2">Key Categories:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Welfare & Pensions: 25% (State pension, universal credit)</li>
              <li>Health (NHS): 20% (National Health Service)</li>
              <li>Education: 11% (Schools, universities)</li>
              <li>Debt Interest: 8%</li>
              <li>Defence: 5%</li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              <strong>Source:</strong> HM Treasury, Office for National Statistics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

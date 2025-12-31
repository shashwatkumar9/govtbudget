import { BudgetOverview } from "@/components/budget-overview";
import { CANADA_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Canada Federal Budget 2024 - Complete Breakdown | GovtBudget",
  description:
    "Detailed breakdown of Canada's Federal Budget for fiscal year 2024-25. Explore spending on healthcare, elderly benefits, and more.",
};

export default function CanadaBudget2024Page() {
  const country = getCountryById("canada")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <BudgetOverview
          country="Canada"
          flagEmoji={country.flagEmoji}
          fiscalYear={2024}
          totalSpending={497000000000} // C$497 billion
          totalRevenue={440000000000} // C$440 billion
          deficit={57000000000} // C$57 billion
          debt={1200000000000} // C$1.2 trillion
          currencyCode={country.currencyCode}
          budgetData={CANADA_BUDGET_2024}
        />

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Related Tools & Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/canada/calculator/where-taxes-go">
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
          <h2 className="text-2xl font-bold mb-4">About Canada's Federal Budget</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              Canada's federal budget for fiscal year 2024-25 (April 1, 2024 - March
              31, 2025) totals approximately C$497 billion in program spending.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-2">Key Categories:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Elderly Benefits (OAS, GIS): 17%</li>
              <li>Health Transfers to provinces: 15%</li>
              <li>Canada Child Benefit: 8%</li>
              <li>Employment Insurance: 7%</li>
              <li>Defence: 7%</li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              <strong>Source:</strong> Department of Finance Canada, Budget 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

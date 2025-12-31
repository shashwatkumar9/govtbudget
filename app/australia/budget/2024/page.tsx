import { BudgetOverview } from "@/components/budget-overview";
import { AUSTRALIA_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Australia Federal Budget 2024-25 - Complete Breakdown | GovtBudget",
  description:
    "Detailed breakdown of Australia's Federal Budget for fiscal year 2024-25. Explore spending on social security, health, education, and more.",
};

export default function AustraliaBudget2024Page() {
  const country = getCountryById("australia")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <BudgetOverview
          country="Australia"
          flagEmoji={country.flagEmoji}
          fiscalYear={2024}
          totalSpending={670000000000} // A$670 billion
          totalRevenue={640000000000} // A$640 billion
          deficit={30000000000} // A$30 billion
          debt={900000000000} // A$900 billion
          currencyCode={country.currencyCode}
          budgetData={AUSTRALIA_BUDGET_2024}
        />

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Related Tools & Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/australia/calculator/where-taxes-go">
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
          <h2 className="text-2xl font-bold mb-4">
            About Australia's Federal Budget
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              Australia's federal budget for fiscal year 2024-25 (July 1, 2024 - June
              30, 2025) totals approximately A$670 billion in expenditure.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-2">Key Categories:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Social Security & Welfare: 35% (Age pension, disability, family
                benefits)
              </li>
              <li>Health: 16% (Medicare, public hospitals)</li>
              <li>Education: 8% (Schools, universities, HECS-HELP)</li>
              <li>Defence: 6%</li>
              <li>General Public Services: 7%</li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              <strong>Source:</strong> Australian Treasury, Budget 2024-25
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { BudgetOverview } from "@/components/budget-overview";
import { US_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "US Federal Budget 2024 - Complete Breakdown | GovtBudget",
  description:
    "Detailed breakdown of the US Federal Budget for fiscal year 2024. Explore $6.9 trillion in spending across healthcare, social security, defense, and more.",
  keywords: [
    "us federal budget 2024",
    "government spending",
    "budget breakdown",
    "federal budget",
    "us spending",
  ],
};

export default function USBudget2024Page() {
  const country = getCountryById("us")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <BudgetOverview
          country="United States"
          flagEmoji={country.flagEmoji}
          fiscalYear={2024}
          totalSpending={6900000000000} // $6.9 trillion
          totalRevenue={4900000000000} // $4.9 trillion
          deficit={2000000000000} // $2.0 trillion
          debt={34500000000000} // $34.5 trillion
          currencyCode={country.currencyCode}
          budgetData={US_BUDGET_2024}
        />

        {/* Related Tools */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Related Tools & Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/us/calculator/where-taxes-go">
                  <Button variant="outline" className="w-full h-auto py-4">
                    <div className="text-left">
                      <div className="font-semibold">Where Do My Taxes Go?</div>
                      <div className="text-sm text-gray-500">
                        Calculate your tax allocation
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full h-auto py-4">
                    <div className="text-left">
                      <div className="font-semibold">Income Tax Calculator</div>
                      <div className="text-sm text-gray-500">
                        Calculate your federal tax
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">About the US Federal Budget</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              The United States federal budget for fiscal year 2024 (October 1, 2023
              - September 30, 2024) totals approximately $6.9 trillion in outlays.
              This represents the federal government's plan for spending and revenue
              collection.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">Key Facts:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                The largest spending category is Healthcare (Medicare and Medicaid)
                at 25% of the budget
              </li>
              <li>
                Social Security accounts for 23%, providing benefits to retirees and
                disabled individuals
              </li>
              <li>
                Defense spending represents 15% of the budget, funding the military
                and national security
              </li>
              <li>
                Interest on the national debt consumes 12% of federal spending
              </li>
              <li>
                The deficit (spending minus revenue) is approximately $2 trillion
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-2">Revenue Sources:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Individual Income Taxes: 49%</li>
              <li>Payroll Taxes (Social Security & Medicare): 36%</li>
              <li>Corporate Taxes: 9%</li>
              <li>Other (excise, estate, customs): 6%</li>
            </ul>

            <p className="mt-6 text-sm text-gray-500">
              <strong>Sources:</strong> Congressional Budget Office (CBO), Office of
              Management and Budget (OMB), USASpending.gov
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

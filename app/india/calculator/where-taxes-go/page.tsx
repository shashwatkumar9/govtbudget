import { TaxBreakdownCalculator } from "@/components/tax-breakdown-calculator";
import { INDIA_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";

export const metadata = {
  title: "Where Do My Taxes Go? - India 2024 | GovtBudget",
  description:
    "Calculate how your income tax is spent in India. See the Union Budget 2024 breakdown from defence to subsidies to infrastructure.",
  keywords: [
    "india tax calculator",
    "union budget 2024",
    "where do my taxes go india",
    "income tax breakdown",
    "government spending india",
  ],
};

export default function IndiaTaxCalculatorPage() {
  const country = getCountryById("india")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {country.flagEmoji} Where Do Your Taxes Go?
          </h1>
          <p className="text-xl text-gray-600">India Union Budget 2024</p>
          <p className="mt-2 text-gray-500">
            Enter your income to see how your tax rupees are allocated across
            government programs
          </p>
        </div>

        <TaxBreakdownCalculator
          countryId={country.id}
          countryName={country.name}
          currencySymbol={country.currencySymbol}
          currencyCode={country.currencyCode}
          budgetData={INDIA_BUDGET_2024}
          showFilingStatus={false}
        />

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">About the India Union Budget</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              The Union Budget of India for fiscal year 2024-25 outlines how the
              government allocates resources across various sectors. This calculator
              uses the New Tax Regime rates to show your contribution.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Key Budget Categories:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Interest Payments (20%):</strong> Servicing government debt
              </li>
              <li>
                <strong>Defence (13%):</strong> Military and security expenditure
              </li>
              <li>
                <strong>Subsidies (10%):</strong> Food, fuel, and fertilizer subsidies
              </li>
              <li>
                <strong>Central Sector Schemes (15%):</strong> Infrastructure and
                development programs
              </li>
              <li>
                <strong>Finance Commission Transfers (9%):</strong> Funds transferred
                to states
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Source: Ministry of Finance, Union Budget 2024-25
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

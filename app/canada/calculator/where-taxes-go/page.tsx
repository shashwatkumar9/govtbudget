import { TaxBreakdownCalculator } from "@/components/tax-breakdown-calculator";
import { CANADA_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";

export const metadata = {
  title: "Where Do My Taxes Go? - Canada 2024 | GovtBudget",
  description:
    "Calculate how your federal tax dollars are spent in Canada. See the 2024 budget breakdown from healthcare to elderly benefits.",
  keywords: [
    "canada tax calculator",
    "federal budget canada",
    "where do my taxes go canada",
    "government spending",
    "tax breakdown",
  ],
};

export default function CanadaTaxCalculatorPage() {
  const country = getCountryById("canada")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {country.flagEmoji} Where Do Your Taxes Go?
          </h1>
          <p className="text-xl text-gray-600">Canada Federal Budget 2024</p>
          <p className="mt-2 text-gray-500">
            Enter your income to see how your federal tax dollars are allocated
            across government programs
          </p>
        </div>

        <TaxBreakdownCalculator
          countryId={country.id}
          countryName={country.name}
          currencySymbol={country.currencySymbol}
          currencyCode={country.currencyCode}
          budgetData={CANADA_BUDGET_2024}
          showFilingStatus={false}
        />

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">About the Canada Federal Budget</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              The Canadian federal budget for fiscal year 2024-25 outlines spending
              priorities across healthcare, seniors' benefits, and infrastructure. This
              calculator shows federal tax allocation only.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Key Budget Categories:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Elderly Benefits (17%):</strong> Old Age Security (OAS) and
                Guaranteed Income Supplement (GIS)
              </li>
              <li>
                <strong>Health Transfers (15%):</strong> Canada Health Transfer to
                provinces
              </li>
              <li>
                <strong>Children & Families (8%):</strong> Canada Child Benefit (CCB)
              </li>
              <li>
                <strong>Employment Insurance (7%):</strong> EI benefits for unemployed
                workers
              </li>
              <li>
                <strong>Defence (7%):</strong> Canadian Armed Forces and security
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Source: Department of Finance Canada, Budget 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

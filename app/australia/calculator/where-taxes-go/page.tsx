import { TaxBreakdownCalculator } from "@/components/tax-breakdown-calculator";
import { AUSTRALIA_BUDGET_2024 } from "@/data/budgets";
import { getCountryById } from "@/data/countries";

export const metadata = {
  title: "Where Do My Taxes Go? - Australia 2024 | GovtBudget",
  description:
    "Calculate how your income tax is spent in Australia. See the 2024 federal budget breakdown from social security to healthcare.",
  keywords: [
    "australia tax calculator",
    "where do my taxes go australia",
    "federal budget australia",
    "government spending",
    "income tax breakdown",
  ],
};

export default function AustraliaTaxCalculatorPage() {
  const country = getCountryById("australia")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {country.flagEmoji} Where Do Your Taxes Go?
          </h1>
          <p className="text-xl text-gray-600">Australia Federal Budget 2024</p>
          <p className="mt-2 text-gray-500">
            Enter your income to see how your tax dollars are allocated across
            government services
          </p>
        </div>

        <TaxBreakdownCalculator
          countryId={country.id}
          countryName={country.name}
          currencySymbol={country.currencySymbol}
          currencyCode={country.currencyCode}
          budgetData={AUSTRALIA_BUDGET_2024}
          showFilingStatus={false}
        />

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            About the Australia Federal Budget
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              The Australian federal budget for fiscal year 2024-25 shows how
              government revenue is allocated. Social security and welfare represent
              the largest spending category at 35%.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Key Budget Categories:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Social Security & Welfare (35%):</strong> Age pension,
                disability support, family benefits
              </li>
              <li>
                <strong>Health (16%):</strong> Medicare, public hospitals, and health
                services
              </li>
              <li>
                <strong>Education (8%):</strong> Schools, universities, and HECS-HELP
              </li>
              <li>
                <strong>Defence (6%):</strong> Australian Defence Force and security
              </li>
              <li>
                <strong>General Public Services (7%):</strong> Government operations
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Source: Australian Treasury, Budget 2024-25
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

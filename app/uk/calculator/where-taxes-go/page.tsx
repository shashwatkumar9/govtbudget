import { TaxBreakdownCalculator } from "@/components/tax-breakdown-calculator";
import { UK_BUDGET_2024 } from "@/data/budgets";
import { calculateUKIncomeTax } from "@/data/tax-calculators";
import { getCountryById } from "@/data/countries";

export const metadata = {
  title: "Where Do My Taxes Go? - UK 2024 | GovtBudget",
  description:
    "Calculate how your income tax is spent in the UK. See the 2024 budget breakdown from NHS to welfare to education.",
  keywords: [
    "uk tax calculator",
    "where do my taxes go uk",
    "uk budget 2024",
    "government spending uk",
    "income tax breakdown",
  ],
};

export default function UKTaxCalculatorPage() {
  const country = getCountryById("uk")!;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {country.flagEmoji} Where Do Your Taxes Go?
          </h1>
          <p className="text-xl text-gray-600">United Kingdom Budget 2024</p>
          <p className="mt-2 text-gray-500">
            Enter your income to see how your tax pounds are allocated across
            government services
          </p>
        </div>

        <TaxBreakdownCalculator
          countryId={country.id}
          countryName={country.name}
          currencySymbol={country.currencySymbol}
          currencyCode={country.currencyCode}
          budgetData={UK_BUDGET_2024}
          calculateTax={calculateUKIncomeTax}
          showFilingStatus={false}
        />

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">About the UK Budget</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              The United Kingdom budget for fiscal year 2024-25 shows how government
              revenue is allocated across public services. The NHS and welfare remain
              the largest spending categories.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Key Budget Categories:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Health - NHS (20%):</strong> National Health Service funding
              </li>
              <li>
                <strong>Welfare & Pensions (25%):</strong> State pension and welfare
                benefits
              </li>
              <li>
                <strong>Education (11%):</strong> Schools, universities, and training
              </li>
              <li>
                <strong>Defence (5%):</strong> Armed forces and military equipment
              </li>
              <li>
                <strong>Debt Interest (8%):</strong> Interest on government borrowing
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Source: HM Treasury, Office for National Statistics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

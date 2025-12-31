import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Calculator } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have
          been moved or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/tools">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Calculator className="mr-2 h-5 w-5" />
              View All Tools
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Pages
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <Link
              href="/us/calculator/where-taxes-go"
              className="p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <div className="font-medium text-gray-900">🇺🇸 USA Tax Calculator</div>
              <div className="text-sm text-gray-600">
                See where your US taxes go
              </div>
            </Link>
            <Link
              href="/india/calculator/where-taxes-go"
              className="p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <div className="font-medium text-gray-900">🇮🇳 India Tax Calculator</div>
              <div className="text-sm text-gray-600">
                Union Budget breakdown
              </div>
            </Link>
            <Link
              href="/tools/currency-converter"
              className="p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <div className="font-medium text-gray-900">💱 Currency Converter</div>
              <div className="text-sm text-gray-600">Convert between currencies</div>
            </Link>
            <Link
              href="/tools/compound-interest"
              className="p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <div className="font-medium text-gray-900">📈 Compound Interest</div>
              <div className="text-sm text-gray-600">
                Calculate investment growth
              </div>
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact support or try searching
          for what you need.
        </p>
      </div>
    </div>
  );
}

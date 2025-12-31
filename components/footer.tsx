import Link from "next/link";
import { PieChart, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Calculators",
      links: [
        { name: "USA Tax Calculator", href: "/us/calculator/where-taxes-go" },
        { name: "India Tax Calculator", href: "/india/calculator/where-taxes-go" },
        { name: "Canada Tax Calculator", href: "/canada/calculator/where-taxes-go" },
        { name: "UK Tax Calculator", href: "/uk/calculator/where-taxes-go" },
        { name: "Australia Tax Calculator", href: "/australia/calculator/where-taxes-go" },
      ],
    },
    {
      title: "Budget Data",
      links: [
        { name: "US Budget 2024", href: "/us/budget/2024" },
        { name: "India Budget 2024", href: "/india/budget/2024" },
        { name: "Canada Budget 2024", href: "/canada/budget/2024" },
        { name: "UK Budget 2024", href: "/uk/budget/2024" },
        { name: "Australia Budget 2024", href: "/australia/budget/2024" },
      ],
    },
    {
      title: "Financial Tools",
      links: [
        { name: "Currency Converter", href: "/tools/currency-converter" },
        { name: "Inflation Calculator", href: "/tools/inflation-calculator" },
        { name: "Compound Interest", href: "/tools/compound-interest" },
        { name: "Loan Calculator", href: "/tools/loan-calculator" },
        { name: "Savings Goal", href: "/tools/savings-goal" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "All Tools", href: "/tools" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/#contact" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <PieChart className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-white font-bold text-lg">GovtBudget</div>
                <div className="text-sm text-gray-400">Know Where Your Money Goes</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row md:items-center md:justify-between text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} GovtBudget. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> This calculator provides estimates for informational
            purposes only. Results may not reflect your actual tax liability. Consult a
            qualified tax professional for advice specific to your situation. GovtBudget is
            not responsible for any errors or decisions made based on these calculations.
            All budget data is sourced from official government publications.
          </p>
        </div>
      </div>
    </footer>
  );
}

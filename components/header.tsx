"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calculator, PieChart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Tools", href: "/tools", icon: Calculator },
  ];

  const countries = [
    { name: "USA", flag: "🇺🇸", href: "/us/calculator/where-taxes-go" },
    { name: "India", flag: "🇮🇳", href: "/india/calculator/where-taxes-go" },
    { name: "Canada", flag: "🇨🇦", href: "/canada/calculator/where-taxes-go" },
    { name: "UK", flag: "🇬🇧", href: "/uk/calculator/where-taxes-go" },
    { name: "Australia", flag: "🇦🇺", href: "/australia/calculator/where-taxes-go" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <PieChart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">GovtBudget</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Countries Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <span>Countries</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {countries.map((country) => (
                  <Link
                    key={country.name}
                    href={country.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <span className="mr-2">{country.flag}</span>
                    {country.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="px-4 text-sm font-semibold text-gray-500 mb-2">Countries</p>
              {countries.map((country) => (
                <Link
                  key={country.name}
                  href={country.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">{country.flag}</span>
                  {country.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

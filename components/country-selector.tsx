"use client";

import * as React from "react";
import { COUNTRIES } from "@/data/countries";
import { Country } from "@/types";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryId: string) => void;
  className?: string;
}

export function CountrySelector({
  selectedCountry,
  onCountryChange,
  className = "",
}: CountrySelectorProps) {
  const selected = COUNTRIES.find((c) => c.id === selectedCountry);

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
      >
        {COUNTRIES.map((country) => (
          <option key={country.id} value={country.id}>
            {country.flagEmoji} {country.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}

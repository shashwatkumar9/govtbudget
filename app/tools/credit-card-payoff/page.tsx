"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Tool() {
  const tools = [
    { name: "Currency Converter", href: "/tools/currency-converter", icon: "💱" },
    { name: "Retirement Calculator", href: "/tools/retirement-calculator", icon: "🏖️" },
    { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠" },
    { name: "Salary Calculator", href: "/tools/salary-calculator", icon: "💼" },
    { name: "Budget Planner", href: "/tools/budget-planner", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔨 Tool Under Development
          </h1>
          <p className="text-xl text-gray-600">
            This calculator is being enhanced with more features
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              We're building an amazing calculator for you. Check back soon or try our other tools!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-gray-700 mb-4">
                Meanwhile, explore our popular financial calculators:
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {tools.map((tool) => (
                  <Link key={tool.href} href={tool.href}>
                    <Button variant="outline" className="w-full">
                      {tool.icon} {tool.name.replace(" Calculator", "").replace(" Converter", "")}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

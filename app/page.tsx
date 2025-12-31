"use client";

import Link from "next/link";
import { useState } from "react";
import { COUNTRIES } from "@/data/countries";
import { CountrySelector } from "@/components/country-selector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, PieChart, TrendingUp, Globe, DollarSign, BarChart3, Shield, Zap, Users, Award } from "lucide-react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("us");

  const country = COUNTRIES.find((c) => c.id === selectedCountry);

  const features = [
    {
      icon: Calculator,
      title: "Tax Calculators",
      description: "Calculate your income tax and see exactly where your money goes",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: PieChart,
      title: "Budget Breakdowns",
      description: "Interactive visualizations of government spending by category",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: TrendingUp,
      title: "50+ Financial Tools",
      description: "From currency conversion to retirement planning calculators",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Globe,
      title: "5 Countries Covered",
      description: "USA, India, Canada, UK, and Australia - all in one platform",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const stats = [
    { value: "5", label: "Countries", icon: Globe },
    { value: "10+", label: "Tax & Budget Tools", icon: Calculator },
    { value: "100%", label: "Free to Use", icon: Award },
    { value: "0", label: "Ads (Coming Soon)", icon: Shield },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Fast & Accurate",
      description: "Instant calculations based on official government data",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "All calculations happen in your browser - we don't store your data",
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Simple interfaces designed for everyone, no financial expertise needed",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              Know Where Your
              <span className="block text-yellow-300">Money Goes</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Understand government spending, calculate your tax contributions, and access
              powerful financial tools - all free, transparent, and easy to use.
            </p>

            {/* Country Selector Card */}
            <div className="mt-10 flex justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <p className="text-gray-700 font-semibold mb-4 text-lg">
                  Choose your country to get started
                </p>
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountryChange={setSelectedCountry}
                  className="w-full"
                />
                {country && (
                  <Link href={`/${country.id}/calculator/where-taxes-go`}>
                    <Button size="lg" className="w-full mt-6 text-lg py-6 bg-blue-600 hover:bg-blue-700">
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate My Taxes →
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Privacy Focused</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">No Signup Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
              Everything You Need in One Place
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Comprehensive tools to understand government finances and manage your money
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative group hover:scale-105 transition-transform duration-200"
                >
                  <div className="h-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
                    <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Countries Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Explore by Country
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Select a country to see tax calculators and budget breakdowns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTRIES.map((c) => (
              <Link
                key={c.id}
                href={`/${c.id}/calculator/where-taxes-go`}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {c.flagEmoji}
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{c.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-semibold text-gray-900">
                          {c.currencySymbol} {c.currencyCode}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fiscal Year:</span>
                        <span className="font-semibold text-gray-900">{c.fiscalYearStart}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax Season:</span>
                        <span className="font-semibold text-gray-900">{c.taxSeason}</span>
                      </div>
                    </div>
                    <Button className="w-full group-hover:bg-blue-600" variant="outline">
                      View Calculator
                      <Calculator className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-blue-100 mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Understand Your Taxes?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of users making informed financial decisions every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {country && (
              <>
                <Link href={`/${country.id}/calculator/where-taxes-go`}>
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                    <Calculator className="mr-2 h-5 w-5" />
                    Start Calculating
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Explore All Tools
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

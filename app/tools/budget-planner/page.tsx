"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function BudgetPlanner() {
  const [income, setIncome] = useState("5000");
  const [housing, setHousing] = useState("1500");
  const [food, setFood] = useState("600");
  const [transportation, setTransportation] = useState("400");
  const [utilities, setUtilities] = useState("300");
  const [entertainment, setEntertainment] = useState("200");
  const [savings, setSavings] = useState("1000");
  const [other, setOther] = useState("500");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    const expenses = {
      housing: parseFloat(housing),
      food: parseFloat(food),
      transportation: parseFloat(transportation),
      utilities: parseFloat(utilities),
      entertainment: parseFloat(entertainment),
      savings: parseFloat(savings),
      other: parseFloat(other),
    };

    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    const remaining = monthlyIncome - totalExpenses;

    const chartData = [
      { name: "Housing", value: expenses.housing, color: "#3b82f6" },
      { name: "Food", value: expenses.food, color: "#10b981" },
      { name: "Transportation", value: expenses.transportation, color: "#f59e0b" },
      { name: "Utilities", value: expenses.utilities, color: "#ef4444" },
      { name: "Entertainment", value: expenses.entertainment, color: "#8b5cf6" },
      { name: "Savings", value: expenses.savings, color: "#06b6d4" },
      { name: "Other", value: expenses.other, color: "#6b7280" },
    ];

    setResult({
      totalExpenses: Math.round(totalExpenses),
      remaining: Math.round(remaining),
      savingsRate: ((expenses.savings / monthlyIncome) * 100).toFixed(1),
      chartData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Budget Planner
          </h1>
          <p className="text-xl text-gray-600">
            Plan and track your monthly budget
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income & Expenses</CardTitle>
              <CardDescription>
                Enter your monthly budget details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income ($)
                </label>
                <Input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="5000"
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Expenses</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Housing</label>
                    <Input
                      type="number"
                      value={housing}
                      onChange={(e) => setHousing(e.target.value)}
                      placeholder="1500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Food</label>
                    <Input
                      type="number"
                      value={food}
                      onChange={(e) => setFood(e.target.value)}
                      placeholder="600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Transportation</label>
                    <Input
                      type="number"
                      value={transportation}
                      onChange={(e) => setTransportation(e.target.value)}
                      placeholder="400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Utilities</label>
                    <Input
                      type="number"
                      value={utilities}
                      onChange={(e) => setUtilities(e.target.value)}
                      placeholder="300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Entertainment</label>
                    <Input
                      type="number"
                      value={entertainment}
                      onChange={(e) => setEntertainment(e.target.value)}
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Savings</label>
                    <Input
                      type="number"
                      value={savings}
                      onChange={(e) => setSavings(e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">Other</label>
                    <Input
                      type="number"
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                      placeholder="500"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={calculate} className="w-full">
                Analyze Budget
              </Button>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Total Expenses</div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${result.totalExpenses.toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className={result.remaining >= 0 ? "bg-green-50" : "bg-red-50"}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Remaining</div>
                      <div className={`text-2xl font-bold ${result.remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ${result.remaining.toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={result.chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: $${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {result.chartData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 text-center">
                    <div className="text-sm text-gray-600">Savings Rate</div>
                    <div className="text-2xl font-bold text-cyan-600">
                      {result.savingsRate}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

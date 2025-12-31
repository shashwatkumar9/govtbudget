"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("19.99");
  const [paymentType, setPaymentType] = useState<"minimum" | "fixed">("fixed");
  const [fixedPayment, setFixedPayment] = useState("200");

  const [months, setMonths] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPaid, setTotalPaid] = useState<number | null>(null);

  const calculate = () => {
    const bal = parseFloat(balance);
    const rate = parseFloat(apr) / 100 / 12;

    let payment = 0;
    if (paymentType === "minimum") {
      // Minimum payment is typically 2-3% of balance or $25, whichever is greater
      payment = Math.max(bal * 0.02, 25);
    } else {
      payment = parseFloat(fixedPayment);
    }

    if (!isNaN(bal) && !isNaN(rate) && payment > 0) {
      if (payment <= bal * rate) {
        alert("Payment must be greater than monthly interest to pay off!");
        return;
      }

      let remaining = bal;
      let monthCount = 0;
      let interest = 0;

      while (remaining > 0.01 && monthCount < 600) {
        const monthlyInterest = remaining * rate;
        const principalPayment = Math.min(payment - monthlyInterest, remaining);
        remaining -= principalPayment;
        interest += monthlyInterest;
        monthCount++;
      }

      setMonths(monthCount);
      setTotalInterest(interest);
      setTotalPaid(bal + interest);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            💳 Credit Card Tool
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Credit Card Payoff Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how long it takes to pay off credit card debt and how much interest you'll pay.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Credit Card Details</CardTitle>
            <CardDescription>Enter your credit card balance and APR</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="balance">Current Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                step="100"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="e.g., 5000"
              />
            </div>

            <div>
              <Label htmlFor="apr">APR (% per year)</Label>
              <Input
                id="apr"
                type="number"
                step="0.01"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                placeholder="e.g., 19.99"
              />
            </div>

            <div>
              <Label className="mb-3 block">Payment Strategy</Label>
              <div className="grid md:grid-cols-2 gap-3">
                <Button
                  variant={paymentType === "minimum" ? "default" : "outline"}
                  onClick={() => setPaymentType("minimum")}
                  className="h-auto py-4"
                >
                  <div>
                    <div className="font-bold">Minimum Payments</div>
                    <div className="text-xs">2% of balance or $25</div>
                  </div>
                </Button>
                <Button
                  variant={paymentType === "fixed" ? "default" : "outline"}
                  onClick={() => setPaymentType("fixed")}
                  className="h-auto py-4"
                >
                  <div>
                    <div className="font-bold">Fixed Payment</div>
                    <div className="text-xs">Same amount each month</div>
                  </div>
                </Button>
              </div>
            </div>

            {paymentType === "fixed" && (
              <div>
                <Label htmlFor="fixedPayment">Fixed Monthly Payment ($)</Label>
                <Input
                  id="fixedPayment"
                  type="number"
                  step="10"
                  value={fixedPayment}
                  onChange={(e) => setFixedPayment(e.target.value)}
                  placeholder="e.g., 200"
                />
              </div>
            )}

            <Button onClick={calculate} className="w-full" size="lg">
              Calculate Payoff
            </Button>

            {months !== null && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-blue-300 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardDescription>Payoff Time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {months} months
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {(months / 12).toFixed(1)} years
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total Interest</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        ${totalInterest?.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {((totalInterest! / parseFloat(balance)) * 100).toFixed(1)}% of balance
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle>⚠️ Important Notice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        {paymentType === "minimum" ? (
                          <span className="font-bold text-orange-600">
                            Warning: Making only minimum payments will keep you in debt for {months} months ({(months / 12).toFixed(1)} years)
                            and cost ${totalInterest?.toFixed(2)} in interest!
                          </span>
                        ) : (
                          <span className="font-bold text-green-600">
                            Good strategy! Paying ${fixedPayment}/month will eliminate your debt in {months} months.
                          </span>
                        )}
                      </p>
                      <p className="text-gray-600">
                        Total amount paid: ${totalPaid?.toFixed(2)} (${parseFloat(balance).toFixed(2)} principal + ${totalInterest?.toFixed(2)} interest)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle>Credit Card Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">Pay more than minimum:</span> Doubling your minimum payment can cut payoff time in half</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">0% balance transfer:</span> Consider transferring to a 0% APR card to save on interest</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">Stop using the card:</span> Freeze spending while paying off to avoid adding to debt</div>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <div><span className="font-bold">Automate payments:</span> Set up automatic payments to never miss a due date</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/tools">
            <Button variant="outline" size="lg">
              ← Back to All Tools
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

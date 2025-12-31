import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GovtBudget - Know Where Your Money Goes",
  description:
    "Understand government spending, calculate your tax contributions, and access 50+ financial tools across USA, India, Canada, UK, and Australia. Free tax calculators and budget breakdowns.",
  keywords: [
    "tax calculator",
    "government budget",
    "where do my taxes go",
    "budget breakdown",
    "income tax calculator",
    "financial tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

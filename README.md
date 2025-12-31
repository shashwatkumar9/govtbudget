# GovtBudget - Know Where Your Money Goes

A comprehensive government budget tracking and financial tools platform covering 5 countries (USA, India, Canada, UK, Australia/NZ).

## 🌟 Features

### Core Feature: "Where Do My Taxes Go?" Calculators
- **USA** 🇺🇸 - Federal tax breakdown with filing status options
- **India** 🇮🇳 - Union Budget allocation (New Tax Regime)
- **Canada** 🇨🇦 - Federal budget breakdown
- **UK** 🇬🇧 - Budget allocation across NHS, welfare, education
- **Australia** 🇦🇺 - Federal budget with social security focus

### Tax Calculators
- Income tax calculation for all 5 countries
- Support for multiple tax brackets and filing statuses
- Real-time budget breakdown visualization
- Daily, monthly, and annual tax allocation

### Interactive Visualizations
- Bar charts showing budget category allocations
- Color-coded spending categories
- Detailed breakdown with percentages and amounts

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14 | React framework with App Router |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| Charts | Recharts | Budget visualizations |
| UI Components | Radix UI | Accessible components |
| Icons | Lucide React | Icon library |
| Hosting | Vercel | Deployment platform |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:
\`\`\`bash
cd govtbudget
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## ✅ What's Built So Far

### Phase 1 - Week 2 Progress
- ✅ Next.js 14 project setup with TypeScript & Tailwind CSS
- ✅ Project folder structure and component library
- ✅ Country selector component
- ✅ All 5 "Where Do My Taxes Go?" calculators
  - ✅ USA (with filing status support)
  - ✅ India (New Tax Regime)
  - ✅ Canada (Federal)
  - ✅ UK
  - ✅ Australia
- ✅ Homepage with interactive country selector
- ✅ Interactive budget visualizations using Recharts
- ✅ Tax calculation logic for all countries
- ✅ SEO-friendly metadata

## 🌍 Countries & Data

| Country | Currency | Fiscal Year | Top Budget Item |
|---------|----------|-------------|-----------------|
| 🇺🇸 USA | USD | Oct 1 | Healthcare (25%) |
| 🇮🇳 India | INR | Apr 1 | Interest Payments (20%) |
| 🇨🇦 Canada | CAD | Apr 1 | Elderly Benefits (17%) |
| 🇬🇧 UK | GBP | Apr 1 | Welfare & Pensions (25%) |
| 🇦🇺 Australia | AUD | Jul 1 | Social Security (35%) |

## 📁 Project Structure

\`\`\`
govtbudget/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout
│   ├── us/calculator/where-taxes-go/
│   ├── india/calculator/where-taxes-go/
│   ├── canada/calculator/where-taxes-go/
│   ├── uk/calculator/where-taxes-go/
│   └── australia/calculator/where-taxes-go/
├── components/
│   ├── ui/                    # UI components
│   ├── country-selector.tsx
│   └── tax-breakdown-calculator.tsx
├── data/
│   ├── countries.ts           # Country data
│   ├── budgets.ts             # Budget allocations
│   └── tax-calculators.ts     # Tax logic
├── lib/utils.ts
└── types/index.ts
\`\`\`

## 📋 Next Steps

### Phase 1 Remaining (Week 3-6)
- [ ] Simple budget breakdown pages
- [ ] 10-15 core financial tools:
  - [ ] Currency Converter
  - [ ] Inflation Calculator
  - [ ] Compound Interest Calculator
  - [ ] Loan EMI Calculator
  - [ ] Take-Home Pay Calculator
- [ ] Sitemap & robots.txt
- [ ] Google AdSense integration
- [ ] Deploy to Vercel

### Phase 2 (Month 3-6)
- [ ] Interactive dashboards
- [ ] 30+ tools
- [ ] State/Province pages
- [ ] Blog system

### Phase 3 (Month 7-18)
- [ ] 50+ tools
- [ ] API access
- [ ] Premium features
- [ ] Mobile app

## 💻 Running the Project

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

The app will be available at http://localhost:3000

## 🎨 Key Pages

- **Homepage**: `/` - Country selector and feature showcase
- **USA Calculator**: `/us/calculator/where-taxes-go`
- **India Calculator**: `/india/calculator/where-taxes-go`
- **Canada Calculator**: `/canada/calculator/where-taxes-go`
- **UK Calculator**: `/uk/calculator/where-taxes-go`
- **Australia Calculator**: `/australia/calculator/where-taxes-go`

## ⚠️ Disclaimer

This calculator provides estimates for informational purposes only. Results may not reflect your actual tax liability. Consult a qualified tax professional for advice specific to your situation.

## 📈 Revenue Model (Planned)

- Display ads (AdSense)
- Affiliate partnerships (tax software)
- Premium features
- API access

## 🎯 Mission

Empower citizens with transparent, easy-to-understand information about government budgets and provide practical financial tools for everyday decisions.

---

**Built with Next.js 14, TypeScript, and Tailwind CSS**

**Domain**: govtbudget.com  
**Tagline**: "Know Where Your Money Goes"

# Quick Setup Guide

## Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

## Quick Start

1. **Navigate to project directory**
   ```bash
   cd "/Users/shashwat/Desktop/Govt Budget/govtbudget"
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit: http://localhost:3000

## Available Routes

### Homepage
- **URL**: `/`
- **Description**: Homepage with country selector and platform overview

### Tax Calculators
- **USA**: `/us/calculator/where-taxes-go`
- **India**: `/india/calculator/where-taxes-go`
- **Canada**: `/canada/calculator/where-taxes-go`
- **UK**: `/uk/calculator/where-taxes-go`
- **Australia**: `/australia/calculator/where-taxes-go`

## Project Status

### ✅ Completed (Phase 1 - Week 2)
- Next.js 14 setup with TypeScript
- All 5 country tax calculators
- Interactive budget visualizations
- Homepage with country selector
- Responsive design
- Tax calculation logic

### 🔄 In Progress
- Budget breakdown pages
- Additional financial tools
- SEO optimization

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage |
| `app/layout.tsx` | Root layout with metadata |
| `components/tax-breakdown-calculator.tsx` | Main calculator component |
| `components/country-selector.tsx` | Country dropdown |
| `data/countries.ts` | Country information |
| `data/budgets.ts` | Budget allocation data |
| `data/tax-calculators.ts` | Tax calculation logic |

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Radix UI, Lucide Icons

## Building for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## Development Tips

1. **Hot Reload**: Changes are automatically reflected in the browser
2. **TypeScript**: All type errors will show in the terminal
3. **Tailwind**: Utility classes are purged in production
4. **Components**: Reusable components are in `/components`

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Dependencies not installed
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Next Steps

See README.md for the full project roadmap and feature list.

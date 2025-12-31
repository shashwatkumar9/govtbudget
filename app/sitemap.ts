import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://govtbudget.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Tax calculator pages
  const taxCalculators = [
    'us',
    'india',
    'canada',
    'uk',
    'australia',
  ].map((country) => ({
    url: `${baseUrl}/${country}/calculator/where-taxes-go`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.9,
  }))

  // Budget pages
  const budgetPages = [
    'us',
    'india',
    'canada',
    'uk',
    'australia',
  ].map((country) => ({
    url: `${baseUrl}/${country}/budget/2024`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Tool pages
  const tools = [
    'currency-converter',
    'inflation-calculator',
    'compound-interest',
    'loan-calculator',
    'savings-goal',
  ].map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...taxCalculators, ...budgetPages, ...tools]
}

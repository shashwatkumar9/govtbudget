# Deployment Guide - GovtBudget

## Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier is sufficient for Phase 1)

### Step 1: Push to GitHub

```bash
cd govtbudget
git init
git add .
git commit -m "Initial commit - GovtBudget Phase 1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/govtbudget.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
5. Click "Deploy"

That's it! Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to a production URL
- Set up CI/CD for future commits

### Step 3: Custom Domain (Optional)

1. In your Vercel project settings, go to "Domains"
2. Add "govtbudget.com"
3. Follow Vercel's DNS configuration instructions
4. Update your domain registrar's DNS settings

### Environment Variables

Currently, the project doesn't require any environment variables. All calculations are client-side.

## Build Locally

```bash
npm run build
npm start
```

## Verify Deployment

After deployment, check these URLs:

1. Homepage: https://your-project.vercel.app/
2. US Tax Calculator: https://your-project.vercel.app/us/calculator/where-taxes-go
3. Tools Page: https://your-project.vercel.app/tools
4. Sitemap: https://your-project.vercel.app/sitemap.xml
5. Robots: https://your-project.vercel.app/robots.txt

## Performance Optimization

Vercel automatically provides:
- Global CDN
- Automatic HTTPS
- Edge caching
- Image optimization
- Analytics (Pro plan)

## Monitoring

Use Vercel Analytics to monitor:
- Page views
- User location
- Performance metrics
- Error tracking

## Cost Estimate

**Free Tier includes:**
- 100GB bandwidth
- Unlimited projects
- Automatic SSL
- Preview deployments

This is more than sufficient for Phase 1 (targeting 10K-50K monthly visitors).

## Future Enhancements

### Phase 2 (Month 3-6):
- Upgrade to Vercel Pro if traffic exceeds 100GB/month
- Add Neon PostgreSQL for dynamic data
- Set up Upstash Redis for caching
- Configure analytics

### Phase 3 (Month 7-18):
- Premium tier for high traffic
- Database for user accounts
- API rate limiting
- Advanced monitoring

## Troubleshooting

### Build Fails
- Check package.json for missing dependencies
- Verify all imports are correct
- Run `npm run build` locally first

### Pages Not Loading
- Check file paths are correct
- Verify all components are properly exported
- Check browser console for errors

### Slow Performance
- Enable Vercel Analytics to identify bottlenecks
- Optimize images using Next.js Image component
- Add loading states for interactive components

## Support

For Vercel-specific issues:
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

For Next.js issues:
- Documentation: https://nextjs.org/docs
- Discord: https://nextjs.org/discord

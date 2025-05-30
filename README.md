# Benchmarketing - Marketing Analytics Platform

A comprehensive marketing analytics platform that helps businesses track, analyze, and optimize their marketing performance across multiple platforms.

## Features

- **Platform Integrations**
  - Google Ads
  - Meta Ads (Facebook & Instagram)
  - TikTok Ads
  - Google Analytics 4

- **Core Functionality**
  - Real-time data synchronization (4-hour intervals)
  - Performance benchmarking against industry standards
  - AI-powered recommendations
  - Custom alerts and notifications
  - Data export capabilities
  - White-label options

## Tech Stack

- **Frontend**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Headless UI
  - Framer Motion

- **Backend**
  - Supabase (PostgreSQL)
  - Next.js API Routes
  - OAuth 2.0 Integration

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/benchmarketing.git
   cd benchmarketing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_META_CLIENT_ID=your_meta_client_id
   META_CLIENT_SECRET=your_meta_client_secret
   NEXT_PUBLIC_TIKTOK_CLIENT_ID=your_tiktok_client_id
   TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
   ```

4. Initialize the database:
   ```bash
   psql -h your_supabase_host -d postgres -U postgres -f scripts/init-db.sql
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── lib/             # Utility functions and modules
│   │   ├── ai/          # AI recommendation engine
│   │   ├── oauth/       # OAuth integration
│   │   ├── supabase/    # Database client
│   │   └── sync/        # Data sync engine
│   └── types/           # TypeScript definitions
├── public/              # Static assets
└── scripts/             # Database and utility scripts
```

## Available Plans

- **Free**
  - Basic analytics
  - Single user
  - Limited alerts
  - CSV export

- **Pro** ($49/month)
  - Advanced analytics
  - 3 team members
  - AI recommendations
  - Multiple export formats
  - API access

- **Pro+** ($99/month)
  - Everything in Pro
  - White-label options
  - Custom branding
  - 10 team members
  - Priority support

- **Agency** ($299/month)
  - Everything in Pro+
  - Unlimited team members
  - Agency dashboard
  - Client management
  - Priority support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

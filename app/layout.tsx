'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import AppLayout from './components/layout/AppLayout'
import MarketingLayout from './components/layout/MarketingLayout'
import { usePathname } from 'next/navigation'
import { AuthProvider } from './providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() || '';
  
  // Routes that should use the marketing layout
  const marketingRoutes = ['/', '/how-it-works', '/pricing', '/about', '/contact', '/privacy', '/terms'];
  const isMarketingRoute = marketingRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {isMarketingRoute ? (
            <MarketingLayout>{children}</MarketingLayout>
          ) : (
            <AppLayout>{children}</AppLayout>
          )}
        </AuthProvider>
      </body>
    </html>
  )
} 
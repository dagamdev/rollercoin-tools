import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/headertools'
import Footer from '@/components/shared/footertools'
import TooltipsProvider from '@/providers/TooltipsProvidertools'
import Client from '@/components/shared/clienttools'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'RollerTools',
    template: '%s | RollerTools'
  },
  description: 'Tools and utilities for RollerCoin',
  themeColor: '#f59e0b'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className + ' min-h-screen bg-gray-900'}>
        <TooltipsProvider windowMargin={20}>
          <Header />
          <main className='min-h-screen p-5 pb-20 flex flex-col items-center'>
            {children}
          </main>
          <Footer />

          <Client />
        </TooltipsProvider>
      </body>
    </html>
  )
}

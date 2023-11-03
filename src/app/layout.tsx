import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/headertools'

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
        <Header />
        <main className='p-5 flex flex-col items-center'>
          {children}
        </main>
      </body>
    </html>
  )
}

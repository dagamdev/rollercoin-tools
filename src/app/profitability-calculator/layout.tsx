import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profitability calculator'
}

export default function ProfitabilityCalculatorLayout ({ children }: {
  children: React.ReactNode
}) {
  return children
}

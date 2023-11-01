import { createContext } from 'react'
import type { ProfitabilityData } from '@/typestools'

export interface ProfitabilityContextData extends ProfitabilityData {
  calculate: boolean
  updateProfitability: (data: ProfitabilityData) => void
}

export const ProfitabilityContext = createContext<ProfitabilityContextData | undefined>(undefined)

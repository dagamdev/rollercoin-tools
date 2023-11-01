import { useContext } from 'react'
import { ProfitabilityContext, type ProfitabilityContextData } from '@/contexts/profitability-contexttools'

export default function useProfitability () {
  return useContext(ProfitabilityContext) as ProfitabilityContextData
}

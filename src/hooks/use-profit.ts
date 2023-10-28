import { useContext } from 'react'
import { ProfitContext, type ProfitContextData } from '@/contexts/profit-contexttools'

export default function useCalculator () {
  return useContext(ProfitContext) as ProfitContextData
}

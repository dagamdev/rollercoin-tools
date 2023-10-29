import { useContext } from 'react'
import { ProfitContext, type ProfitContextData } from '@/contexts/profit-contexttools'

export default function useProfit () {
  return useContext(ProfitContext) as ProfitContextData
}

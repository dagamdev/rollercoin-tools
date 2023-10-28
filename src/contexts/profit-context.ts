import { createContext } from 'react'
import type { ProfitData, StateFunction } from '@/typestools'

export interface ProfitContextData extends ProfitData {
  setProfitData: StateFunction<ProfitData>
}

export const ProfitContext = createContext<ProfitContextData | undefined>(undefined)

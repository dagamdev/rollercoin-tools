import { createContext } from 'react'
import type { CalculatorData, StateFunction } from '@/typestools'

export interface CalculatorContextData extends CalculatorData {
  setCalculatorData: StateFunction<CalculatorData>
}

export const CalculatorContext = createContext<CalculatorContextData | undefined>(undefined)

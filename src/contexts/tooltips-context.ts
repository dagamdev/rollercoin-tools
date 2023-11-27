import { createContext } from 'react'
import type { Tooltip, StateFunction } from '@/typestools'

export interface TooltipsContextData {
  tooltips: Tooltip[]
  setTooltips: StateFunction<Tooltip[]>
  windowMargin: number
  targetMargin: number
}

export const TooltipsContext = createContext<TooltipsContextData | undefined>(undefined)

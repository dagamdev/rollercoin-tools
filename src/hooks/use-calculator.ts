import { useContext } from 'react'
import { CalculatorContext, type CalculatorContextData } from '@/contexts/calculator-contexttools'

export default function useCalculator () {
  return useContext(CalculatorContext) as CalculatorContextData
}

'use client'

import '../../styles/calculator.css'
import { useState } from 'react'
import { CalculatorContext } from '@/contexts/calculator-contexttools'
import type { CalculatorData } from '@/typestools'
import Form from '@/components/calculator/formtools'
import Table from '@/components/calculator/tabletools'

export default function ProfitCalculatorPage () {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    blockTime: 0,
    currency: undefined,
    blockReward: 0,
    currencyReward: 0
  })

  return (
    <>
      <h1 className='font-bold text-4xl mb-5'>Profit calculator</h1>

      <CalculatorContext.Provider value={{
        ...calculatorData,
        setCalculatorData
      }}>
        <section className='flex gap-5 flex-wrap justify-center'>
          <Form />

          <Table />
        </section>
      </CalculatorContext.Provider>
    </>
  )
}

'use client'

import '../../styles/calculator.css'
import { useState } from 'react'
import { ProfitContext } from '@/contexts/profit-contexttools'
import type { ProfitData } from '@/typestools'
import Form from '@/components/profit/formtools'
import Table from '@/components/profit/tabletools'

export default function ProfitCalculatorPage () {
  const [profitData, setProfitData] = useState<ProfitData>({
    blockTime: 0,
    currency: undefined,
    currencyReward: 0
  })

  return (
    <>
      <h1 className='font-bold text-3xl mb-5'>Profit calculator</h1>

      <ProfitContext.Provider value={{
        ...profitData,
        setProfitData
      }}>
        <section className='flex gap-5 flex-wrap justify-center'>
          <Form />
          <Table />
        </section>
      </ProfitContext.Provider>
    </>
  )
}

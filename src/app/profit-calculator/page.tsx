'use client'

import '../../styles/calculator.css'
import { useState } from 'react'
import { ProfitContext } from '@/contexts/profit-contexttools'
import type { ProfitData } from '@/typestools'
import Form from '@/components/profit/formtools'
import Table from '@/components/profit/tabletools'
import SetTooltip from '@/components/shared/set-tooltiptools'

export default function ProfitCalculatorPage () {
  const [profitData, setProfitData] = useState<ProfitData>({
    blockTime: 0,
    currency: undefined,
    currencyReward: 0
  })

  return (
    <>
      <h1 className='arcana-text font-bold text-3xl mb-5' id='profit-calculator-title'>Profit calculator</h1>
      <SetTooltip targetId='profit-calculator-title' maxWidth={300}>
        With this calculator, you can calculate your earnings for each currency, displaying a <strong>profit</strong> overview table over time intervals ranging from per <strong>block</strong> to <strong>1 month</strong>.
      </SetTooltip>

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

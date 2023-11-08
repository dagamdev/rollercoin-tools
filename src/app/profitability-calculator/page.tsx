'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { ProfitabilityContext } from '@/contexts/profitability-contexttools'
import StatisticalInformation from '@/components/profitability/statistical-informationtools'
import PurchasingDetails from '@/components/profitability/purchasing-detailstools'
import Projection from '@/components/profitability/projectiontools'
import Results from '@/components/profitability/resultstools'
import CustomButton from '@/components/custom-buttontools'
import type { ButtonStates, ProfitabilityData } from '@/typestools'

export default function ProfitabilityCalculator () {
  const [profitabilityData, setProfitabilityData] = useState<ProfitabilityData>({})
  const [buttonStatus, setButtonStatus] = useState<ButtonStates>('locked')

  useEffect(() => {
    const { actualBonus, actualPower, purchasingBonus, purchasingCost, purchasingPower } = profitabilityData

    if (actualBonus !== undefined && actualPower !== undefined && purchasingBonus !== undefined && purchasingCost !== undefined && purchasingPower !== undefined) {
      setButtonStatus('available')
    } else if (buttonStatus !== 'locked') setButtonStatus('locked')
  }, [profitabilityData])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setButtonStatus('pressed')
  }

  return (
    <>
      <h1 className='font-bold text-3xl mb-5'>Profitability calculator</h1>

      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <section className='flex flex-wrap gap-5 justify-center'>
          <ProfitabilityContext.Provider value={{
            calculate: buttonStatus === 'pressed',
            updateProfitability (data) {
              setProfitabilityData(pd => ({ ...pd, ...data }))
            },
            ...profitabilityData
          }}>
            <StatisticalInformation />
            <PurchasingDetails />
            <Projection />
            <Results />
          </ProfitabilityContext.Provider>
        </section>
        <CustomButton buttonStatus={buttonStatus}>Calculate</CustomButton>
      </form>
    </>
  )
}

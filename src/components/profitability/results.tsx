import { useState, useEffect } from 'react'
import MetricDisplay from '../shared/metric-display'
import { POWER_UNITS } from '@/utils/configtools'
import useProfitability from '@/hooks/use-profitabilitytools'

const measures = {
  power: POWER_UNITS.Th,
  powerRLT: 100,
  bonus: 1,
  bonusRLT: 10
}

export default function Results () {
  const profitability = useProfitability()
  const [totalPower, setTotalPower] = useState(0)
  const [powerCost, setPowerCost] = useState(0)
  const [isProfitable, setIsProfitable] = useState(false)

  useEffect(() => {
    if (profitability.calculate) {
      const { actualBonus, actualPower, purchasingBonus, purchasingCost, purchasingPower } = profitability

      if (actualBonus !== undefined && actualPower !== undefined && purchasingBonus !== undefined && purchasingCost !== undefined && purchasingPower !== undefined) {
        const actualTotalPower = actualPower + (actualPower * actualBonus / 100)
        const totalBonus = actualBonus + purchasingBonus
        const acumulatedPowers = actualPower + purchasingPower
        const newTotalPower = acumulatedPowers + (acumulatedPowers * totalBonus / 100)
        const totalAcquiredPower = newTotalPower - actualTotalPower
        const powerCost = parseFloat(((totalAcquiredPower / measures.power) / purchasingCost).toFixed(6))

        setTotalPower(totalAcquiredPower)
        setPowerCost(powerCost)
        setIsProfitable(powerCost <= measures.powerRLT)
      }
    }
  }, [profitability.calculate])

  return (
    <section className='p-4 rounded-lg shadow-lg min-w-[240px] border border-slate-700 bg-slate-800'>
      <h2 className='font-bold text-xl mb-4 text-center'>Results</h2>

      <section className='space-y-2'>
        <MetricDisplay amount={totalPower} type='power' font='bold' >Total power acquired</MetricDisplay>
        <MetricDisplay amount={powerCost} font='bold' >RLT value by Th</MetricDisplay>
        <p className='flex justify-between'>
          <span className='mr-3'>Is profitable?</span>
          <strong>{isProfitable ? '✅' : '❌'}</strong>
        </p>
      </section>
    </section>
  )
}

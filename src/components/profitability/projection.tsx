import { useState, useEffect } from 'react'
import MetricDisplay from '../shared/metric-display'
import useProfitability from '@/hooks/use-profitabilitytools'

export default function Projection () {
  const profitability = useProfitability()
  const [power, setPower] = useState(0)
  const [bonus, setBonus] = useState(0)
  const [bonusPower, setBonusPower] = useState(0)
  const [totalPower, setTotalPower] = useState(0)

  useEffect(() => {
    if (profitability.calculate) {
      const { actualBonus, actualPower, purchasingBonus, purchasingCost, purchasingPower } = profitability

      if (actualBonus !== undefined && actualPower !== undefined && purchasingBonus !== undefined && purchasingCost !== undefined && purchasingPower !== undefined) {
        const totalBonus = actualBonus + purchasingBonus
        const acumulatedPowers = actualPower + purchasingPower
        const totalBonusPower = acumulatedPowers * totalBonus / 100
        const totalPower = acumulatedPowers + totalBonusPower

        setPower(acumulatedPowers)
        setBonus(totalBonus)
        setBonusPower(totalBonusPower)
        setTotalPower(totalPower)
      }
    }
  }, [profitability.calculate])

  return (
    <article className='p-4 rounded-lg shadow-lg border min-w-[240px] border-slate-700 bg-slate-800'>
      <h2 className='font-bold text-xl mb-4 text-center'>Projection</h2>

      <section className='space-y-2'>
        <MetricDisplay amount={power} type='power' font='bold'>Power</MetricDisplay>
        <MetricDisplay amount={bonus} type='percentage' font='bold'>Bonus</MetricDisplay>
        <MetricDisplay amount={bonusPower} type='power' font='bold'>Bonus power</MetricDisplay>
        <MetricDisplay amount={totalPower} type='power' font='bold'>Total power</MetricDisplay>
      </section>
    </article>
  )
}

import { useState, useEffect } from 'react'
import useProfitability from '@/hooks/use-profitabilitytools'
import CustomInput from '../custom-input'
import MetricDisplay from '../metric-display'
import { getStorageData, updateStorageData } from '@/utils/servicestools'
import type { ProfitabilityStorageData } from '@/typestools'

export default function StatisticalInformation () {
  const { updateProfitability } = useProfitability()
  const [minersPower, setMinersPower] = useState<number>()
  const [gamesPower, setGamesPower] = useState<number>()
  const [bonusPercentage, setBonusPercentage] = useState<number>()
  const [power, setPower] = useState(0)
  const [bonusPower, setBonusPower] = useState(0)
  const [totalPower, setTotalPower] = useState(0)

  useEffect(() => {
    const profitabilityStorageData = getStorageData<ProfitabilityStorageData>('profitability')

    setMinersPower(profitabilityStorageData?.minersPower)
    setGamesPower(profitabilityStorageData?.gamesPower)
    setBonusPercentage(profitabilityStorageData?.bonusPercentage)
  }, [])

  useEffect(() => {
    if (minersPower === undefined && gamesPower === undefined) {
      updateProfitability({
        actualPower: undefined
      })
    } else {
      const acumulatedPowers = (minersPower ?? 0) + (gamesPower ?? 0)
      const bonusPower = acumulatedPowers * (bonusPercentage ?? 0) / 100

      setPower(acumulatedPowers)
      setBonusPower(bonusPower)
      setTotalPower(acumulatedPowers + bonusPower)
      updateProfitability({
        actualPower: acumulatedPowers
      })

      updateStorageData<ProfitabilityStorageData>('profitability', {
        minersPower,
        gamesPower,
        bonusPercentage
      }, 'object')
    }
  }, [minersPower, bonusPercentage, gamesPower])

  useEffect(() => {
    updateProfitability({
      actualBonus: bonusPercentage
    })
  }, [bonusPercentage])

  return (
    <article className='space-y-4 p-4 rounded-lg shadow-lg border border-slate-700 bg-slate-800'>
      <h2 className='font-bold text-xl text-center'>Your statistical information</h2>

      <section className='space-y-1'>
        <CustomInput type='power' text='Miners power' setValue={setMinersPower} />
        <CustomInput type='power' text='Games power' setValue={setGamesPower} />
        <CustomInput type='number' text='Bonus percentage' setValue={setBonusPercentage} />
      </section>

      <section className='space-y-2'>
        <MetricDisplay amount={power} type='power' font='bold'>Power</MetricDisplay>
        <MetricDisplay amount={bonusPower} type='power' font='bold'>Bonus power</MetricDisplay>
        <MetricDisplay amount={totalPower} type='power' font='bold'>Total power</MetricDisplay>
      </section>
    </article>
  )
}

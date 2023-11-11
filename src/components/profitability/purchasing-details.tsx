import { useState, useEffect } from 'react'
import useProfitability from '@/hooks/use-profitabilitytools'
import CustomInput from '../custom-input'
import { getStorageData, updateStorageData } from '@/utils/servicestools'
import type { ProfitabilityStorageData } from '@/typestools'

export default function PurchasingDetails () {
  const [purchasingCost, setPurchasingCost] = useState<number>()
  const [purchasingPower, setPurchasingPower] = useState<number>()
  const [purchasingBonus, setPurchasingBonus] = useState<number>()
  const { updateProfitability } = useProfitability()

  useEffect(() => {
    const profitabilityStorageData = getStorageData<ProfitabilityStorageData>('profitability')

    setPurchasingCost(profitabilityStorageData?.purchasingCost)
    setPurchasingPower(profitabilityStorageData?.purchasingPower)
    setPurchasingBonus(profitabilityStorageData?.purchasingBonus)
  }, [])

  useEffect(() => {
    updateProfitability({
      purchasingCost,
      purchasingPower,
      purchasingBonus
    })

    updateStorageData<ProfitabilityStorageData>('profitability', {
      purchasingCost,
      purchasingPower,
      purchasingBonus
    }, 'object')
  }, [purchasingCost, purchasingPower, purchasingBonus])

  return (
    <article className='p-4 rounded-lg shadow-lg border border-slate-700 bg-slate-800'>
      <h2 className='font-bold text-xl mb-4 text-center'>Purchasing details</h2>

      <section className='space-y-1'>
        <CustomInput type='number' text='Purchasing cost' value={purchasingCost} setValue={setPurchasingCost} />
        <CustomInput type='power' text='Purchasing power' value={purchasingPower} setValue={setPurchasingPower} />
        <CustomInput type='number' text='Purchasing bonus' value={purchasingBonus} setValue={setPurchasingBonus} />
      </section>
    </article>
  )
}

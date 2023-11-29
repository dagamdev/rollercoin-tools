import { useState, useEffect } from 'react'
import useProfitability from '@/hooks/use-profitabilitytools'
import CustomInput from '../shared/custom-input'
import { getStorageData, updateStorageData } from '@/utils/servicestools'
import type { ProfitabilityStorageData } from '@/typestools'
import SetTooltip from '../shared/set-tooltip'

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
        <CustomInput type='number' value={purchasingCost} setValue={setPurchasingCost}>
          <SetTooltip targetId='profitability-purchasing-cost' defaultTarget>
            Cost in RLT of the new acquisition
          </SetTooltip>
          Purchasing cost
        </CustomInput>
        <CustomInput type='power' value={purchasingPower} setValue={setPurchasingPower}>
          <SetTooltip targetId='profitability-purchasing-power' defaultTarget>
            Mining power of the new acquisition
          </SetTooltip>
          Purchasing power
        </CustomInput>
        <CustomInput type='number' value={purchasingBonus} setValue={setPurchasingBonus}>
          <SetTooltip targetId='profitability-purchasing-bonus' defaultTarget>
            Bonus of the new acquisition
          </SetTooltip>
          Purchasing bonus
        </CustomInput>
      </section>
    </article>
  )
}

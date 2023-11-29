import { useState, useEffect, type FormEvent } from 'react'
import { customApiFetch, getStorageData, updateStorageData } from '@/utils/servicestools'
import type { BaseData, CurrenciesConfig, Currency, DateAndValue, ProfitStorageData } from '@/typestools'
import useProfit from '@/hooks/use-profittools'
import SwitchPower from './switch-power'
import CustomInput from '../shared/custom-input'
import CurrencySelector from './currency-selector'
import CustomButton from '../shared/custom-button'
import SetTooltip from '../shared/set-tooltip'

export default function Form () {
  const { setProfitData } = useProfit()
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [currency, setCurrency] = useState<Currency>()

  const [assignedPower, setAssignedPower] = useState<number>()
  const [networkPower, setNetworkPower] = useState<number>()
  const [blockReward, setBlockReward] = useState<number>()
  const [blockTime, setBlockTime] = useState<number>()

  const [addPower, setAddPower] = useState(() => {
    const profitStorageData = getStorageData<ProfitStorageData>('profit')

    if (profitStorageData?.additionPower === undefined) return false
    return profitStorageData?.additionPower
  })
  const [buttonStatus, setButtonStatus] = useState<'locked' | 'pressed' | 'available'>('locked')

  useEffect(() => {
    const profitStorageData = getStorageData<ProfitStorageData>('profit')
    if (profitStorageData !== null) setAssignedPower(profitStorageData.assignedPower)

    customApiFetch<BaseData<CurrenciesConfig>>('currencies').then((data) => {
      if (typeof data.data === 'object') {
        const theyCanBeMined = data.data.currencies_config.filter(f => f.is_can_be_mined).sort((a, b) => a.position - b.position)
        const previousCurrency = theyCanBeMined.find(f => f.balance_key === profitStorageData?.currencySelectedKey)

        setCurrencies(theyCanBeMined)

        if (previousCurrency !== undefined) {
          setCurrency(previousCurrency)
        } else {
          setCurrency(theyCanBeMined[0])
        }
      }
    }).catch(e => { console.error(e) })
  }, [])

  useEffect(() => {
    if (currency !== undefined) {
      customApiFetch<BaseData<DateAndValue>>(`currency/power?currency=${currency.balance_key}`).then(data => {
        if (data.success) setNetworkPower(data.data.value)
      })

      customApiFetch<BaseData<DateAndValue>>(`currency/block/reward?currency=${currency.balance_key}`).then(data => {
        if (data.success) {
          setBlockReward(data.data.value / currency.to_small)
        }
      })

      customApiFetch<BaseData<DateAndValue>>(`currency/block/duration?currency=${currency.balance_key}`).then(data => {
        if (data.success) setBlockTime(data.data.value)
      })
    }
  }, [currency])

  const notUndefined = assignedPower !== undefined && networkPower !== undefined && blockTime !== undefined && blockReward !== undefined

  useEffect(() => {
    if (notUndefined) {
      if (buttonStatus !== 'available') setButtonStatus('available')
      updateStorageData<ProfitStorageData>('profit', {
        assignedPower,
        additionPower: addPower
      })
    } else if (buttonStatus !== 'locked') setButtonStatus('locked')
  }, [assignedPower, networkPower, blockTime, blockReward, currency, addPower])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (notUndefined) {
      const powerPercentage = (assignedPower * 100) / (addPower ? networkPower + assignedPower : networkPower)
      const rewarAmount = (powerPercentage / 100) * blockReward

      setProfitData({
        currency,
        blockTime,
        currencyReward: rewarAmount
      })
      setButtonStatus('pressed')
    }
  }

  return (
    <form onSubmit={onSubmit} className='flex items-center flex-col gap-y-3 p-4 max-w-[400px] rounded-lg shadow-xl border border-slate-700/90 bg-slate-800'>
      <section className='flex w-full gap-x-3'>
        <CurrencySelector currency={currency} setCurrency={setCurrency} currencies={currencies} />
        <SwitchPower {...{ addPower, setAddPower }} />
      </section>

      <CustomInput type='power' value={assignedPower} setValue={setAssignedPower}>
        <SetTooltip defaultTarget targetId='profit-power-asigned' direction='right'>
          Mining power allocated to the currency
        </SetTooltip>
        <p>Power to the currency</p>
      </CustomInput>
      <CustomInput type='power' value={networkPower} setValue={setNetworkPower}>
        <SetTooltip defaultTarget targetId='profit-network-power'>
          Mining network power of the currency
        </SetTooltip>
        <p>Network power</p>
      </CustomInput>
      <section className='flex w-full gap-x-4'>
        <CustomInput type='number' value={blockReward} setValue={setBlockReward}>
          <SetTooltip defaultTarget targetId='profit-block-reward' direction='left' maxWidth={200}>
            Amount of reward coins per block
          </SetTooltip>
          <p>Reward per block</p>
        </CustomInput>
        <CustomInput type='number' value={blockTime} setValue={setBlockTime}>
          <SetTooltip defaultTarget targetId='profit-block-time' direction='bottom'>
            Time interval between each block reward
          </SetTooltip>
          <p>Block time</p>
        </CustomInput>
      </section>

      <CustomButton buttonStatus={buttonStatus}>
        Calculate
      </CustomButton>
    </form>
  )
}

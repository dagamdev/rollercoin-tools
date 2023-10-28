import { useState, useEffect, type FormEvent } from 'react'
import { customApiFetch, getStorageData, updateStorageData } from '@/utils/servicestools'
import type { BaseData, CurrenciesConfig, Currency, DateAndValue } from '@/typestools'
import useProfit from '@/hooks/use-profittools'
import SwitchPower from './switch-power'
import CustomInput from './custom-input'
import CurrencySelector from './currency-selector'

export default function Form () {
  const { setProfitData } = useProfit()
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [currency, setCurrency] = useState<Currency>()

  const [assignedPower, setAssignedPower] = useState<number>()
  const [networkPower, setNetworkPower] = useState<number>()
  const [blockReward, setBlockReward] = useState<number>()
  const [blockTime, setBlockTime] = useState<number>()

  const [addPower, setAddPower] = useState(false)
  const [buttonStatus, setButtonStatus] = useState<'locked' | 'pressed' | 'available'>('locked')

  useEffect(() => {
    const assignedPowerByStorage = getStorageData('asigned_power')
    if (assignedPowerByStorage !== null) setAssignedPower(parseFloat(assignedPowerByStorage))

    customApiFetch<BaseData<CurrenciesConfig>>('currencies').then((data) => {
      if (typeof data.data === 'object') {
        const theyCanBeMined = data.data.currencies_config.filter(f => f.is_can_be_mined).sort((a, b) => a.position - b.position)
        const previousCurrency = theyCanBeMined.find(f => f.balance_key === getStorageData('currency_selected'))

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
      updateStorageData('asigned_power', assignedPower)
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

      <CustomInput type='power' value={assignedPower} setValue={setAssignedPower} text='Power to the currency' />
      <CustomInput type='power' value={networkPower} setValue={setNetworkPower} text='Network power' />
      <section className='flex w-full gap-x-4'>
        <CustomInput type='number' value={blockReward} setValue={setBlockReward} text='Reward per block' />
        <CustomInput type='number' value={blockTime} setValue={setBlockTime} text='Block time' />
      </section>

      <button className={`key ${buttonStatus} rounded-lg w-full` + (buttonStatus === 'locked'
        ? ' cursor-not-allowed bg-slate-700'
        : buttonStatus === 'pressed'
          ? ' cursor-not-allowed hover:brightness-110 bg-yellow-600'
          : ' hover:brightness-110 bg-yellow-600'
      )}
        disabled={buttonStatus === 'locked'}
      >
        <strong className={'block p-2 rounded-lg border' + (buttonStatus === 'locked'
          ? ' border-gray-500 bg-gray-600'
          : ' text-gray-900 border-yellow-400 bg-yellow-500'
        )}
        >Calculate</strong>
        <span className='block w-full h-[8px] rounded-b-lg'></span>
      </button>
    </form>
  )
}

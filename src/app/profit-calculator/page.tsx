'use client'

import { useRef, useState, useEffect, type FormEvent } from 'react'
import type { BaseData, CurrenciesConfig, Currency, DateAndValue, PowerUnits } from '@/typestools'
import { POWER_UNITS } from '@/utils/configtools'
import CustomInput from '@/components/calculator/custom-inputtools'
import { customApiFetch } from '@/utils/servicestools'

export default function ProfitCalculatorPage () {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [currency, setCurrency] = useState<Currency>()

  const [currencyPower, setCurrencyPower] = useState<number>()
  const [networkCurrencyPower, setNextworkCurrencyPower] = useState<number>()
  const [blockReward, setBlockReward] = useState<number>()
  const [blockTime, setBlockTime] = useState<number>()

  useEffect(() => {
    customApiFetch<BaseData<CurrenciesConfig>>('currencies').then((data) => {
      // console.log(data)

      if (typeof data.data === 'object') {
        const theyCanBeMined = data.data.currencies_config.filter(f => f.is_can_be_mined).sort((a, b) => a.position - b.position)
        setCurrencies(theyCanBeMined)
        setCurrency(theyCanBeMined[0])
      }
    }).catch(e => { console.error(e) })
  }, [])

  useEffect(() => {
    if (currency !== undefined) {
      customApiFetch<BaseData<DateAndValue>>(`currency/power?currency=${currency.balance_key}`).then(data => {
        if (data.success) setNextworkCurrencyPower(data.data.value)
      })

      customApiFetch<BaseData<DateAndValue>>(`currency/block/reward?currency=${currency.balance_key}`).then(data => {
        if (data.success) {
          console.log(data.data, data.data.value / 10000000000)
          setBlockReward(data.data.value / 10000000000)
        }
      })

      customApiFetch<BaseData<DateAndValue>>(`currency/block/duration?currency=${currency.balance_key}`).then(data => {
        if (data.success) setBlockTime(data.data.value)
      })
    }
  }, [currency])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(e.currentTarget.power.value, e.currentTarget.myUnits.value)
  }

  return (
    <>
      <h1 className='font-bold text-4xl'>Profit calculator</h1>

      <form onSubmit={onSubmit} className='p-5 rounded-lg shadow-lg bg-slate-800'>
        <header>
          <strong>{currency?.fullname}</strong>
          <p>
            <strong>NetWork power:</strong> {networkCurrencyPower}
          </p>
        </header>

        {currencyPower}

        <section>
          <p>Select currency</p>
          <div>
            <div>
              {currency !== undefined && <>
                <img src={'api/currency/img'} alt={`Currency ${currency.name} icon`} />
                <strong>{currency.name}</strong>
              </>}
            </div>
            <ul>{currencies.map(c => <li key={c.balance_key}>
              <img src={`https://rollercoin.com/static/img/icon/currencies/${c.img}.svg?v=1.11`} alt={`Currency ${c.name} icon`} />
              <span>{c.name}</span>
            </li>)}</ul>
          </div>
        </section>

        <CustomInput type='power' setValue={setCurrencyPower} text='Power to the currency' />
        <CustomInput type='power' value={networkCurrencyPower} setValue={setNextworkCurrencyPower} text='Network power' />
        <CustomInput type='number' value={blockReward} setValue={setBlockReward} text='Block reward' />
        <CustomInput type='number' value={blockTime} setValue={setBlockTime} text='Block time' />

        <button className='p-2 mt-2 rounded-md w-full bg-slate-600'>Calculate</button>
      </form>
    </>
  )
}

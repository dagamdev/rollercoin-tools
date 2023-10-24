import useCalculator from '@/hooks/use-calculatortools'
import { customApiFetch } from '@/utils/servicestools'
import { useState, useEffect } from 'react'

export default function TableRow ({ rowData }: {
  rowData: {
    name: string
    value: number
  }
}) {
  const { currency, currencyReward, blockTime } = useCalculator()
  const [reward, setReward] = useState(0)
  const [USDTReward, setUSDTReward] = useState(0)

  useEffect(() => {
    if (currencyReward !== 0) {
      const division = rowData.value / blockTime
      setReward((division === 0 ? 1 : division) * currencyReward)
    }
  }, [currencyReward, blockTime])

  useEffect(() => {
    if (currency !== undefined && ['RLT', 'RST'].every(e => e !== currency.name)) {
      console.log({ reward: reward.toFixed(6) })
      customApiFetch<{
        success: boolean
        error: string
        value: number
      }>(`currency/convert/${currency.code}/usdt/${reward.toFixed(6)}`).then(data => {
        if (data.success) {
          console.log(currency.code, data)
          setUSDTReward(data.value)
        }
      })
    } else if (USDTReward !== 0) setUSDTReward(0)
  }, [currency, reward])

  return (
    <tr>
      <td className='border px-3 py-2 text-left'>{rowData.name}</td>
      <td className='border px-3 py-2 text-left'>{reward.toFixed(6)}</td>
      <td className='border px-3 py-2 text-left'>{USDTReward}</td>
    </tr>
  )
}

import useCalculator from '@/hooks/use-profittools'
import { useState, useEffect } from 'react'

export default function TableRow ({ rowData, USDValue }: {
  rowData: {
    name: string
    value: number
  }
  USDValue: number
}) {
  const { currencyReward, blockTime } = useCalculator()
  const [reward, setReward] = useState(0)
  const [USDTReward, setUSDTReward] = useState(0)

  useEffect(() => {
    if (currencyReward !== 0) {
      const division = rowData.value / blockTime
      setReward((division === 0 ? 1 : division) * currencyReward)
    }
  }, [currencyReward, blockTime])

  useEffect(() => {
    setUSDTReward(parseFloat((USDValue * reward).toFixed(6)))
  }, [USDValue, reward])

  return (
    <tr>
      <td className='px-3 py-2 text-left font-semibold border border-gray-600'>{rowData.name}</td>
      <td className='arcana-text px-3 py-2 text-end border border-gray-600'>{parseFloat(reward.toFixed(6))}</td>
      <td className='arcana-text px-3 py-2 text-end border border-gray-600'>{USDTReward}</td>
    </tr>
  )
}

import { useState, useEffect } from 'react'
import useProfit from '@/hooks/use-profittools'
import TableRow from './table-row'
import { customApiFetch } from '@/utils/servicestools'

const REWARDS_ROWS = [
  {
    name: 'Block',
    value: 0
  },
  {
    name: 'Hourly',
    value: 60 * 60
  },
  {
    name: 'Daily',
    value: 24 * 60 * 60
  },
  {
    name: 'Weekly',
    value: 7 * 24 * 60 * 60
  },
  {
    name: 'Monthly',
    value: 30 * 24 * 60 * 60
  }
]

export default function Table () {
  const { currency } = useProfit()
  const [USDValue, setUSDValue] = useState(0)

  useEffect(() => {
    if (currency !== undefined && ['RLT', 'RST'].every(e => e !== currency.name)) {
      customApiFetch<{
        success: boolean
        error: string
        value: number
      }>(`currency/convert/${currency.code}`).then(data => {
        if (data.success) {
          setUSDValue(data.value)
        }
      })
    } else {
      setUSDValue(0)
    }
  }, [currency])

  return (
    <section className='p-4 rounded-lg shadow-lg border border-slate-700 bg-slate-800'>
      <h2 className='text-xl font-bold mb-3'>Results table</h2>

      <table className='rounded-md border-collapse bg-gray-900'>
        <thead>
          <tr className='border border-gray-600 bg-gray-800'>
            <th className='px-3 py-2 text-left'>By</th>
            <th className='px-3 py-2 text-left'>Reward</th>
            <th className='px-3 py-2 text-left'>USD</th>
          </tr>
        </thead>
        <tbody>
          {REWARDS_ROWS.map(rr => <TableRow key={rr.name} rowData={rr} USDValue={USDValue} />)}
        </tbody>
      </table>
    </section>
  )
}

import useCalculator from '@/hooks/use-calculatortools'
import TableRow from './table-row'

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
  const { blockReward, blockTime } = useCalculator()

  return (
    <section className='p-4 rounded-lg shadow-lg border border-slate-700 bg-slate-800'>
      <h2>Results table</h2>

      <table className='border-collapse'>
        <thead>
          <tr>
            <th className='border px-3 py-2 text-left'>Reward by</th>
            <th className='border px-3 py-2 text-left'>Reward</th>
            <th className='border px-3 py-2 text-left'>USDT</th>
          </tr>
        </thead>
        <tbody>
          {REWARDS_ROWS.map(rr => <TableRow key={rr.name} rowData={rr} {...{ blockReward, blockTime }} />)}
        </tbody>
      </table>
    </section>
  )
}

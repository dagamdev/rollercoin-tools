import { formatPowerAmount } from '@/utils/servicestools'

export default function MetricDisplay ({ amount, font, type, children }: {
  amount: number
  font?: 'bold' | 'italics'
  type?: 'power' | 'percentage'
  children: React.ReactNode
}) {
  const metricValue = type === undefined ? amount : type === 'power' ? formatPowerAmount(amount) : `${amount}%`

  return (
    <p className='flex gap-x-4 justify-between'>
      <span>{children}</span>
      {font === undefined
        ? <span>
        {metricValue}
      </span>
        : font === 'bold'
          ? <strong>
            {metricValue}
        </strong>
          : <i>
            {metricValue}
        </i>}
    </p>
  )
}

'use client'

import useTooltips from '@/hooks/use-tooltipstools'
import Tooltip from './tooltip'

export default function Client () {
  const { tooltips } = useTooltips()

  return (
    <>
      {tooltips.map(t => <Tooltip key={t.id} tooltip={t} />)}
    </>
  )
}

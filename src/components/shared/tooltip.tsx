'use client'

import type { Tooltip as TooltipData } from '@/typestools'

export default function Tooltip ({ tooltip }: {
  tooltip: TooltipData
}) {
  // const top =

  return (
    <div className='p-2 absolute z-50 shadow-md pointer-events-none bg-slate-400' style={{ top: tooltip.position.y, left: tooltip.position.x }}>
      {tooltip.content}
    </div>
  )
}

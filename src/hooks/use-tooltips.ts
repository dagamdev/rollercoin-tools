import { useContext } from 'react'
import { TooltipsContext, type TooltipsContextData } from '@/contexts/tooltips-contexttools'
import type { Tooltip } from '@/typestools'

export default function useTooltips () {
  const { tooltips, setTooltips, windowMargin, targetMargin } = useContext(TooltipsContext) as TooltipsContextData

  const removeTooltip = (id: string) => {
    setTooltips(ts => ts.filter(f => f.id !== id))
  }

  return {
    tooltips,
    addTooltip (tooltipData: Tooltip) {
      setTooltips(ts => [...ts, tooltipData])
    },
    removeTooltip,
    windowMargin,
    targetMargin
  }
}

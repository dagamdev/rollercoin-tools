'use client'

import { useState } from 'react'
import { TooltipsContext } from '@/contexts/tooltips-contexttools'
import type { Tooltip } from '@/typestools'

export default function TooltipsProvider ({ children, windowMargin, targetMargin }: {
  children: React.ReactNode
  windowMargin?: number
  targetMargin?: number
}) {
  const [tooltips, setTooltips] = useState<Tooltip[]>([])

  return (
    <TooltipsContext.Provider value={{
      tooltips,
      setTooltips,
      windowMargin: windowMargin ?? 10,
      targetMargin: targetMargin ?? 10
    }}>
      {children}
    </TooltipsContext.Provider>
  )
}

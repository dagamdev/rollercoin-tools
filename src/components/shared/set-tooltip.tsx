'use client'

import { useState, useEffect, type ReactNode } from 'react'
import useTooltips from '@/hooks/use-tooltipstools'
import { FaInfoCircle } from 'react-icons/fa'
import type { Directions } from '@/typestools'

export default function SetTooltip ({ targetId, direction, children, maxWidth, defaultTarget }: {
  targetId: string
  children?: ReactNode
  maxWidth?: number
  direction?: Directions
  defaultTarget?: boolean
}) {
  const { addTooltip, removeTooltip } = useTooltips()
  const [defaultElement, setDefaultElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const target = document.getElementById(targetId) ?? defaultElement

    if (target !== null) {
      const handleMouseenter = (e: MouseEvent) => {
        if (e.currentTarget instanceof HTMLElement) {
          const rect = e.currentTarget.getBoundingClientRect()

          addTooltip({
            id: targetId,
            content: children,
            target: {
              y: e.currentTarget.offsetTop + rect.height / 2,
              x: e.currentTarget.offsetLeft + rect.width / 2,
              height: rect.height,
              width: rect.width
            },
            maxWidth: maxWidth ?? 300,
            direction: direction ?? 'top'
          })
        }
      }

      const handleMouseleave = () => {
        removeTooltip(targetId)
      }

      target.addEventListener('mouseenter', handleMouseenter)
      target.addEventListener('mouseleave', handleMouseleave)

      return () => {
        target.removeEventListener('mouseenter', handleMouseenter)
        target.removeEventListener('mouseleave', handleMouseleave)
      }
    }
  }, [targetId, defaultElement])

  return defaultTarget === true ? <span id={targetId}><FaInfoCircle ref={setDefaultElement} /></span> : <></>
}

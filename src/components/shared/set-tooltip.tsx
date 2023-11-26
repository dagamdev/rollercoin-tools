'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import useTooltips from '@/hooks/use-tooltipstools'

export default function SetTooltip ({ targetId, direction, children }: {
  targetId: string
  direction?: 'top' | 'button' | 'right' | 'left'
  children?: ReactNode
}) {
  const { addTooltip, removeTooltip } = useTooltips()

  useEffect(() => {
    const target = document.getElementById(targetId)

    if (target !== null) {
      console.log('not is null')
      const rect = target.getBoundingClientRect()
      const id = crypto.randomUUID()

      console.log(rect.top, rect.left)
      console.log(rect.height, rect.width)
      console.log({
        y: rect.top + rect.height / 2,
        x: rect.left + rect.width / 2
      })

      const handleMouseenter = () => {
        console.log('mouse enter')
        addTooltip({
          id,
          content: children,
          position: {
            y: rect.top + rect.height / 2,
            x: rect.left + rect.width / 2
          }
        })
      }

      const handleMouseleave = () => {
        removeTooltip(id)
      }

      target.addEventListener('mouseenter', handleMouseenter)
      target.addEventListener('mouseleave', handleMouseleave)

      return () => {
        target.removeEventListener('mouseenter', handleMouseenter)
        target.removeEventListener('mouseleave', handleMouseleave)
      }
    }
  }, [])

  return null
}

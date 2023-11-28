'use client'

import { useState, useEffect } from 'react'
import type { Directions, Tooltip as TooltipData } from '@/typestools'
import useTooltips from '@/hooks/use-tooltipstools'

export default function Tooltip ({ tooltip }: {
  tooltip: TooltipData
}) {
  const { windowMargin, targetMargin } = useTooltips()
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const [{ top, left, arrowPosition, arrowDirection }, setTooltipCalculations] = useState({
    top: 0,
    left: 0,
    arrowPosition: 0,
    arrowDirection: 'top'
  })

  useEffect(() => {
    if (element !== null) {
      let top = 0
      let left = 0
      let arrowPosition = 0
      let arrowDirection: Directions = 'top'

      const { target, direction } = tooltip
      const rect = element.getBoundingClientRect()
      const halfTH = target.height / 2
      const halfTW = target.width / 2
      const definitiveTM = targetMargin + 12

      if (direction === 'top') {
        top = target.y - halfTH - definitiveTM - rect.height
        left = target.x - rect.width / 2
        arrowDirection = 'bottom'
      }

      if (direction === 'bottom') {
        top = target.y + halfTH + definitiveTM
        left = target.x - rect.width / 2
        arrowDirection = 'top'
      }

      if (direction === 'left') {
        top = target.y - rect.height / 2
        left = target.x - halfTW - definitiveTM - rect.width
        arrowDirection = 'right'
      }

      if (direction === 'right') {
        top = target.y - rect.height / 2
        left = target.x + halfTW + definitiveTM
        arrowDirection = 'left'
      }

      //* Arreglar pocicion del tooltip en caso de sobre salir de la ventana
      if (top - window.scrollY < windowMargin) {
        if (direction === 'top') {
          top = target.y + halfTH + definitiveTM
          arrowDirection = 'top'
        }
        if (direction === 'left' || direction === 'right') top = window.scrollY + windowMargin
      }

      if (left - window.scrollX < windowMargin) {
        if (direction === 'left') {
          left = target.x + halfTW + definitiveTM
          arrowDirection = 'left'
        }
        if (direction === 'top' || direction === 'bottom') left = window.scrollX + windowMargin
      }

      if (top + rect.height - window.scrollY > window.innerHeight - windowMargin) {
        if (direction === 'bottom') {
          top = target.y - halfTH - definitiveTM - rect.height
          arrowDirection = 'bottom'
        }
        if (direction === 'left' || direction === 'right') top = window.scrollY + window.innerHeight - rect.height - windowMargin
      }

      if (left + rect.width - window.scrollX > window.innerWidth - windowMargin) {
        if (direction === 'right') {
          left = target.x - halfTW - definitiveTM - rect.width
          arrowDirection = 'right'
        }
        if (direction === 'top' || direction === 'bottom') {
          console.log('ha', window.scrollX + window.innerWidth, rect.width + windowMargin, window.scrollX + window.innerWidth - rect.width - windowMargin)
          left = window.scrollX + window.innerWidth - rect.width - windowMargin
        }
      }

      //* Pocicion de la flecha
      if (direction === 'top' || direction === 'bottom') arrowPosition = target.x - left

      if (direction === 'left' || direction === 'right') arrowPosition = target.y - top

      console.log({
        arrowPosition,
        height: rect.height,
        width: rect.width
      })

      setTooltipCalculations({
        top,
        left,
        arrowPosition,
        arrowDirection
      })
    }
  }, [windowMargin, targetMargin, element])

  const vertical = ['left', 'right'].some(s => arrowDirection === s)
  const horizontal = ['top', 'bottom'].some(s => arrowDirection === s)

  return (
    <div className={'text-sm py-2 px-4 absolute z-50 shadow-lg shadow-slate-950/40 rounded-md pointer-events-none bg-gray-950' + ((top !== 0 || left !== 0)
      ? ''
      : ' invisible'
    )}
      ref={setElement} style={{ top, left, maxWidth: tooltip.maxWidth }}
    >
      {tooltip.content}
      <div className={'absolute' + (arrowDirection === 'top'
        ? ' top-0 -translate-y-full'
        : arrowDirection === 'left'
          ? ' left-0 -translate-x-full'
          : arrowDirection === 'bottom'
            ? ' bottom-0 translate-y-full'
            : ' right-0 translate-x-full'
      ) + (vertical
        ? ' -translate-y-1/2'
        : ' -translate-x-1/2'
      )}
        style={{
          top: vertical ? arrowPosition : undefined,
          left: horizontal ? arrowPosition : undefined
          // filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.40))'
        }}
      >
        <div className='w-[12px] h-[12px] bg-gray-950'
          style={{
            clipPath: arrowDirection === 'top'
              ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
              : arrowDirection === 'left'
                ? 'polygon(0% 50%, 100% 0%, 100% 100%)'
                : arrowDirection === 'right'
                  ? 'polygon(0% 0%, 100% 50%, 0% 100%)'
                  : 'polygon(0% 0%, 100% 0%, 50% 100%)'
          }}
        />
      </div>
    </div>
  )
}

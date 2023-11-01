import React from 'react'
import type { ButtonStates } from '@/typestools'

export default function CustomButton ({ buttonStatus, onClick, children }: {
  buttonStatus: ButtonStates
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button className={`key ${buttonStatus} rounded-lg w-full max-w-md` + (buttonStatus === 'locked'
      ? ' cursor-not-allowed bg-slate-700'
      : buttonStatus === 'pressed'
        ? ' bg-yellow-600'
        : ' hover:brightness-110 bg-yellow-600'
    )}
      disabled={buttonStatus !== 'available'}
      onClick={onClick}
    >
      <strong className={'block py-2 px-4 rounded-lg border' + (buttonStatus === 'locked'
        ? ' border-gray-500 bg-gray-600'
        : ' text-gray-900 border-yellow-400 bg-yellow-500'
      )}
      >
        {children}
      </strong>
      <span className='block w-full h-[8px] rounded-b-lg'></span>
    </button>
  )
}

'use client'

import '../styles/header.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoHome } from 'react-icons/io5'
import { BsCalculatorFill } from 'react-icons/bs'

const PAGES_PATHS = [
  {
    path: '/',
    icon: <IoHome />
  },
  {
    path: '/profit-calculator',
    icon: <BsCalculatorFill />
  }
]

export default function Header () {
  const pathName = usePathname()

  return (
    <header className='flex justify-center p-5 shadow-lg bg-slate-800'>
      <nav>
        <ul className='flex items-end gap-4'>
          {PAGES_PATHS.map(pp => <li className=''
            key={pp.path}
          >
            <Link className={`key-button ${pathName === pp.path ? 'pressed ' : ''}flex flex-col mb-[4px] rounded-md bg-amber-600`}
              href={pp.path}
            >
              <span className='flex py-2 px-4 rounded-md text-3xl border bg-amber-500 border-amber-400'>{pp.icon}</span>
              <div className='h-[8px] rounded-b-md' />
            </Link>
          </li>)}
        </ul>
      </nav>
    </header>
  )
}

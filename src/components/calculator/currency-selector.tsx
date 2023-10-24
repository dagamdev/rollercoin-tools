import { useRef, useState, useEffect } from 'react'
import type { Currency, StateFunction } from '@/typestools'
import { MdArrowBackIos } from 'react-icons/md'

export default function CurrencySelector ({ currency, setCurrency, currencies }: {
  currency?: Currency
  setCurrency: StateFunction<Currency | undefined>
  currencies: Currency[]
}) {
  const currenciesListRef = useRef<HTMLUListElement | null>(null)
  const currenciesListContainerRef = useRef<HTMLDivElement | null>(null)
  const [openCurrencySelector, setOpenCurrencySelector] = useState(false)

  useEffect(() => {
    if (currenciesListRef.current !== null && currenciesListContainerRef.current !== null) {
      currenciesListContainerRef.current.style.height = openCurrencySelector ? currenciesListRef.current.clientHeight + 'px' : ''
    }
  }, [openCurrencySelector])

  return (
    <section className='w-full'>
      <p>Select currency</p>

      <div className={`currency-selector ${openCurrencySelector ? 'open-selector ' : ''}relative`}>
        <div className={'selected-currency flex relative items-center z-10 py-2 px-3 min-h-[40px] cursor-pointer justify-between rounded-md border border-gray-700 bg-gray-900' + (openCurrencySelector
          ? ' rounded-b-none'
          : ''
        )} onClick={() => { setOpenCurrencySelector(oc => !oc) }}>
          {currency !== undefined && <>
            <div className='flex items-center gap-2'>
              <img src={`api/currency/img/wallet/${currency.img}.svg`} alt={`Currency ${currency.name} icon`} width={25} height={25} />
              <strong>{currency.name}</strong>
            </div>
            <MdArrowBackIos className='arrow-back' />
          </>}
        </div>
        <div className='currencies-list top-full w-full absolute rounded-b-md overflow-hidden border-x border-gray-700 bg-gray-900'
          ref={currenciesListContainerRef}
        >
          <ul
            ref={currenciesListRef}
          >
          {currencies.map(c => {
            const handleClick = () => {
              setOpenCurrencySelector(false)
              setCurrency(c)
            }

            return (<li className={'flex py-2 px-3 gap-x-2 cursor-pointer hover:bg-gray-500/50' + (c.balance_key === currency?.balance_key
              ? ' bg-gray-600'
              : ''
            )}
              key={c.balance_key}
              onClick={handleClick}
            >
              <img src={`api/currency/img/wallet/${c.img}.svg`} alt={`Currency ${c.name} icon`} width={25} height={25} />
              <span>{c.name}</span>
            </li>)
          })}
          </ul>
        </div>
      </div>
    </section>
  )
}

import { useId, useState, useEffect, type ChangeEvent } from 'react'
import UnitSelector from '../profit/unit-selector'
import { POWER_UNITS, type PowerUnits } from '@/utils/configtools'
import type { StateFunction } from '@/typestools'

export default function CustomInput ({ type, value, setValue, children }: {
  type: 'number' | 'power'
  value?: number
  setValue: StateFunction<number | undefined>
  children: React.ReactNode
}) {
  const inputId = useId()
  const [powerUnit, setPowerUnit] = useState<PowerUnits>('Th')
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (value !== undefined) {
      if (type === 'power') {
        const valueLength = value.toString().length

        for (const key in POWER_UNITS) {
          const difference = valueLength - POWER_UNITS[key as PowerUnits].toString().length
          if (difference >= 0 && difference <= 2) {
            setPowerUnit(key as PowerUnits)
            setInputValue((value / POWER_UNITS[key as PowerUnits]).toString())
          }
        }
      } else {
        setInputValue(value.toString())
      }
    }
  }, [value])

  useEffect(() => {
    if (type === 'power') {
      setValue(inputValue.length === 0 ? undefined : parseFloat(inputValue) * POWER_UNITS[powerUnit])
    } else {
      setValue(inputValue.length === 0 ? undefined : parseFloat(inputValue))
    }
  }, [powerUnit, inputValue])

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value)
  }

  return (
    <label className='flex w-full flex-col' htmlFor={inputId}>
      <p className='flex gap-1 items-center'>
        {children}
      </p>
      {type === 'power'
        ? <section className='flex mt-1 w-full rounded-md border border-gray-700 bg-gray-900'>
            <input className='arcana-text px-3 w-full py-2 outline-none bg-transparent'
              onChange={handleChange}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
                writingMode: 'horizontal-tb'
              }} id={inputId} name='power' type="number" value={inputValue} defaultValue={value}
            />
          <UnitSelector selectValue={powerUnit} setSelectValue={setPowerUnit} />
        </section>
        : <input className='arcana-text flex w-full mt-1 px-3 py-2 outline-none rounded-md border border-gray-700 bg-gray-900'
          onChange={handleChange}
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
            writingMode: 'horizontal-tb'
          }} id={inputId} name='power' type="number" value={inputValue} defaultValue={value}
        />
      }
    </label>
  )
}

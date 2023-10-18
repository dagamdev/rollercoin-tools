import { useId, useState, useEffect, type ChangeEvent } from 'react'
import SelectUnit from './select-unit'
import { POWER_UNITS } from '@/utils/configtools'
import type { PowerUnits, StateFunction } from '@/typestools'

export default function CustomInput ({ type, text, value, setValue }: {
  type: 'number' | 'power'
  text: string
  value?: number
  setValue: StateFunction<number | undefined>
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
            console.log(key)
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
    setValue(inputValue.length === 0 ? undefined : parseFloat(inputValue) * POWER_UNITS[powerUnit])
  }, [powerUnit, inputValue])

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value)
  }

  return (
    <label className='flex flex-col my-4' htmlFor={inputId}>
      {text}
      <section className='mt-1 bg-gray-900'>
        <input className='px-3 py-2 outline-none border-none bg-transparent'
          onChange={handleChange}
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
            writingMode: 'horizontal-tb'
          }} id={inputId} name='power' type="number" value={inputValue} defaultValue={value} />
        {type === 'power' && <SelectUnit selectValue={powerUnit} setSelectValue={setPowerUnit} />}
      </section>
    </label>
  )
}

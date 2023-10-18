import { type ChangeEvent } from 'react'
import type { PowerUnits, StateFunction } from '@/typestools'

export default function SelectUnit ({ selectValue, setSelectValue }: {
  selectValue: string
  setSelectValue: StateFunction<PowerUnits>
}) {
  const handleChangeUnit = ({ currentTarget: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(value as PowerUnits)
  }

  return (
    <select className='p-2 bg-gray-900'
      onChange={handleChangeUnit} id="myUnits" value={selectValue}
    >
      <option value='Th'>Th/s</option>
      <option value='Ph'>Ph/s</option>
      <option value='Eh'>Eh/s</option>
      <option value='Zh'>Zh/s</option>
    </select>
  )
}

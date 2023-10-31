import { type ChangeEvent } from 'react'
import { type PowerUnits } from '@/utils/configtools'
import type { StateFunction } from '@/typestools'

export default function SelectUnit ({ selectValue, setSelectValue }: {
  selectValue: string
  setSelectValue: StateFunction<PowerUnits>
}) {
  const handleChangeUnit = ({ currentTarget: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(value as PowerUnits)
  }

  return (
    <select className='p-2 h-full rounded-none outline-none border-l cursor-pointer rounded-r-md border-l-gray-800  bg-gray-900'
      onChange={handleChangeUnit} id="myUnits" value={selectValue}
    >
      <option value='Th'>Th/s</option>
      <option value='Ph'>Ph/s</option>
      <option value='Eh'>Eh/s</option>
      <option value='Zh'>Zh/s</option>
    </select>
  )
}

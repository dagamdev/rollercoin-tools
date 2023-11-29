import SetTooltip from '../shared/set-tooltip'
import type { StateFunction } from '@/typestools'

export default function SwitchPower ({ addPower, setAddPower }: {
  addPower: boolean
  setAddPower: StateFunction<boolean>
}) {
  const handleClick = () => {
    setAddPower(ap => !ap)
  }

  return (
    <section className='flex flex-col'>
      <div className='flex gap-x-1 items-center'>
        <SetTooltip targetId='switch-power-info' defaultTarget direction='bottom'>
          When activating this option, your mining power will be added to the currency&apos;s network power when calculating earnings
        </SetTooltip>
        <p>Addition power</p>
      </div>
      <div className='flex flex-1 items-center'>
        <div className={'flex mt-1 w-[50px] rounded-xl border cursor-pointer relative border-gray-700 bg-gray-900'}
          onClick={handleClick}
        >
          <span className={'block h-[22px] w-[22px] rounded-full relative transition-all duration-300' + (addPower
            ? ' left-[26px] bg-green-500'
            : ' left-0 bg-gray-600'
          )}></span>
        </div>

      </div>
    </section>
  )
}

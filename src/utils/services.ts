import { POWER_UNITS, type PowerUnits } from './config'
import type { StorageKey } from '@/typestools'

export async function customApiFetch<Data=any> (path: string): Promise<Data> {
  return await fetch('api/' + path).then(res => res.json())
}

export function getStorageData<Data=string> (key: StorageKey): Data | null {
  const preData = localStorage.getItem(key)
  const data = preData === null ? null : JSON.parse(preData)

  if (typeof data !== 'object') {
    return null
  }

  return data
}

export function updateStorageData<Data=any> (key: StorageKey, newData: Data, type?: 'string' | 'object') {
  if (type === 'string') {
    localStorage.setItem(key, JSON.stringify(newData))
  } else {
    const data = getStorageData<Data>(key)

    localStorage.setItem(key, JSON.stringify({
      ...data,
      ...newData
    }))
  }
}

export function formatPowerAmount (power: number) {
  let formattedPowerAmount = '0 Gh/s'

  const powerLength = power.toFixed(0).length

  for (const unit in POWER_UNITS) {
    const unitValue = POWER_UNITS[unit as PowerUnits]
    const difference = powerLength - unitValue.toFixed(0).length

    if (difference >= 0 && difference <= 2) {
      const finalPower = power / unitValue
      formattedPowerAmount = `${finalPower === 0 ? 0 : finalPower.toFixed(3)} ${unit}/s`
    }
  }

  return formattedPowerAmount
}

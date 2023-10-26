import type { StorageKey } from '@/typestools'

export async function customApiFetch<Data=any> (path: string): Promise<Data> {
  return await fetch('api/' + path).then(res => res.json())
}

export function getStorageData (key: StorageKey) {
  return localStorage.getItem(key)
}

export function updateStorageData (key: StorageKey, newData: any) {
  localStorage.setItem(key, JSON.stringify(newData))
}

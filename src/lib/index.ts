export async function customFetch (path: string) {
  return await fetch(`${process.env.ROLLER_ENDPOINT}mining/${path}`)
}

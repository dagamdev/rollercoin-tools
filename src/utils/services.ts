export async function customApiFetch<Data=any> (path: string): Promise<Data> {
  return await fetch('api/' + path).then(res => res.json())
}

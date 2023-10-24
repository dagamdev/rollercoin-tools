import { customFetch } from '@/libtools'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function Me (req: NextApiRequest, res: NextApiResponse) {
  const promise = await customFetch('crowdfunding/tokens-discounts', true)
  const data = await promise.json()

  res.json(data)
}

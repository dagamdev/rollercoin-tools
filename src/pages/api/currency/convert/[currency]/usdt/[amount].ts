import { customFetch } from '@/libtools'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function ping (req: NextApiRequest, res: NextApiResponse) {
  const { currency, amount } = req.query

  if (typeof currency !== 'string' || typeof amount !== 'string') {
    res.json({
      message: 'The params is not string type',
      paramas: {
        currency: 'string (btc.svg)',
        amount: 'number'
      }
    })

    return
  }

  const promise = await customFetch(`crowdfunding/convert-currency/${currency}/usdt/${amount}`, true)
  const data = await promise.json()

  res.json(data)
}

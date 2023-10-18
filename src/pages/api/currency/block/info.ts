import { customFetch } from '@/libtools'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function CurrencyInfo (req: NextApiRequest, res: NextApiResponse) {
  const { currency } = req.query

  if (typeof currency !== 'string') {
    res.json({
      message: 'The queris is not string type',
      queris: {
        currency: 'string'
      }
    })

    return
  }

  const promise = await customFetch(`last-block-info-for-currency?currency=${currency}`)
  const data = await promise.json()

  res.json(data)
}

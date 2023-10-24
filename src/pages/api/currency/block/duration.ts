import { customFetch } from '@/libtools'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function CurrencyBlockDuration (req: NextApiRequest, res: NextApiResponse) {
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

  const nowTimeIso = new Date().toISOString()

  const promise = await customFetch(`mining/network-info-by-day?from=${nowTimeIso}&to=${nowTimeIso}&currency=${currency}&groupBy=duration`)
  const data = await promise.json()

  if (data.success === true) {
    res.json({
      ...data,
      data: data.data[0]
    })
    return
  }

  res.json(data)
}

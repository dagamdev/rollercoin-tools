import { customFetch } from '@/libtools'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function CurrencyImg (req: NextApiRequest, res: NextApiResponse) {
  const { currency } = req.query

  console.log({ currency })

  // if (typeof currency !== 'string') {
  //   res.json({
  //     message: 'The queris is not string type',
  //     queris: {
  //       currency: 'string'
  //     }
  //   })

  //   return
  // }

  const nowTimeIso = new Date().toISOString()

  const promise = await fetch('https://rollercoin.com/static/img/icon/currencies/ltc.svg?v=1.11')
  const data = await promise.text()

  res.setHeader('Content-Type', 'image/svg+xml').send(data)
}

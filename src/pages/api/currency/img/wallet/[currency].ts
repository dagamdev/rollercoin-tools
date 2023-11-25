import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function CurrencyWalletImg (req: NextApiRequest, res: NextApiResponse) {
  const { currency } = req.query

  if (typeof currency !== 'string') {
    res.json({
      message: 'The params is not string type',
      paramas: {
        currency: 'string (btc.svg)'
      }
    })

    return
  }

  if (!currency.includes('svg')) {
    res.json({
      message: 'The parameter does not contain the .svg extension'
    })
    return
  }

  const promise = await fetch(`${process.env.IMG_ENDPOINT}wallet/${currency}?v=1.12`)
  const data = await promise.text()

  res.setHeader('Content-Type', 'image/svg+xml').send(data)
}

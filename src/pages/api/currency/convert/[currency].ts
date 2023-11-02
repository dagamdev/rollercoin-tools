import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function ping (req: NextApiRequest, res: NextApiResponse) {
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

  const criptoEndpoint = process.env.CRIPTO_ENDPOINT
  if (typeof criptoEndpoint === 'string') {
    const promise = await fetch(`${criptoEndpoint}v2/cryptocurrency/quotes/latest?symbol=${currency}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CRIPTO_KEY + ''
      }
    })
    const data = await promise.json()

    if (data.status.error_code === 0) {
      res.json({
        erro: '',
        value: data.data[currency.toUpperCase()][0]?.quote?.USD?.price,
        success: true
      })
    } else {
      res.json({
        erro: 'Error',
        value: 0,
        success: false
      })
    }
  } else {
    res.json({
      erro: 'Endpoint undefined',
      value: 0,
      success: false
    })
  }
}

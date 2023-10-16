import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function Me (req: NextApiRequest, res: NextApiResponse) {
  const promise = await fetch('https://rollercoin.com/api/crowdfunding/tokens-discounts', {
    headers: {
      accept: 'application/json',
      'accept-language': 'es-ES,es;q=0.5',
      'content-type': 'application/json',
      'if-none-match': 'W/"1b8-fsL9wEpY7ibI6+ZoIHOY47nY7R0"',
      'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
      cookie: 'registered=1; user_id=650dc49d399846a25dd53ca4',
      Referer: 'https://rollercoin.com/game',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    body: null,
    method: 'GET'
  })

  const data = await promise.json()

  res.json(data)
}

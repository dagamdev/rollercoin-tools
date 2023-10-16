import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function ping (req: NextApiRequest, res: NextApiResponse) {
  const promise = await fetch('https://rollercoin.com/api/mining/network-info-by-day?from=2023-10-08&to=2023-10-15&currency=SAT&groupBy=total_power', {
    headers: {
      accept: 'application/json',
      'accept-language': 'es-ES,es;q=0.5',
      'content-type': 'application/json',
      'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
      cookie: 'registered=1; user_id=650dc49d399846a25dd53ca4',
      Referer: 'https://rollercoin.com/network-power',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    body: null,
    method: 'GET'
  })

  const data = await promise.json()

  res.json(data)
}

import { customFetch } from '@/libtools'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default async function Currencies (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      try {
        const promise = await customFetch('wallet/get-currencies-config')
        const data = await promise.json()

        res.json(data)
      } catch (error: any) {
        res.json({
          success: false,
          error: error.message
        })
      }
      break
    }

    default:
      res.json({
        message: 'Metod no allowed'
      })
      break
  }
}

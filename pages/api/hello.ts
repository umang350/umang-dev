// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import * as ga from '../../lib/ga'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const search = () => {
    ga.event({
      action: "api",
      params : {
        search_term: req
      }
    })
  }

  res.status(200).json({ name: 'John Doe' })
}

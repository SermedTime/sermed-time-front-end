import { useCallback, useEffect, useState } from 'react'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { fakeRequest, get } from '@/services/api/sermed-api/sermed-api'
import { removeEmptyEntries } from '@/utils/generic'

export interface IPayslips {
  month: string
  year: string
  type: string
  link: string
}

const fakePayslips: IPayslips[] = [
  {
    month: 'Janeiro',
    year: '2024',
    type: 'Pagamento',
    link: 'http://www.google.com.br'
  },
  {
    month: 'Janeiro',
    year: '2024',
    type: 'Vale',
    link: 'http://www.google.com.br'
  }
]

export function usePayslips(uuid?: string) {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IPayslips> | null>(null)

  const fetchData = useCallback(
    async (uuid: string, params: Record<string, any>) => {
      try {
        setResult(null)

        const queryParams = removeEmptyEntries({
          page: params?.page,
          records: params?.records
        })

        console.log(queryParams, uuid)

        // const { data } = await get(`/overview/payslips/${uuid}`, queryParams)

        await fakeRequest(2000)

        const data = {
          data: fakePayslips,
          page: params.page,
          total: 12
        }

        console.log(data)

        if (data) {
          setResult(data)
        } else {
          setResult({
            data: [],
            page: 1,
            total: 0
          })
        }
      } catch {
        setResult({
          data: [],
          page: 1,
          total: 0
        })
      }
    },
    []
  )

  function refetch() {
    uuid && params && fetchData(uuid, params)
  }

  useEffect(() => {
    params && uuid && fetchData(uuid, params)
  }, [uuid, fetchData, params])

  return { result, refetch, params, setParams }
}

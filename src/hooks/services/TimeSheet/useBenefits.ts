import { useCallback, useEffect, useState } from 'react'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { fakeRequest } from '@/services/api/sermed-api/sermed-api'
import { removeEmptyEntries } from '@/utils/generic'

export interface IBenefits {
  year: string
  type: string
  link: string
}

const fakeBenefits: IBenefits[] = [
  {
    year: '2024',
    type: 'Férias',
    link: 'http://www.google.com.br'
  },
  {
    year: '2023',
    type: '13º Parcela 1/2',
    link: 'http://www.google.com.br'
  },
  {
    year: '2023',
    type: '13º Parcela 2/2',
    link: 'http://www.google.com.br'
  }
]

export function useBenefits() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IBenefits> | null>(null)

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const queryParams = removeEmptyEntries({
        page: params?.page,
        records: params?.records,
        user_id: params?.user_id
      })

      console.log(queryParams)

      // const { data } = await get(`/overview/benefits/${params?.user_id}`, queryParams)

      await fakeRequest(2000)

      const data = {
        data: fakeBenefits,
        page: params.page,
        total: 12
      }

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
  }, [])

  function refetch() {
    params && fetchData(params)
  }

  useEffect(() => {
    params && fetchData(params)
  }, [fetchData, params])

  return { result, refetch, params, setParams }
}

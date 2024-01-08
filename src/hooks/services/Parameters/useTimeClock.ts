import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { removeEmptyEntries } from '@/utils/generic'
import { useCallback, useEffect, useState } from 'react'
import { get } from '@/services/api/sermed-api/sermed-api'

export interface ITimeClock {
  uuid: string
  name: string
  created_at: string
  status: string
}

export function useTimeClock() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<ITimeClock> | null>(null)

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const queryParams = removeEmptyEntries({
        search: params?.search,
        searchingBy: params?.searchingBy,
        records: params?.records,
        status: params?.status,
        order: params?.order,
        orderBy: params?.orderBy,
        page: params?.page
      })

      const { data } = await get('/parametrizations/time-clock', {
        params: queryParams
      })

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
  }, [params, fetchData])

  return { result, params, refetch, setParams }
}

import { useCallback, useEffect, useState } from 'react'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { removeEmptyEntries } from '@/utils/generic'
import { get } from '@/services/api/sermed-api/sermed-api'

export interface IWorkingDay {
  uuid: string
  workingDayName: string
  createdAt: string
  status: string
}

export function useWorkingDay() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IWorkingDay> | null>(null)

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const queryParams = removeEmptyEntries({
        search: params?.search,
        searchingBy: params?.searchingBy,
        records: params?.records,
        status: params?.status,
        order: params?.order,
        page: params?.page
      })

      const { data } = await get(
        '/parametrizations/management/working-day',
        queryParams
      )

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
  }, [])

  function refetch() {
    params && fetchData(params)
  }

  useEffect(() => {
    params && fetchData(params)
  }, [params, fetchData])

  return { result, params, refetch, setParams }
}

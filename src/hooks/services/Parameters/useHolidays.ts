import { useCallback, useEffect, useState } from 'react'

import { removeEmptyEntries } from '@/utils/generic'
import { get } from '@/services/api/sermed-api/sermed-api'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

export interface IHolidays {
  uuid: string
  name: string
  date: string
  state: string
  city: string
  holidayType: string
}

export function useHolidays() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IHolidays> | null>(null)

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const queryParams = removeEmptyEntries({
        search: params?.search,
        searchingBy: params?.searchingBy,
        records: params?.records,
        holidayType: params?.holidayType,
        state: params?.state,
        initialDate: params?.initialDate,
        finalDate: params?.finalDate,
        order: params?.order,
        page: params?.page
      })

      const { data } = await get(
        '/parametrizations/operational/holiday',
        queryParams
      )

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

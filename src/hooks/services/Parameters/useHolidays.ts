import { useCallback, useEffect, useState } from 'react'

import { removeEmptyEntries } from '@/utils/generic'
import { fakeRequest, get } from '@/services/api/sermed-api/sermed-api'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

export interface IHolidays {
  uuid: string
  name: string
  date: string
  status: string
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
        status: params?.status,
        holidayType: params?.holidayType,
        initialDate: params?.initialDate,
        finalDate: params?.finalDate,
        order: params?.order,
        orderBy: params?.orderBy,
        page: params?.page
      })

      // const { data } = await get(
      //   '/parametrizations/operational/holiday',
      //   queryParams
      // )

      const { data } = await fakeRequest(2000, {
        data: [
          {
            uuid: '1',
            name: 'Natal',
            date: '2021-12-25',
            status: 'active'
          },
          {
            uuid: '2',
            name: 'Ano Novo',
            date: '2021-01-01',
            status: 'active'
          }
        ],
        page: 1,
        total: 2
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

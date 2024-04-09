import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'
import { removeEmptyEntries } from '@/utils/generic'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

export interface IUnit {
  uuid: string
  unitName: string
  createdAt: string
  status: string
}

export function useUnits() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IUnit> | null>(null)

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

      const { data } = await get('/parametrizations/units', queryParams)

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

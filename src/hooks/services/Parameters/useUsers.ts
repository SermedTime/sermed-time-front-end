import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { removeEmptyEntries } from '@/utils/generic'
import { useCallback, useEffect, useState } from 'react'
import { get } from '@/services/api/sermed-api/sermed-api'

export interface IUsers {
  uuid: string
  name: string
  created_at: string
  status: string
  resignation_date: string
}

export function useUsers() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IUsers> | null>(null)

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
        page: params?.page,
        team: params?.team
      })

      const { data } = await get('/parametrizations/users', queryParams)

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

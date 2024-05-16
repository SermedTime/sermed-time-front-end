import { useCallback, useEffect, useState } from 'react'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { get } from '@/services/api/sermed-api/sermed-api'

export interface IUserPermissions {
  uuid: string
  permission_name: string
  permission_id: string
  is_writer: string
  created_at: string
}

export function useUserPermissions() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IUserPermissions> | null>(
    null
  )

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const queryParams = {
        records: params?.records,
        isSupervisor: params?.isSupervisor,
        order: params?.order,
        orderBy: params?.orderBy,
        page: params?.page,
        user: params?.user,
        team: params?.team
      }

      const { data } = await get(
        `/parametrizations/assign-permissions`,
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

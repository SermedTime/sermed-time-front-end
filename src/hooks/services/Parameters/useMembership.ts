import { useCallback, useEffect, useState } from 'react'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { get } from '@/services/api/sermed-api/sermed-api'

export interface IMembership {
  uuid: string
  team: string
  created_at: string
  isSupervisor: string
}

interface props {
  uuid: string
}

export function useMembership({ uuid }: props) {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<IMembership> | null>(null)

  const fetchData = useCallback(
    async (params: Record<string, any>) => {
      try {
        setResult(null)

        const queryParams = {
          search: params?.search,
          searchingBy: params?.searchingBy,
          records: params?.records,
          isSupervisor: params?.isSupervisor,
          order: params?.order,
          orderBy: params?.orderBy,
          page: params?.page
        }

        const { data } = await get(
          `/parametrizations/users/membership/${uuid}`,
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
    },
    [uuid]
  )

  function refetch() {
    params && uuid && fetchData(params)
  }

  useEffect(() => {
    params && uuid && fetchData(params)
  }, [params, uuid, fetchData])

  return { result, params, refetch, setParams }
}

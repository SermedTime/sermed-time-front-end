import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

import { removeEmptyEntries } from '@/utils/generic'

export interface ITimeSheet {
  hoursSummaryId: string
  date: string
  day: string
  firstEntry: string
  firstExit: string
  secondEntry: string
  secondExit: string
  thirdEntry: string
  thirdExit: string
  overtime: string
}

export function useTimeSheet(uuid?: string) {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<ITimeSheet> | null>(null)

  const fetchData = useCallback(
    async (uuid: string, params: Record<string, any>) => {
      try {
        setResult(null)

        const queryParams = removeEmptyEntries({
          month: params?.month,
          year: params?.year,
          records: params?.records,
          page: params?.page,
          order: params?.order
        })

        const { data } = await get(
          `/overview/time-sheet/list/${uuid}`,
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
    []
  )

  function refetch() {
    params && uuid && fetchData(uuid, params)
  }

  useEffect(() => {
    params && uuid && fetchData(uuid, params)
  }, [params, uuid, fetchData])

  return { result, params, setParams, refetch }
}

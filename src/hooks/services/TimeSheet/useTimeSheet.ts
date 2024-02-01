import { useCallback, useEffect, useState } from 'react'

import { fakeRequest, get } from '@/services/api/sermed-api/sermed-api'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

import { removeEmptyEntries } from '@/utils/generic'
import { fakeTimeSheet } from '@/pages/Home/components/TimeSheet/TimeSheet.inteface'

export interface ITimeSheet {
  id: number | string
  date: string
  firstEntry: string | undefined
  firstExit: string | undefined
  secondEntry: string | undefined
  secondExit: string | undefined
  thirdEntry: string | undefined
  thirdExit: string | undefined
  overtime: string | undefined
  is_edited?: boolean
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
          page: params?.page
        })

        console.log(queryParams, uuid)

        await fakeRequest(2000)

        const data = {
          data: fakeTimeSheet,
          page: params.page,
          total: 31
        }

        // const { data } = await get(`/time-sheet/${uuid}`, queryParams)

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

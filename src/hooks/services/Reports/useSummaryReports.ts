import { useCallback, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { removeEmptyEntries } from '@/utils/generic'

import { get } from '@/services/api/sermed-api/sermed-api'
import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

export interface ISummaryReports {
  employee_id?: string
  employee_name?: string
  team_id: string | null
  team_name: string | null
  absence: number | null
  extra_hour: string | null
  annual_leave: string | null
}

const summary: ISummaryReports = {
  employee_id: uuidv4(),
  employee_name: 'Tainã Martins Pino',
  team_id: uuidv4(),
  team_name: 'Equipe Teste',
  absence: 2,
  extra_hour: '04:00',
  annual_leave: '04:00'
}

const FakeSummary: ISummaryReports[] = [
  summary,
  summary,
  summary,
  summary,
  summary,
  summary,
  summary,
  summary,
  summary,
  summary
]

export function useSummaryReports() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<ISummaryReports> | null>(
    null
  )

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const queryParams = removeEmptyEntries({
        team_id: params?.team_id,
        user_id: params?.user_id,
        groupByTeam: params?.groupByTeam,
        initial_date: params?.initial_date,
        final_date: params?.final_date,
        min_absense: params?.min_absense,
        max_absense: params?.max_absense,
        min_extra_time: params?.min_extra_time,
        max_extra_time: params?.max_extra_time,
        min_annual_leave: params?.min_annual_leave,
        max_annual_leave: params?.max_annual_leave,
        records: params?.records,
        order: params?.order,
        orderBy: params?.orderBy,
        page: params?.page
      })

      const { data } = await get('/reports/list', queryParams)

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
        data: FakeSummary,
        page: 1,
        total: 10
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

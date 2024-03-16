import { get } from '@/services/api/sermed-api/sermed-api'
import { removeEmptyEntries } from '@/utils/generic'
import { useState, useCallback, useEffect } from 'react'

export interface IScheduleShift {
  schedule_id: string
  team_id: string
  team_name: string
  user_id: string
  user_name: string
  title: string
  shift_id: string
  shift_name: string
  start: Date
  end: Date
  start_string: string
  end_string: string
  type: string
  shift_initials: string
}

export function useSchedules() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IScheduleShift[] | null>(null)

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const queryParams = removeEmptyEntries({
        team_id: params?.team_id,
        user_id: params?.user_id,
        is_home: params?.is_home
      })

      const { data } = await get('/schedule/list', queryParams)

      for (let i = 0; i < data.data.length; i++) {
        data.data[i].start = new Date(data.data[i].start.replace('Z', '-0300'))
        data.data[i].end = new Date(data.data[i].end.replace('Z', '-0300'))
      }

      console.log(data.data)

      setResult(data.data)
    } catch {
      setResult([])
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

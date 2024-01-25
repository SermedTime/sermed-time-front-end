import { get } from '@/services/api/sermed-api/sermed-api'
import { useState, useCallback, useEffect } from 'react'

interface IScheduleShift {
  id: string
  team_id: string
  team_name: string
  user_id: string
  user_name: string
  shift: string
  schedule_date: Date
}

export function useSchedules() {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IScheduleShift[] | null>(null)

  const fetchData = useCallback(async (params: Record<string, any>) => {
    try {
      setResult(null)

      const { data } = await get('/schedules', params)

      for (let i = 0; i < data.data.length; i++) {
        data.data[i].start = new Date(data.data[i].start)
        data.data[i].end = new Date(data.data[i].end)
      }

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

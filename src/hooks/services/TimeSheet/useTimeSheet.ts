import { useCallback, useState } from 'react'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'

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

export function useTimeSheet(uuid: string) {
  const [params, setParams] = useState<Record<string, any> | null>(null)

  const [result, setResult] = useState<IApiResponse<ITimeSheet> | null>(null)

  const fetchData = useCallback(
    async (uuid: string, params: Record<string, any>) => {
      try {
      } catch {}
    },
    []
  )
}

import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'
import { removeEmptyEntries } from '@/utils/generic'

interface IAbsenses {
  date: string
  shift_name: string
}

interface IResponse {
  data: IAbsenses[]
  total: number
}

interface Props {
  user_id: string
  initial_date: string
  final_date: string
}

export function useAbsenses({ user_id, initial_date, final_date }: Props) {
  const [result, setResult] = useState<IResponse | null>(null)

  const fetchData = useCallback(
    async ({ user_id, initial_date, final_date }: Props) => {
      try {
        setResult(null)

        const queryParams = removeEmptyEntries({
          initial_date,
          final_date
        })

        const { data } = await get(`/reports/absenses/${user_id}`, queryParams)

        const res: IResponse = data.data

        if (data.total > 0) {
          setResult(res)
        } else {
          setResult(null)
        }
      } catch {
        // setResult(null)
        setResult({
          data: [
            {
              date: '13/02/2024',
              shift_name: 'Manhã Esterilização'
            }
          ],
          total: 1
        })
      }
    },
    []
  )

  useEffect(() => {
    if (!user_id) return

    fetchData({ user_id, initial_date, final_date })
  }, [user_id, initial_date, final_date, fetchData])

  return { result }
}

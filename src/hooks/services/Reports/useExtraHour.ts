import { get } from '@/services/api/sermed-api/sermed-api'
import { removeEmptyEntries } from '@/utils/generic'
import { useCallback, useEffect, useState } from 'react'

interface IExtraHours {
  date: Date
  shift_name: string
  hours: string
  approved_by: string
  approval_date: Date
}

interface IResponse {
  data: IExtraHours[]
  total: string
}

interface Props {
  user_id: string
  initial_date: string
  final_date: string
}

export function useExtraHour({ user_id, initial_date, final_date }: Props) {
  const [result, setResult] = useState<IResponse | null>(null)

  const fetchData = useCallback(
    async ({ user_id, initial_date, final_date }: Props) => {
      try {
        setResult(null)

        const queryParams = removeEmptyEntries({
          initial_date,
          final_date
        })

        const { data } = await get(
          `/reports/extra-hour/${user_id}`,
          queryParams
        )

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
              date: new Date(),
              shift_name: 'Manhã Esterilização',
              hours: '00:45',
              approved_by: 'Gabriela Viegas',
              approval_date: new Date()
            },
            {
              date: new Date(),
              shift_name: 'Manhã Esterilização',
              hours: '00:45',
              approved_by: 'Gabriela Viegas',
              approval_date: new Date()
            }
          ],
          total: '01:30'
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

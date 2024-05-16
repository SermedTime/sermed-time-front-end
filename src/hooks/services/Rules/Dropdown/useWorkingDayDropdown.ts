import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { get } from '@/services/api/sermed-api/sermed-api'
import { useCallback, useEffect, useState } from 'react'

interface IWorkingDayDropdown {
  uuid: string
  description: string
}

export function useWorkingDayDropdown() {
  const [workingDays, setWorkingDays] = useState<IOption[] | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setWorkingDays(null)

      const {
        data: { data }
      } = await get('/dropdown/working-day')

      const workingDays = data.map((item: IWorkingDayDropdown) => {
        return {
          value: item.uuid,
          label: item.description
        }
      })

      setWorkingDays(workingDays)
    } catch {
      setWorkingDays([])
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { workingDays }
}

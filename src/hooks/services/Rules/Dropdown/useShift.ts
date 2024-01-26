import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

interface ITeamDropdown {
  uuid: string
  description: string
}

export function useShiftDropdown() {
  const [shifts, setShifts] = useState<IOption[] | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setShifts(null)

      const {
        data: { data }
      } = await get('/dropdown/shifts')

      const shifts = data.map((item: ITeamDropdown) => {
        return {
          value: item.uuid,
          label: item.description
        }
      })

      setShifts(shifts)
    } catch {
      setShifts([])
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { shifts }
}

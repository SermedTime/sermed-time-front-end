import { useCallback, useEffect, useState } from 'react'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

import { get } from '@/services/api/sermed-api/sermed-api'

interface ICitiesDropdown {
  uuid: string
  description: string
}

export function useCitiesDropdown() {
  const [cities, setCities] = useState<IOption[]>([])

  const [state, setState] = useState<string | null>(null)

  const fetchData = useCallback(async (state: string) => {
    try {
      setCities([])

      const {
        data: { data }
      } = await get('/dropdown/city', { state })

      const cities = data.map((item: ICitiesDropdown) => {
        return {
          value: item.uuid,
          label: item.description
        }
      })

      setCities(cities)
    } catch {
      setCities([])
    }
  }, [])

  useEffect(() => {
    state && fetchData(state)
  }, [state, fetchData])

  return { cities, setState }
}

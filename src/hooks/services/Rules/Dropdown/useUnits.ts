import { useCallback, useEffect, useState } from 'react'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { get } from '@/services/api/sermed-api/sermed-api'
import { removeEmptyEntries } from '@/utils/generic'

interface IUnitDropdown {
  uuid: string
  unitName: string
}

export function useUnitsDropdown() {
  const [units, setUnits] = useState<IOption[] | null>(null)

  const [onlyActiveUnits, setOnlyActiveUnits] = useState<boolean>(false)

  const fetchData = useCallback(async (onlyActiveUnits: boolean) => {
    try {
      setUnits(null)

      const payload = removeEmptyEntries({
        status: onlyActiveUnits ? 'active' : null
      })

      const {
        data: { data }
      } = await get('/parametrizations/units', payload)

      const units = data.map((item: IUnitDropdown) => {
        return {
          value: item.uuid,
          label: item.unitName
        }
      })

      setUnits(units)
    } catch {
      setUnits([])
    }
  }, [])

  useEffect(() => {
    fetchData(onlyActiveUnits)
  }, [fetchData, onlyActiveUnits])

  return { units, setOnlyActiveUnits }
}

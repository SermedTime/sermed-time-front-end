import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { removeEmptyEntries } from '@/utils/generic'

interface ITeamDropdown {
  uuid: string
  description: string
}

interface props {
  allTeams?: string
  uuid?: string
}

export function useTeamDropdown({ allTeams, uuid }: props) {
  const [teams, setTeams] = useState<IOption[] | null>(null)
  const [unitId, setUnitId] = useState<string | number | null>(null)

  const fetchData = useCallback(
    async (
      allTeams?: string,
      uuid?: string,
      unitId?: string | number | null
    ) => {
      try {
        setTeams(null)

        const params = removeEmptyEntries({
          allTeams,
          user_id: uuid,
          unitId
        })

        const {
          data: { data }
        } = await get('/dropdown/team', { ...params })

        const teams = data.map((item: ITeamDropdown) => {
          return {
            value: item.uuid,
            label: item.description
          }
        })

        setTeams(teams)
      } catch {
        setTeams([])
      }
    },
    []
  )

  useEffect(() => {
    fetchData(allTeams, uuid, unitId)
  }, [allTeams, uuid, unitId, fetchData])

  return { teams, setUnitId }
}

useTeamDropdown.defaultProps = {
  allTeams: undefined,
  uuid: undefined
}

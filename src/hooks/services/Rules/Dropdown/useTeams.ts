import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

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

  const fetchData = useCallback(async (allTeams?: string, uuid?: string) => {
    try {
      setTeams(null)

      const params = {
        allTeams,
        user_id: uuid
      }

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
  }, [])

  useEffect(() => {
    fetchData(allTeams, uuid)
  }, [allTeams, uuid, fetchData])

  return { teams }
}

useTeamDropdown.defaultProps = {
  allTeams: undefined,
  uuid: undefined
}

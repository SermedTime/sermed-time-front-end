import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

interface ITeamDropdown {
  uuid: string
  description: string
}

interface props {
  allData?: string
  uuid?: string
}

export function useTeamDropdown({ allData, uuid }: props) {
  const [teams, setTeams] = useState<IOption[] | null>(null)

  const fetchData = useCallback(async (allData?: string, uuid?: string) => {
    try {
      setTeams(null)

      const params = {
        allData,
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
    fetchData(allData, uuid)
  }, [allData, uuid, fetchData])

  return { teams }
}

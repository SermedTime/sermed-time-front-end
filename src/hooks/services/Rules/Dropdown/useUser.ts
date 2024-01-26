import { useCallback, useEffect, useState } from 'react'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { removeEmptyEntries } from '@/utils/generic'
import { get } from '@/services/api/sermed-api/sermed-api'

interface IUsersDropdown {
  uuid: string
  description: string
}

export function useUsersDropdown() {
  const [teamId, setTeamId] = useState<string | null>(null)

  const [allData, setAllData] = useState<boolean>(false)

  const [dependsOn, setDependsOn] = useState<boolean>(false)

  const [users, setUsers] = useState<IOption[] | null>(null)

  const fetchData = useCallback(
    async (allData?: boolean, dependsOn?: boolean, teamId?: string | null) => {
      try {
        setUsers(null)

        if (dependsOn && !teamId) {
          setUsers([])
        } else {
          let users = []

          const params = removeEmptyEntries({ team_id: teamId })

          const {
            data: { data }
          } = await get('dropdown/users', { ...params })

          users = data.map((item: IUsersDropdown) => {
            return {
              value: item.uuid,
              label: item.description
            }
          })

          if (allData) {
            const allUsers = { value: '', label: 'Exibir Todos' }
            users.splice(0, 0, allUsers)
          }

          setUsers(users)
        }
      } catch {
        setUsers([])
      }
    },
    []
  )

  useEffect(() => {
    if (dependsOn && teamId) {
      fetchData(allData, dependsOn, teamId)
    }
  }, [teamId, allData, dependsOn, fetchData])

  // useEffect(() => {
  //   !users && fetchData(allData, dependsOn, teamId)
  // }, [users, allData, teamId, dependsOn, fetchData])

  return { users, setAllData, setDependsOn, setTeamId }
}

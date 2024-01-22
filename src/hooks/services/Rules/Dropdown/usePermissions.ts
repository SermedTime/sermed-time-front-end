import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

interface ITeamDropdown {
  uuid: string
  description: string
}

interface props {
  uuid?: string
}

export function usePermissionsDropdown({ uuid }: props) {
  const [permissions, setPermissions] = useState<IOption[] | null>(null)

  const fetchData = useCallback(async (uuid?: string) => {
    try {
      setPermissions(null)

      const params = {
        user_id: uuid
      }

      const {
        data: { data }
      } = await get('/dropdown/permissions', { ...params })

      const permissions = data.map((item: ITeamDropdown) => {
        return {
          value: item.uuid,
          label: item.description
        }
      })

      setPermissions(permissions)
    } catch {
      setPermissions([])
    }
  }, [])

  useEffect(() => {
    fetchData(uuid)
  }, [uuid, fetchData])

  return { permissions }
}

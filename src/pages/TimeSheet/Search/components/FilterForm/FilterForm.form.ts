import { useAuthContext } from '@/contexts/Auth'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

export interface IUserFilterForm {
  records: number
  status: string
  teamId: string
}

export function useTimeSheetUserFilterForm() {
  const { hasMultiviewPoint } = useAuthRoles()
  const { user } = useAuthContext()

  const initialTeamId = !hasMultiviewPoint ? user!.teamId : ''

  const initialFilterValues: IUserFilterForm = {
    records: 6,
    status: 'all',
    teamId: initialTeamId
  }

  return { initialFilterValues }
}

import { useAuthContext } from '@/contexts/Auth'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { ROLE_PARAMETRIZATIONS } from '@/constants/user.roles'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { ROUTE_REPORTS } from '@/routes/Pages/Reports/Reports.paths'
import { ROUTE_SCHEDULE } from '@/routes/Pages/Schedule/Schedules.paths'
import {
  ROUTE_TIME_SHEET_OVERVIEW,
  ROUTE_TIME_SHEET_USER_SEARCH
} from '@/routes/Pages/TimeSheet/TimeSheet.paths'

interface INavigation {
  icon: string
  label: string
  route?: string
  allowedRoles?: string[]
  list?: {
    label: string
    route: string
  }[]
}

export function useSideMenuNavigation() {
  const { hasMultiviewPoint, hasTeamPoint } = useAuthRoles()

  const { user } = useAuthContext()

  const nav: INavigation[] = [
    {
      icon: 'home',
      label: 'Home',
      route: ROUTE_HOME
    },
    {
      icon: 'pending_actions',
      label: 'Folha de Ponto',
      route:
        hasMultiviewPoint() || (hasTeamPoint() && user?.teamId)
          ? ROUTE_TIME_SHEET_USER_SEARCH
          : `${ROUTE_TIME_SHEET_OVERVIEW}/${user?.userUuid}`
    },
    {
      icon: 'calendar_month',
      label: 'Escalas',
      route: ROUTE_SCHEDULE
    },
    {
      icon: 'bar_chart',
      label: 'Relatórios',
      route: ROUTE_REPORTS
    },
    {
      icon: 'display_settings',
      label: 'Parametrizações',
      route: ROUTE_PARAMETERIZATIONS,
      allowedRoles: [ROLE_PARAMETRIZATIONS]
    }
  ]

  return { nav }
}

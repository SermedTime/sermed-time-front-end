import { ROLE_PARAMETRIZATIONS } from '@/constants/user.roles'
import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { ROUTE_SCHEDULE } from '@/routes/Pages/Schedule/Schedules.paths'
import { ROUTE_TIME_SHEET_USER_SEARCH } from '@/routes/Pages/TimeSheet/TimeSheet.paths'

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

export const nav: INavigation[] = [
  {
    icon: 'home',
    label: 'Home',
    route: ROUTE_HOME
  },
  {
    icon: 'pending_actions',
    label: 'Folha de Ponto',
    route: ROUTE_TIME_SHEET_USER_SEARCH
  },
  {
    icon: 'calendar_month',
    label: 'Escalas',
    route: ROUTE_SCHEDULE
  },
  {
    icon: 'multiline_chart',
    label: 'Parametrizações',
    route: ROUTE_PARAMETERIZATIONS,
    allowedRoles: [ROLE_PARAMETRIZATIONS]
  }
]

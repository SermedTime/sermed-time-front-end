import { lazy } from 'react'

import { authRoutes } from './Auth/Auth.routes'
import { parameterizationsRoutes } from './Parametrizations/Parametrizations.routes'
import { userRoutes } from './User/User.routes'
import { timeSheetRoutes } from './TimeSheet/TimeSheet.routes'
import { scheduleRoutes } from './Schedule/Schedules.routes'
import { reportsRoutes } from './Reports/Reports.routes'

import { ROUTE_HOME } from './Pages.paths'

import { IRouteProps } from '../routes.interface'

const Home = lazy(() =>
  import('@/pages/Home').then(module => ({
    default: module.Home
  }))
)

const mainRoutes: IRouteProps[] = [
  {
    path: '/',
    component: Home,
    isPrivate: true
  },
  {
    path: ROUTE_HOME,
    component: Home,
    isPrivate: true
  }
]

export const routes: IRouteProps[] = mainRoutes.concat(
  authRoutes,
  parameterizationsRoutes,
  userRoutes,
  timeSheetRoutes,
  reportsRoutes,
  scheduleRoutes
)

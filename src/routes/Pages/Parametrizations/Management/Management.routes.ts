import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import {
  ROUTE_MANAGEMENT_TEAMS_CREATE,
  ROUTE_MANAGEMENT_TEAMS_LIST,
  ROUTE_MANAGEMENT_TIME_CLOCK_CREATE,
  ROUTE_MANAGEMENT_TIME_CLOCK_LIST,
  ROUTE_MANAGEMENT_USERS_LIST
} from './Management.paths'

const ListTimeClock = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/TimeClock/List').then(
    module => ({ default: module.ListTimeClock })
  )
)

const CreateTimeClock = lazy(() =>
  import(
    '@/pages/Parametrizations/Parameters/Management/TimeClock/Create'
  ).then(module => ({ default: module.CreateTimeClock }))
)

const ListTeams = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/Teams/List').then(
    module => ({ default: module.ListTeams })
  )
)

const CreateTeam = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/Teams/Create').then(
    module => ({ default: module.CreateTeam })
  )
)

const ListUsers = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/Users/List').then(
    module => ({ default: module.ListUsers })
  )
)

export const managementParametersRoutes: IRouteProps[] = [
  {
    path: ROUTE_MANAGEMENT_TIME_CLOCK_LIST,
    component: ListTimeClock,
    isPrivate: true
  },
  {
    path: ROUTE_MANAGEMENT_TIME_CLOCK_CREATE,
    component: CreateTimeClock,
    isPrivate: true
  },
  {
    path: ROUTE_MANAGEMENT_TEAMS_LIST,
    component: ListTeams,
    isPrivate: true
  },
  {
    path: ROUTE_MANAGEMENT_TEAMS_CREATE,
    component: CreateTeam,
    isPrivate: true
  },
  {
    path: ROUTE_MANAGEMENT_USERS_LIST,
    component: ListUsers,
    isPrivate: true
  }
]

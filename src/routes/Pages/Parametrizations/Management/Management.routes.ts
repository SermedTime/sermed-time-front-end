import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'

import { ROLE_PARAMETRIZATIONS } from '@/constants/user.roles'
import {
  ROUTE_MANAGEMENT_COMPANIES_CREATE,
  ROUTE_MANAGEMENT_COMPANIES_LIST,
  ROUTE_MANAGEMENT_TEAMS_CREATE,
  ROUTE_MANAGEMENT_TEAMS_LIST,
  ROUTE_MANAGEMENT_UNITS_CREATE,
  ROUTE_MANAGEMENT_UNITS_LIST,
  ROUTE_MANAGEMENT_USERS_LIST,
  ROUTE_MANAGEMENT_WORKING_DAY_CREATE,
  ROUTE_MANAGEMENT_WORKING_DAY_LIST
} from './Management.paths'

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

const ListCompanies = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/Companies/List').then(
    module => ({ default: module.ListCompanies })
  )
)

const CreateCompany = lazy(() =>
  import(
    '@/pages/Parametrizations/Parameters/Management/Companies/Create'
  ).then(module => ({ default: module.CreateCompany }))
)

const ListUnits = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/Units/List').then(
    module => ({ default: module.ListUnits })
  )
)

const CreateUnit = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/Units/Create').then(
    module => ({ default: module.CreateUnit })
  )
)

const ListWorkingDay = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/WorkingDay/List').then(
    module => ({ default: module.ListWorkingDay })
  )
)

const CreateWorkingDay = lazy(() =>
  import(
    '@/pages/Parametrizations/Parameters/Management/WorkingDay/Create'
  ).then(module => ({ default: module.CreateWorkingDay }))
)

export const managementParametersRoutes: IRouteProps[] = [
  {
    path: ROUTE_MANAGEMENT_TEAMS_LIST,
    component: ListTeams,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  },
  {
    path: ROUTE_MANAGEMENT_TEAMS_CREATE,
    component: CreateTeam,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: true }]
  },
  {
    path: ROUTE_MANAGEMENT_USERS_LIST,
    component: ListUsers,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  },

  {
    path: ROUTE_MANAGEMENT_COMPANIES_LIST,
    component: ListCompanies,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  },
  {
    path: ROUTE_MANAGEMENT_COMPANIES_CREATE,
    component: CreateCompany,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: true }]
  },
  {
    path: ROUTE_MANAGEMENT_UNITS_LIST,
    component: ListUnits,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  },
  {
    path: ROUTE_MANAGEMENT_UNITS_CREATE,
    component: CreateUnit,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: true }]
  },
  {
    path: ROUTE_MANAGEMENT_WORKING_DAY_LIST,
    component: ListWorkingDay,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  },
  {
    path: ROUTE_MANAGEMENT_WORKING_DAY_CREATE,
    component: CreateWorkingDay,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: true }]
  }
]

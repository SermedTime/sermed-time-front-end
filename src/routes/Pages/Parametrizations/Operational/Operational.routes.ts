import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import { ROLE_PARAMETRIZATIONS } from '@/constants/user.roles'
import {
  ROUTE_OPERATIONAL_HOLIDAY_CREATE,
  ROUTE_OPERATIONAL_HOLIDAY_LIST,
  ROUTE_OPERATIONAL_TIME_CLOCK_CREATE,
  ROUTE_OPERATIONAL_TIME_CLOCK_LIST
} from './Operational.paths'

const ListTimeClock = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Operational/TimeClock/List').then(
    module => ({ default: module.ListTimeClock })
  )
)

const CreateTimeClock = lazy(() =>
  import(
    '@/pages/Parametrizations/Parameters/Operational/TimeClock/Create'
  ).then(module => ({ default: module.CreateTimeClock }))
)

const ListHoliday = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Operational/Holiday/List').then(
    module => ({ default: module.ListHoliday })
  )
)

const CreateHoliday = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Operational/Holiday/Create').then(
    module => ({ default: module.CreateHoliday })
  )
)

export const operationalParametersRoutes: IRouteProps[] = [
  {
    path: ROUTE_OPERATIONAL_TIME_CLOCK_LIST,
    component: ListTimeClock,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  },
  {
    path: ROUTE_OPERATIONAL_TIME_CLOCK_CREATE,
    component: CreateTimeClock,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: true }]
  },
  {
    path: ROUTE_OPERATIONAL_HOLIDAY_LIST,
    component: ListHoliday,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  },
  {
    path: ROUTE_OPERATIONAL_HOLIDAY_CREATE,
    component: CreateHoliday,
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: true }]
  }
]

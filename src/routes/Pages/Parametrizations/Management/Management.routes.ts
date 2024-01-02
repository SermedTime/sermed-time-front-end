import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import {
  ROUTE_MANAGEMENT_TIME_CLOCK_CREATE,
  ROUTE_MANAGEMENT_TIME_CLOCK_LIST
} from './Management.paths'

const ListCompanies = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/TimeClock/List').then(
    module => ({ default: module.ListCompanies })
  )
)

const CreateCompany = lazy(() =>
  import(
    '@/pages/Parametrizations/Parameters/Management/TimeClock/Create'
  ).then(module => ({ default: module.CreateCompany }))
)

export const managementParametersRoutes: IRouteProps[] = [
  {
    path: ROUTE_MANAGEMENT_TIME_CLOCK_LIST,
    component: ListCompanies,
    isPrivate: true
  },
  {
    path: ROUTE_MANAGEMENT_TIME_CLOCK_CREATE,
    component: CreateCompany,
    isPrivate: true
  }
]

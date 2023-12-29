import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import {
  ROUTE_MANAGEMENT_COMPANIES_CREATE,
  ROUTE_MANAGEMENT_COMPANIES_LIST
} from './Management.paths'

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

export const managementParametersRoutes: IRouteProps[] = [
  {
    path: ROUTE_MANAGEMENT_COMPANIES_LIST,
    component: ListCompanies,
    isPrivate: true
  },
  {
    path: ROUTE_MANAGEMENT_COMPANIES_CREATE,
    component: CreateCompany,
    isPrivate: true
  }
]

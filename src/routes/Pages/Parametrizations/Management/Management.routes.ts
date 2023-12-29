import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import { ROUTE_MANAGEMENT_COMPANIES_LIST } from './Management.paths'

const ListCompanies = lazy(() =>
  import('@/pages/Parametrizations/Parameters/Management/Companies/List').then(
    module => ({ default: module.ListCompanies })
  )
)

export const managementParametersRoutes: IRouteProps[] = [
  {
    path: ROUTE_MANAGEMENT_COMPANIES_LIST,
    component: ListCompanies,
    isPrivate: true
  }
]

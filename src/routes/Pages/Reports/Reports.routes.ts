import { lazy } from 'react'

import { IRouteProps } from '@/routes/routes.interface'

import { ROUTE_REPORTS } from './Reports.paths'

const ListReports = lazy(() =>
  import('@/pages/Reports/List').then(module => ({
    default: module.ListReports
  }))
)

export const reportsRoutes: IRouteProps[] = [
  {
    path: ROUTE_REPORTS,
    component: ListReports,
    isPrivate: true
  }
]

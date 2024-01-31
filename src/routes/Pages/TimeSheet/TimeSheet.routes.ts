import { lazy } from 'react'

import { IRouteProps } from '@/routes/routes.interface'

import {
  ROUTE_TIME_SHEET_OVERVIEW,
  ROUTE_TIME_SHEET_USER_SEARCH
} from './TimeSheet.paths'

const UserSearch = lazy(() =>
  import('@/pages/TimeSheet/Search').then(module => ({
    default: module.UserSearch
  }))
)

const UserTimeSheet = lazy(() =>
  import('@/pages/TimeSheet/UserTimeSheet').then(module => ({
    default: module.UserTimeSheet
  }))
)

export const timeSheetRoutes: IRouteProps[] = [
  {
    path: ROUTE_TIME_SHEET_USER_SEARCH,
    component: UserSearch,
    isPrivate: true
  },
  {
    path: `${ROUTE_TIME_SHEET_OVERVIEW}/:uuid`,
    component: UserTimeSheet,
    isPrivate: true
  }
]

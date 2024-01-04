import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import { ROUTE_TIME_SHEET_USER_SEARCH } from './TimeSheet.paths'

const UserSearch = lazy(() =>
  import('@/pages/TimeSheet/Search').then(module => ({
    default: module.UserSearch
  }))
)

export const timeSheetRoutes: IRouteProps[] = [
  {
    path: ROUTE_TIME_SHEET_USER_SEARCH,
    component: UserSearch,
    isPrivate: true
  }
]

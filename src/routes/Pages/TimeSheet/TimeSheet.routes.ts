import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import { ROUTE_TIME_SHEET } from './TimeSheet.paths'

const TimeSheet = lazy(() =>
  import('@/pages/TimeSheet').then(module => ({
    default: module.TimeSheet
  }))
)

export const timeSheetRoutes: IRouteProps[] = [
  {
    path: ROUTE_TIME_SHEET,
    component: TimeSheet,
    isPrivate: true
  }
]

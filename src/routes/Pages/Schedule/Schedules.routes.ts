import { IRouteProps } from '@/routes/routes.interface'
import { lazy } from 'react'
import { ROUTE_SCHEDULE } from './Schedules.paths'

const ListScheduleCalendar = lazy(() =>
  import('@/pages/Schedule/List').then(module => ({
    default: module.ListScheduleCalendar
  }))
)

export const scheduleRoutes: IRouteProps[] = [
  {
    path: ROUTE_SCHEDULE,
    component: ListScheduleCalendar,
    isPrivate: true
  }
]

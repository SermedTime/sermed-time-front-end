import { lazy } from 'react'

import { IRouteProps } from '@/routes/routes.interface'

import { ROUTE_USER_CHANGE_PASSWORD, ROUTE_USER_PROFILE } from './User.paths'

const UserProfile = lazy(() =>
  import('@/pages/User/Profile').then(module => ({
    default: module.UserProfile
  }))
)

const UserChangePassword = lazy(() =>
  import('@/pages/User/Profile/ChangePassword').then(module => ({
    default: module.UserChangePassword
  }))
)

export const userRoutes: IRouteProps[] = [
  {
    path: ROUTE_USER_PROFILE,
    component: UserProfile,
    isPrivate: true
  },
  {
    path: ROUTE_USER_CHANGE_PASSWORD,
    component: UserChangePassword,
    isPrivate: true
  }
]

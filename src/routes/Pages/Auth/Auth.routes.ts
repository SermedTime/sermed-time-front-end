import { lazy } from 'react'

import { IRouteProps } from '@/routes/routes.interface'
import {
  ROUTE_FIRST_LOGIN,
  ROUTE_LOGIN,
  ROUTE_RECOVER_PASSWORD,
  ROUTE_RESET_PASSWORD
} from './Auth.paths'

const Login = lazy(() =>
  import('@/pages/Auth/Login').then(module => ({
    default: module.Login
  }))
)

const RecoverPassword = lazy(() =>
  import('@/pages/Auth/RecoverPassword').then(module => ({
    default: module.RecoverPassword
  }))
)

const ResetPassword = lazy(() =>
  import('@/pages/Auth/ResetPassword').then(module => ({
    default: module.ResetPassword
  }))
)

const FirstLogin = lazy(() =>
  import('@/pages/Auth/FirstLogin').then(module => ({
    default: module.FirstLogin
  }))
)

export const authRoutes: IRouteProps[] = [
  {
    path: ROUTE_LOGIN,
    component: Login
  },
  {
    path: ROUTE_RECOVER_PASSWORD,
    component: RecoverPassword
  },
  {
    path: ROUTE_RESET_PASSWORD,
    component: ResetPassword
  },
  {
    path: ROUTE_FIRST_LOGIN,
    component: FirstLogin,
    isPrivate: true
  }
]

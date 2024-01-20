import { lazy } from 'react'

import { IRouteProps } from '@/routes/routes.interface'
import {
  ROUTE_LOGIN,
  ROUTE_RECOVER_PASSWORD,
  ROUTE_RESET_PASSWORD
} from './Auth.paths'

// import { ROUTE_LOGIN, ROUTE_RECOVER_PASSWORD } from './Auth.paths'

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
  }
]

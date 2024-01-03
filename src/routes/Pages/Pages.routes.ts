import { lazy } from 'react'
import { IRouteProps } from '../routes.interface'
import { ROUTE_HOME } from './Pages.paths'
import { authRoutes } from './Auth/Auth.routes'
import { parameterizationsRoutes } from './Parametrizations/Parametrizations.routes'
import { userRoutes } from './User/User.routes'

const Home = lazy(() =>
  import('@/pages/Home').then(module => ({
    default: module.Home
  }))
)

const mainRoutes: IRouteProps[] = [
  {
    path: '/',
    component: Home,
    isPrivate: true
  },
  {
    path: ROUTE_HOME,
    component: Home,
    isPrivate: true
  }
]

export const routes: IRouteProps[] = mainRoutes.concat(
  authRoutes,
  parameterizationsRoutes,
  userRoutes
)

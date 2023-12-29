import { lazy } from 'react'

import { IRouteProps } from '@/routes/routes.interface'

import { ROUTE_PARAMETERIZATIONS } from './Parametrizations.paths'
import { managementParametersRoutes } from './Management/Management.routes'

const Parametrizations = lazy(() =>
  import('@/pages/Parametrizations').then(module => ({
    default: module.Parametrizations
  }))
)

const routes: IRouteProps[] = [
  {
    path: ROUTE_PARAMETERIZATIONS,
    component: Parametrizations,
    isPrivate: true
  }
]

export const parameterizationsRoutes = routes.concat(managementParametersRoutes)

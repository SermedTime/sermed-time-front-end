import { lazy } from 'react'

import { IRouteProps } from '@/routes/routes.interface'

import { ROLE_PARAMETRIZATIONS } from '@/constants/user.roles'
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
    isPrivate: true,
    allowedRoles: [{ role: ROLE_PARAMETRIZATIONS, is_writer: false }]
  }
]

export const parameterizationsRoutes = routes.concat(managementParametersRoutes)

import { useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@/contexts/Auth'
import { useToastContext } from '@/contexts/Toast'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { ROUTE_LOGIN } from '@/routes/Pages/Auth/Auth.paths'

import { IRoles } from '@/contexts/Auth/Auth'

interface Props {
  allowedRoles?: IRoles[]
  children: JSX.Element
}

export function RequireAuth({ allowedRoles, children }: Props) {
  const { loaded, user } = useAuthContext()
  const { addToast } = useToastContext()

  const { checkIfUserHasRole } = useAuthRoles()

  useEffect(() => {
    if (loaded && allowedRoles) {
      const hasPermission = allowedRoles.some((role: IRoles) =>
        checkIfUserHasRole(role)
      )

      if (!hasPermission) {
        addToast({
          type: 'warning',
          title: 'Oops',
          description: 'Permissão negada.'
        })
      }
    }
  }, [loaded, allowedRoles, checkIfUserHasRole, addToast])

  if (!loaded) return null

  if (!user) return <Navigate to={ROUTE_LOGIN} replace={true} />

  if (!allowedRoles) return children

  const hasPermission = allowedRoles.some((role: IRoles) =>
    checkIfUserHasRole(role)
  )

  if (hasPermission) return children

  return <Navigate to={ROUTE_HOME} />
}

RequireAuth.defaultProps = {
  allowedRoles: undefined
}

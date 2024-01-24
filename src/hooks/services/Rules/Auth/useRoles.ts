import { useCallback, useMemo } from 'react'

import { useAuthContext } from '@/contexts/Auth'

import { IRoles } from '@/contexts/Auth/Auth'

export function useAuthRoles() {
  const { user } = useAuthContext()

  const userRoles = useMemo(() => {
    return user
      ? user.roles.map((r: IRoles) => {
          return {
            role: r.role,
            is_writer: r.is_writer
          }
        })
      : ([] as IRoles[])
  }, [user])

  const checkIfUserHasRole = useCallback(
    ({ role, is_writer = false }: Partial<IRoles>): boolean => {
      if (is_writer) {
        return userRoles.some(
          userRole => userRole.role === role && userRole.is_writer
        )
      }

      return userRoles.some(userRole => userRole.role === role)
    },
    [userRoles]
  )

  const hasParametrizations = useCallback((): boolean => {
    return checkIfUserHasRole({
      role: String(`${import.meta.env.VITE_APP_ROLE_PARAMETRIZATIONS}`)
    })
  }, [checkIfUserHasRole])

  const hasParametrizationsWriter = useCallback((): boolean => {
    return checkIfUserHasRole({
      role: String(`${import.meta.env.VITE_APP_ROLE_PARAMETRIZATIONS}`),
      is_writer: true
    })
  }, [checkIfUserHasRole])

  const handleUserRoles = useCallback(
    (roles: Array<{ sigla: string }>): string[] => {
      if (!roles || !roles.length) return []

      return roles.map(role => role.sigla)
    },
    []
  )

  return {
    checkIfUserHasRole,
    hasParametrizations,
    hasParametrizationsWriter,
    handleUserRoles
  }
}

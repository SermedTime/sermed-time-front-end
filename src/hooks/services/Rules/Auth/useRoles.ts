import { useAuthContext } from '@/contexts/Auth'
import { useCallback } from 'react'

export function useAuthRoles() {
  const { user } = useAuthContext()

  const userRoles = user?.roles && user?.roles?.map(role => role.name)

  const checkIfUserHasRole = useCallback(
    (role: string): boolean => {
      return userRoles?.includes(role) || false
    },
    [userRoles]
  )

  const viewPoint = useCallback((): boolean => {
    return checkIfUserHasRole('point')
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
    viewPoint,
    handleUserRoles
  }
}

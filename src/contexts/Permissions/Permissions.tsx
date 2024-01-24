import { createContext, useCallback, useContext, useMemo } from 'react'

import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { ROLE_PARAMETRIZATIONS } from '@/constants/user.roles'

interface PermissionsContextData {
  hasParametrizations: () => boolean
  hasParametrizationsWriter: () => boolean
}

const Context = createContext<PermissionsContextData>(
  {} as PermissionsContextData
)

interface Props {
  children: React.ReactNode
}

function PermissionsContext({ children }: Props) {
  const { checkIfUserHasRole } = useAuthRoles()

  const hasParametrizations = useCallback(() => {
    const parametrizations = checkIfUserHasRole({
      role: ROLE_PARAMETRIZATIONS,
      is_writer: false
    })

    return parametrizations
  }, [checkIfUserHasRole])

  const hasParametrizationsWriter = useCallback(() => {
    const parametrizations = checkIfUserHasRole({
      role: ROLE_PARAMETRIZATIONS,
      is_writer: true
    })

    return parametrizations
  }, [checkIfUserHasRole])

  const providerValue = useMemo(
    () => ({
      hasParametrizations,
      hasParametrizationsWriter
    }),
    [hasParametrizations, hasParametrizationsWriter]
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function usePermissionContext(): PermissionsContextData {
  return useContext(Context)
}

export { PermissionsContext, usePermissionContext }

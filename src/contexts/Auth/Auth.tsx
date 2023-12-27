import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem
} from '@/utils/storage/local'

import { useNavigate } from 'react-router-dom'
import { ROUTE_LOGIN } from '@/routes/Pages/Auth/Auth.paths'
import { useLoaderContext } from '../Loader'

interface Auth {
  expiresIn: number
  token: string
  refreshToken: string
}

interface Roles {
  name: string
  write?: boolean
}

interface UserAuth {
  auth: Auth
  firstName: string
  roles?: Roles[]
}

interface UserCredentials {
  username: string
  password: string
}

interface AuthContextData {
  loaded: boolean
  user: UserAuth | null
  signIn: (credentials: UserCredentials) => Promise<boolean | undefined>
  signOut: () => void
}

const Context = createContext<AuthContextData>({} as AuthContextData)

interface Props {
  children: ReactNode
}

function AuthContext({ children }: Props) {
  const navigate = useNavigate()

  const { showLoader, hideLoader } = useLoaderContext()

  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState<UserAuth | null>(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const storagedUser = getLocalStorageItem('Sermed@time:user')

    storagedUser && setUser(storagedUser)
  }, [])

  const signIn = useCallback(
    async (credentials: UserCredentials): Promise<boolean | undefined> => {
      try {
        showLoader()

        setUser(null)
        removeLocalStorageItem('Sermed@time:user')

        const { username } = credentials

        const params = {
          username,
          password: credentials.password
        }

        if (
          params.username === 'admin@sermed.com.br' &&
          params.password === 'admin'
        ) {
          const user: UserAuth = {
            auth: {
              expiresIn: 3600,
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            },

            firstName: 'John Doe',
            roles: [
              {
                name: 'point',
                write: true
              }
            ]
          }

          setUser(user)
          setLocalStorageItem('Sermed@time:user', user)

          return true
        }

        return false
      } catch {
        return undefined
      } finally {
        hideLoader()
      }
    },
    [showLoader, hideLoader]
  )

  const signOut = useCallback(() => {
    setUser(null)
    removeLocalStorageItem('Sermed@time:user')

    navigate(ROUTE_LOGIN)
  }, [navigate])

  const providerValue = useMemo(
    () => ({
      loaded,
      user,
      signIn,
      signOut
    }),
    [loaded, user, signIn, signOut]
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function useAuthContext(): AuthContextData {
  return useContext(Context)
}

export { AuthContext, useAuthContext }

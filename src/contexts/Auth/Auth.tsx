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
import { post } from '@/services/api/sermed-api/sermed-api'
import { decryptToPayload } from '@/utils/crypt'
import { useLoaderContext } from '../Loader'

interface Auth {
  expiresIn: number
  token: string
}

interface Roles {
  name: string
  write?: boolean
}

interface UserAuth {
  auth: Auth
  roles?: Roles[]
  userUuid: string
  userName: string
  socialName: string
  email: string
  companyName: string
  companyCnpj: string
  sysPassword: boolean
  position: string
  pis: string
  identityNumber: string
  cpf: string
  admissionDate: string
  lastUpdateDate: string
}

interface UserCredentials {
  username: string
  password: string
}

interface authResponse {
  authenticated: boolean
  firstLogin?: boolean
}

interface AuthContextData {
  loaded: boolean
  user: UserAuth | null
  signIn: (credentials: UserCredentials) => Promise<authResponse | undefined>
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
    async (credentials: UserCredentials): Promise<authResponse | undefined> => {
      try {
        showLoader()

        setUser(null)
        removeLocalStorageItem('Sermed@time:user')

        const { username } = credentials

        const params = {
          username,
          password: credentials.password
        }

        const {
          data: { data }
        } = await post('/auth/login', params)

        if (data) {
          const user: UserAuth = {
            auth: {
              expiresIn: data.accessToken.expiresIn,
              token: data.accessToken.token
            },
            userUuid: decryptToPayload(data.user.userUuid),
            userName: decryptToPayload(data.user.userName),
            socialName: decryptToPayload(data.user.socialName),
            email: decryptToPayload(data.user.email),
            companyName: decryptToPayload(data.user.companyName),
            companyCnpj: decryptToPayload(data.user.companyCnpj),
            sysPassword: decryptToPayload(data.user.sysPassword) === 'true',
            position: decryptToPayload(data.user.position),
            pis: decryptToPayload(data.user.pis),
            identityNumber: decryptToPayload(data.user.identityNumber),
            cpf: decryptToPayload(data.user.cpf),
            admissionDate: decryptToPayload(data.user.admissionDate),
            lastUpdateDate: decryptToPayload(data.user.lastUpdateDate),
            roles: data.user.roles
          }

          setUser(user)
          setLocalStorageItem('Sermed@time:user', user)

          return { authenticated: true, firstLogin: user.sysPassword }
        }

        return { authenticated: false }
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

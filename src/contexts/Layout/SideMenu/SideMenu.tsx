import {
  ROUTE_FIRST_LOGIN,
  ROUTE_LOGIN,
  ROUTE_RECOVER_PASSWORD
} from '@/routes/Pages/Auth/Auth.paths'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useLocation } from 'react-router-dom'

interface SideMenuContextData {
  visible: boolean
  showMenu: () => void
  hideMenu: () => void
}

const Context = createContext<SideMenuContextData>({} as SideMenuContextData)

interface Props {
  children: ReactNode
}

function SideMenuContext({ children }: Props) {
  const location = useLocation()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    switch (location.pathname) {
      case ROUTE_LOGIN:
      case ROUTE_RECOVER_PASSWORD:
      case ROUTE_FIRST_LOGIN:
      case '/auth/reset-password/':
        setVisible(false)
        break

      default:
        setVisible(true)
        break
    }
  }, [location])

  const showMenu = useCallback(() => {
    setVisible(true)
  }, [])

  const hideMenu = useCallback(() => {
    setVisible(false)
  }, [])

  const providerValue = useMemo(
    () => ({ visible, showMenu, hideMenu }),
    [visible, showMenu, hideMenu]
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function useSideMenuContext(): SideMenuContextData {
  return useContext(Context)
}

export { SideMenuContext, useSideMenuContext }

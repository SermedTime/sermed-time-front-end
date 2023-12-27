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

import {
  ROUTE_LOGIN,
  ROUTE_RECOVER_PASSWORD
} from '@/routes/Pages/Auth/Auth.paths'

import { ROUTE_TERMS_OF_USE } from '@/routes/Pages/Pages.paths'

interface FooterContextData {
  visible: boolean
  showFooter: () => void
  hideFooter: () => void
}

const Context = createContext<FooterContextData>({} as FooterContextData)

interface Props {
  children: ReactNode
}

function FooterContext({ children }: Props) {
  const location = useLocation()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    switch (location.pathname) {
      case ROUTE_LOGIN:
      case ROUTE_RECOVER_PASSWORD:
      case ROUTE_TERMS_OF_USE:
        setVisible(false)
        break

      default:
        setVisible(true)
        break
    }
  }, [location])

  const showFooter = useCallback(() => {
    setVisible(true)
  }, [])

  const hideFooter = useCallback(() => {
    setVisible(false)
  }, [])

  const providerValue = useMemo(
    () => ({ visible, showFooter, hideFooter }),
    [visible, showFooter, hideFooter]
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function useFooterContext() {
  return useContext(Context)
}

export { FooterContext, useFooterContext }

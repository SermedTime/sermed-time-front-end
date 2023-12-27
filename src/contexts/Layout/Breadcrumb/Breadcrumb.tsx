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

import { IBreadcrumb } from '@/components/Layout/Breadcrumb/Breadcrumb.interface'

interface BreadcrumbContextData {
  breadcrumb: IBreadcrumb[]
  setPageBreadcrumb: (items: IBreadcrumb[]) => void
}

const Context = createContext<BreadcrumbContextData>(
  {} as BreadcrumbContextData
)

interface Props {
  children: ReactNode
}

function BreadcrumbContext({ children }: Props) {
  const location = useLocation()

  const [breadcrumb, setBreadcrumb] = useState<IBreadcrumb[]>([])

  useEffect(() => {
    switch (location.pathname) {
      case ROUTE_LOGIN:
      case ROUTE_RECOVER_PASSWORD:
        setBreadcrumb([])
        break

      default:
        break
    }
  }, [location])

  const setPageBreadcrumb = useCallback((items: IBreadcrumb[]) => {
    setBreadcrumb(items)
  }, [])

  const providerValue = useMemo(
    () => ({ breadcrumb, setPageBreadcrumb }),
    [breadcrumb, setPageBreadcrumb]
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function useBreadcrumbContext(): BreadcrumbContextData {
  return useContext(Context)
}

export { BreadcrumbContext, useBreadcrumbContext }

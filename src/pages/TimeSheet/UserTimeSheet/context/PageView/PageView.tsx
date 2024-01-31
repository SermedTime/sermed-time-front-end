import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

interface PageViewContextData {
  view: string
  setView: React.Dispatch<
    React.SetStateAction<'summary' | 'payslips' | 'benefits'>
  >
  pageTitle: string
}

const Context = createContext<PageViewContextData>({} as PageViewContextData)

interface Props {
  children: ReactNode
}

function PageViewContext({ children }: Props) {
  const [view, setView] = useState<'summary' | 'payslips' | 'benefits'>(
    'summary'
  )

  const [pageTitle, setPageTitle] = useState<string>('Resumo')

  useEffect(() => {
    switch (view) {
      case 'summary':
        setPageTitle('Resumo')
        break

      case 'payslips':
        setPageTitle('Holerites')
        break

      case 'benefits':
        setPageTitle('Benefícios')
        break

      default:
        setPageTitle('Resumo')
        break
    }
  }, [view])

  const providerValue = useMemo(
    () => ({ view, setView, pageTitle }),
    [view, setView, pageTitle]
  )

  return <Context.Provider value={providerValue}>{children}</Context.Provider>
}

function usePageViewContext(): PageViewContextData {
  return useContext(Context)
}

export { PageViewContext, usePageViewContext }

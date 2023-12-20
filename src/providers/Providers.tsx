import { ReactNode } from 'react'

import { ThemeProvider } from './Theme'

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>
}

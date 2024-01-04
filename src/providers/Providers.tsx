import React, { ReactNode } from 'react'

import { ThemeProvider } from './Theme'
import { ReactQueryProvider } from './ReactQuery'

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  )
}

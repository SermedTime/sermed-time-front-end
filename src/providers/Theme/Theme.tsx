import { ReactNode } from 'react'

import { ThemeProvider as Theme } from 'styled-components'

import { theme } from '@/styles/theme'

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  return <Theme theme={theme}>{children}</Theme>
}

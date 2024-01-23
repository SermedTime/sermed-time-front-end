import { ReactNode } from 'react'
import { RefreshKeyContext } from './Refresh'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return <RefreshKeyContext>{children}</RefreshKeyContext>
}

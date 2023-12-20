import { ReactNode } from 'react'

import { Container } from './Totals.styles'

interface Props {
  children: ReactNode
}

export function Totals({ children }: Props) {
  return <Container>{children}</Container>
}

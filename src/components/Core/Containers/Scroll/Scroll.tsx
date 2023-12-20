import { ReactNode } from 'react'

import { Container, Scrollable } from './Scroll.styles'

interface Props {
  children: ReactNode
}

export function Scroll({ children }: Props) {
  return (
    <Container>
      <Scrollable>{children}</Scrollable>
    </Container>
  )
}

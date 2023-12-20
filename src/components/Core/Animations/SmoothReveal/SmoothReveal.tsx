import { ReactNode } from 'react'

import { Container } from './SmoothReveal.styles'

interface Props {
  visible?: boolean
  children: ReactNode
}

export function SmoothReveal({ visible, children }: Props) {
  return (
    <Container className={`${visible ? 'visible' : ''}`}>{children}</Container>
  )
}

SmoothReveal.defaultProps = {
  visible: undefined
}

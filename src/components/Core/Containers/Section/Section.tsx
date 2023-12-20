import { ReactNode } from 'react'

import { Container } from './Section.styles'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Section({ size, children }: Props) {
  return <Container size={size}>{children}</Container>
}

Section.defaultProps = {
  size: undefined
}

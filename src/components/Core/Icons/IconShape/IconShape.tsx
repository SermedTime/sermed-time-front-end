import { ReactNode } from 'react'

import { Container } from './IconShape.styles'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  mode?: 'success' | 'helper' | 'warning' | undefined
  children: ReactNode
}

export function IconShape({ size, mode, children }: Props) {
  return (
    <Container size={size} mode={mode}>
      {children}
    </Container>
  )
}

IconShape.defaultProps = {
  size: undefined,
  mode: undefined
}

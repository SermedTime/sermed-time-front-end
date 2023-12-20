import { ReactNode } from 'react'

import { Container } from './Caption.styles'

interface Props {
  size: 'sm' | 'lg'
  className?: string
  children: string | number | ReactNode
}

export function Caption({ size, className, children }: Props) {
  return (
    <Container size={size} className={className}>
      {children}
    </Container>
  )
}

Caption.defaultProps = {
  className: undefined
}

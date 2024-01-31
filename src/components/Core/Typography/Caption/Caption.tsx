import { ReactNode } from 'react'

import { Container } from './Caption.styles'

interface Props {
  size: 'sm' | 'lg'
  fontWeigth?: 'bold'
  className?: string
  children: string | number | ReactNode
}

export function Caption({ size, fontWeigth, className, children }: Props) {
  return (
    <Container fontWeigth={fontWeigth} size={size} className={className}>
      {children}
    </Container>
  )
}

Caption.defaultProps = {
  className: undefined,
  fontWeigth: undefined
}

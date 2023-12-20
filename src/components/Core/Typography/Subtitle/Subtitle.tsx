import { ReactNode } from 'react'

import { Container } from './Subtitle.styles'

interface Props {
  size: 'xs' | 'sm' | 'lg'
  className?: string
  children: string | number | ReactNode
}

export function Subtitle({ size, className, children }: Props) {
  return (
    <Container size={size} className={className}>
      {children}
    </Container>
  )
}

Subtitle.defaultProps = {
  className: undefined
}

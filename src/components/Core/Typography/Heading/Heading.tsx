import { ReactNode } from 'react'

import { Container } from './Heading.styles'

interface Props {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'display'
  className?: string
  children: string | number | ReactNode
}

export function Heading({ size, className, children }: Props) {
  return (
    <Container size={size} className={className}>
      {children}
    </Container>
  )
}

Heading.defaultProps = {
  className: undefined
}

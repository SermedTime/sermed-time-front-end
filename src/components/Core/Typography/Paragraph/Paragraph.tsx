import { ReactNode } from 'react'

import { Container } from './Paragraph.styles'

interface Props {
  size: 'sm' | 'lg'
  className?: string
  children: string | number | ReactNode
}

export function Paragraph({ size, className, children }: Props) {
  return (
    <Container size={size} className={className}>
      {children}
    </Container>
  )
}

Paragraph.defaultProps = {
  className: undefined
}

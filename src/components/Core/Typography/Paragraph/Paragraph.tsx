import { ReactNode } from 'react'

import { Container } from './Paragraph.styles'

interface Props {
  size: 'sm' | 'lg'
  color?: 'neutral' | 'warning' | 'success'
  className?: string
  children: string | number | ReactNode
}

export function Paragraph({ size, color, className, children }: Props) {
  return (
    <Container size={size} className={className} color={color}>
      {children}
    </Container>
  )
}

Paragraph.defaultProps = {
  className: undefined,
  color: undefined
}

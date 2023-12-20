import { ReactNode } from 'react'

import { Container } from './Tag.styles'

interface Props {
  display?: 'block' | 'auto'
  disabled?: boolean
  highlight?: boolean
  status?:
    | 'default'
    | 'success'
    | 'helper'
    | 'warning'
    | 'neutral'
    | 'brand-secondary-pure'
  hover?: boolean
  onClick?: () => void
  children: ReactNode
}

export function Tag({
  display,
  disabled,
  highlight,
  status,
  hover,
  onClick,
  children
}: Props) {
  return (
    <Container
      display={display}
      disabled={disabled}
      highlight={highlight}
      status={status}
      hover={hover}
      onClick={() => {
        !disabled && onClick && onClick()
      }}
    >
      {children}
    </Container>
  )
}

Tag.defaultProps = {
  display: undefined,
  disabled: undefined,
  highlight: undefined,
  status: undefined,
  hover: undefined,
  onClick: undefined
}

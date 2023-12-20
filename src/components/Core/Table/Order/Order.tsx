import { ReactNode } from 'react'

import { Icon } from 'components/Core/Icons/Icon'

import { IOrder } from './Order.interface'

import { Container } from './Order.styles'

interface Props {
  order: IOrder
  onClick: () => void
  children: ReactNode
}

export function Order({ order, onClick, children }: Props) {
  function handleIcon() {
    switch (order) {
      case 'asc':
        return 'expand_less'

      case 'desc':
        return 'expand_more'

      default:
        return 'unfold_more'
    }
  }

  return (
    <Container order={order} onClick={onClick}>
      {children}

      <Icon size="sm" icon={handleIcon()} />
    </Container>
  )
}

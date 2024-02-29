import { Icon } from '@/components/Core/Icons/Icon'

import { Container } from './Avatar.styles'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

export function UserAvatar({ size }: Props) {
  return (
    <Container size={size}>
      <Icon appearance="outlined" size="lg" icon="person" />
    </Container>
  )
}

UserAvatar.defaultProps = {
  size: undefined
}

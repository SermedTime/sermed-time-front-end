import Placeholder from 'react-bootstrap/Placeholder'

import { Container } from './Skeleton.styles'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

export function Skeleton({ size }: Props) {
  return (
    <Container size={size}>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
    </Container>
  )
}

Skeleton.defaultProps = {
  size: undefined
}

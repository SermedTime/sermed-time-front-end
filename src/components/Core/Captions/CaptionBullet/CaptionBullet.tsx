import { Paragraph } from '../../Typography/Paragraph'

import { ICaptionBullet } from './CaptionBullet.interface'
import { Wrapper, Container } from './CaptionBullet.styles'

export function CaptionBullet({ color, label }: ICaptionBullet) {
  return (
    <Wrapper>
      <Container color={color} />

      {label && <Paragraph size="sm">{label}</Paragraph>}
    </Wrapper>
  )
}

CaptionBullet.defaultProps = {
  label: undefined
}

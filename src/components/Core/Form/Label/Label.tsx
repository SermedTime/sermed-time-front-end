import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Heading } from '@/components/Core/Typography/Heading'
import { Tooltip } from '@/components/Core/Tooltip'
import { Icon } from '@/components/Core/Icons/Icon'

import { Container } from './Label.styles'

interface Props {
  htmlFor?: string
  size?: 'sm' | 'lg'
  tooltip?: string
  children: string
}

export function Label({ htmlFor, size, tooltip, children }: Props) {
  return (
    <Container className="form-label" size={size} htmlFor={htmlFor}>
      {size === 'sm' ? (
        <>
          <Paragraph size="sm">{children}</Paragraph>

          {tooltip && (
            <Tooltip place="top" title={tooltip}>
              <Icon size="sm" icon="info" />
            </Tooltip>
          )}
        </>
      ) : (
        <div>
          <Heading size="xs">{children}</Heading>

          {tooltip && (
            <Tooltip place="top" title={tooltip}>
              <Icon size="sm" icon="info" />
            </Tooltip>
          )}
        </div>
      )}
    </Container>
  )
}

Label.defaultProps = {
  htmlFor: undefined,
  size: undefined,
  tooltip: undefined
}

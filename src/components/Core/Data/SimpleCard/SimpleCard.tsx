import { Section } from 'components/Core/Containers/Section'
import { Icon } from 'components/Core/Icons/Icon'
import { Heading } from 'components/Core/Typography/Heading'
import { Caption } from 'components/Core/Typography/Caption'
import { Paragraph } from 'components/Core/Typography/Paragraph'
import { Skeleton } from 'components/Core/Skeleton'

import { IconWrapper } from './SimpleCard.styles'

interface Props {
  size?: 'sm' | 'lg'
  icon: string
  dangerMode?: boolean
  value: string | number | undefined
  caption: string
}

export function SimpleCard({ size, icon, dangerMode, value, caption }: Props) {
  return (
    <Section size={size}>
      <div className="d-flex align-items-center">
        <IconWrapper>
          <Icon appearance="outlined" size={size} icon={icon} />
        </IconWrapper>

        <div>
          {value || value === 0 ? (
            <div>
              <Heading
                size="sm"
                className={`${dangerMode ? 'text-warning-pure' : ''}`}
              >
                {value}
              </Heading>
            </div>
          ) : (
            <Skeleton />
          )}

          {size === 'sm' && (
            <Caption size="lg" className="mt-2">
              {caption}
            </Caption>
          )}

          {(!size || size === 'lg') && (
            <Paragraph size="sm">{caption}</Paragraph>
          )}
        </div>
      </div>
    </Section>
  )
}

SimpleCard.defaultProps = {
  size: undefined,
  dangerMode: undefined
}

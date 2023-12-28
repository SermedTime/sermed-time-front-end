import { Row, Col } from 'react-bootstrap'

import { Container, TextHeading, TextValue } from './InfoCard.styles'
import { Section } from '../../Containers/Section'
import { Icon } from '../../Icons/Icon'
import { Paragraph } from '../../Typography/Paragraph'
import { Heading } from '../../Typography/Heading'
import { Skeleton } from '../../Skeleton'

interface Props {
  icon: string
  heading?: string
  headingColor?: 'warning'
  value: number | string | undefined
  valueColor?: 'success' | 'warning'
  suffix?: string
  caption: string
  indicator?: boolean
}

export function InfoCard({
  icon,
  heading,
  headingColor,
  value,
  valueColor,
  suffix,
  caption,
  indicator
}: Props) {
  return (
    <Container indicator={indicator}>
      <Section size="sm">
        <Row>
          <Col>
            <Icon appearance="outlined" size="lg" icon={icon} />
          </Col>
        </Row>

        {heading && (
          <Row className="mt-2">
            <Col>
              <TextHeading color={headingColor}>
                <Paragraph size="sm">{heading}</Paragraph>
              </TextHeading>
            </Col>
          </Row>
        )}

        <Row>
          <Col xs={value ? 'auto' : 7}>
            {value || value === 0 ? (
              <TextValue className="my-1" color={valueColor}>
                <Heading size="sm">{`${value} ${suffix || ''}`}</Heading>
              </TextValue>
            ) : (
              <Skeleton />
            )}
          </Col>
        </Row>

        <Paragraph size="sm">{caption}</Paragraph>
      </Section>
    </Container>
  )
}

InfoCard.defaultProps = {
  heading: undefined,
  headingColor: undefined,
  valueColor: undefined,
  suffix: undefined,
  indicator: undefined
}

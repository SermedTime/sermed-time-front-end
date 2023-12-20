import { Row, Col } from 'react-bootstrap'

import { IWidget } from 'components/Core/Containers/Widget/Widget.interface'

import { Widget } from 'components/Core/Containers/Widget'
import { Heading } from 'components/Core/Typography/Heading'
import { Caption } from 'components/Core/Typography/Caption'
import { Skeleton } from 'components/Core/Skeleton'

import { IIndicatorByStatus } from './IndicatorByStatus.interface'
import { Status } from './IndicatorByStatus.styles'

interface Props extends Omit<IWidget, 'children'> {
  data: IIndicatorByStatus[] | null
}

export function WidgetIndicatorByStatus({
  icon,
  iconAppearence,
  heading,
  caption,
  actionIcon,
  actionDisabled,
  data,
  onClick
}: Props) {
  return (
    <Widget
      icon={icon}
      iconAppearence={iconAppearence}
      heading={heading}
      caption={caption}
      actionIcon={actionIcon}
      actionDisabled={actionDisabled}
      onClick={onClick}
    >
      <Row className="pb-3">
        <Col>
          {data ? (
            <>
              {data.map((item, idx) => (
                <Row key={idx} className="justify-content-center mt-4">
                  <Col xs="auto">
                    <Status status={item.status}>
                      <Caption size="lg">{item.description}</Caption>

                      <Heading size="sm">
                        {`${item.amount}${item?.suffix || ''}`}
                      </Heading>
                    </Status>
                  </Col>
                </Row>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 4 }).map((_, idx) => (
                <Row key={idx} className="justify-content-center mt-4">
                  <Col xs={8}>
                    <Skeleton size="lg" />
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Widget>
  )
}

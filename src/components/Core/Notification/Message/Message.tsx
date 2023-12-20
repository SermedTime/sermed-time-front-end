import { Row, Col } from 'react-bootstrap'

import { SpringValue } from 'react-spring'

import { useNotificationContext } from 'contexts/Notification'

import { INotificationMessage } from 'contexts/Notification/Notification.interface'

import { Heading } from 'components/Core/Typography/Heading'
import { ButtonIcon } from 'components/Core/Buttons/ButtonIcon'
import { Paragraph } from 'components/Core/Typography/Paragraph'
import { Button } from 'components/Core/Buttons/Button'

import { Container } from './Message.styles'

interface Props {
  message: INotificationMessage
  style?: {
    opacity: SpringValue<string>
  }
}

export function Message({ message, style }: Props) {
  const { removeNotification } = useNotificationContext()

  return (
    <Container style={style}>
      <Row className="justify-content-between align-items-center mb-3">
        <Col xs={11} className="title">
          <Heading size="md">{message.title}</Heading>
        </Col>

        <Col xs={1}>
          <div className="d-flex justify-content-end close-button">
            <ButtonIcon
              size="sm"
              icon="close"
              onClick={() => {
                removeNotification(message.id)
              }}
            />
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={11}>
          <Paragraph size="sm" className="description">
            {message.description}
          </Paragraph>
        </Col>
      </Row>

      <Row>
        <Col xs="auto">
          <Button
            type="button"
            styles="primary"
            onClick={() => {
              removeNotification(message.id)

              message.onConfirm && message.onConfirm()
            }}
          >
            {message.confirmTxt}
          </Button>
        </Col>

        <Col xs="auto" className="cancel-button">
          <Button
            type="button"
            styles="tertiary"
            onClick={() => {
              removeNotification(message.id)

              message.onCancel && message.onCancel()
            }}
          >
            {message.cancelTxt}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

Message.defaultProps = {
  style: undefined
}

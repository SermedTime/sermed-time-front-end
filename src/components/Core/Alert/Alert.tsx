import { useEffect } from 'react'

import { useAlertContext } from '@/contexts/Alert'

import { Row, Col } from 'react-bootstrap'

import { ButtonIcon } from '../Buttons/ButtonIcon'
import { Icon } from '../Icons/Icon'
import { Heading } from '../Typography/Heading'
import { Paragraph } from '../Typography/Paragraph'
import { Subtitle } from '../Typography/Subtitle'
import { Button } from '../Buttons/Button'

import {
  Backdrop,
  Dialog,
  Content,
  CloseButton,
  AlertIcon
} from './Alert.styles'

export function Alert() {
  const { alert, removeAlert } = useAlertContext()

  useEffect(() => {
    if (alert) {
      document.body.classList.add('no-overflow')
    } else {
      const hasOtherModals = document.getElementsByClassName('custom-modal')

      if (hasOtherModals.length === 0) {
        document.body.classList.remove('no-overflow')
      }
    }
  }, [alert])

  function handleIconType() {
    if (alert) {
      switch (alert.iconType) {
        case 'success':
          return 'done'

        case 'helper':
          return 'warning'

        case 'warning':
          return 'error'

        default:
          return ''
      }
    }

    return ''
  }

  if (!alert) return null

  return (
    <Backdrop>
      <Dialog>
        <Content>
          <CloseButton>
            <ButtonIcon size="md" icon="close" onClick={removeAlert} />
          </CloseButton>

          {alert.iconModal && alert.titleModal && (
            <Row>
              <Col xs="auto">
                <div className="d-flex align-items-center gap-2">
                  <Icon size="lg" icon={alert.iconModal} />

                  <Heading size="xs">{alert.titleModal}</Heading>
                </div>
              </Col>
            </Row>
          )}

          <Row className="justify-content-center text-center py-5">
            <Col xs={8}>
              <Row className="justify-content-center mb-4">
                <Col xs="auto">
                  <AlertIcon type={alert.iconType}>
                    <span className="material-icons">{handleIconType()}</span>
                  </AlertIcon>
                </Col>
              </Row>

              <Heading size="sm">{alert.title}</Heading>

              {alert.subtitle && (
                <Paragraph size="sm" className="mt-2">
                  {alert.subtitle}
                </Paragraph>
              )}

              <Subtitle size="lg" className="mt-5 mb-4">
                {alert.description}
              </Subtitle>

              <Row className="justify-content-center">
                <Col xs="auto">
                  <Button
                    type="button"
                    styles="tertiary"
                    onClick={() => {
                      alert.onCancel && alert.onCancel()
                      removeAlert()
                    }}
                  >
                    {alert.cancelTxt}
                  </Button>
                </Col>

                <Col xs="auto">
                  <Button
                    type="button"
                    styles="primary"
                    mode={alert.buttonType}
                    onClick={() => {
                      alert.onConfirm && alert.onConfirm()

                      removeAlert()
                    }}
                  >
                    {alert.confirmTxt}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Dialog>
    </Backdrop>
  )
}

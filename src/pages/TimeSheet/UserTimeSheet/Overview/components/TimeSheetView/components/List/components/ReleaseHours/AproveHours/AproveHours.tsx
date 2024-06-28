import { useEffect, useState } from 'react'

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { put } from '@/services/api/sermed-api/sermed-api'

import { Row, Col } from 'react-bootstrap'

import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Icon } from '@/components/Core/Icons/Icon'
import { Heading } from '@/components/Core/Typography/Heading'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Button } from '@/components/Core/Buttons/Button'

import {
  Backdrop,
  Dialog,
  Content,
  CloseButton,
  AlertIcon
} from '../ReleaseHours.styles'

interface Props {
  onClose: (hasChanges: boolean) => void
  timeshift_id: string
}

export function AproveHours({ onClose, timeshift_id }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (timeshift_id) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [timeshift_id])

  function handleIconType() {
    return 'pending_actions'
  }

  async function handleOnSubmit(aprroveAs: 'BH' | 'HE') {
    try {
      showLoader()

      const { data, message } = await put(
        `/overview/time-sheet/update-overtime/${timeshift_id}`,
        {
          overtimeStatus: 'A',
          releaseType: aprroveAs
        }
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `${
            aprroveAs === 'BH'
              ? 'Banco de horas aprovado'
              : 'Hora extra aprovada'
          } com sucesso`
        })

        onClose(true)
      }

      if (message) {
        addToast({
          type: 'warning',
          title: 'Ooops',
          description: message
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    visible && (
      <Backdrop>
        <Dialog>
          <Content>
            <CloseButton>
              <ButtonIcon
                size="md"
                icon="close"
                onClick={() => onClose(false)}
              />
            </CloseButton>

            <Row>
              <Col xs="auto">
                <div className="d-flex align-items-center gap-2">
                  <Icon size="lg" icon="priority_high" />

                  <Heading size="xs">Cancelar</Heading>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center text-center py-5">
              <Col xs={8}>
                <Row className="justify-content-center mb-4">
                  <Col xs="auto">
                    <AlertIcon type="success">
                      <span className="material-icons">{handleIconType()}</span>
                    </AlertIcon>
                  </Col>
                </Row>

                <Heading size="sm">Autorizar Horas Extras</Heading>

                <Subtitle size="sm" className="mt-5 mb-4">
                  Autorizar horas como?
                </Subtitle>

                <Row className="justify-content-center">
                  <Col xs="auto">
                    <Button
                      type="button"
                      mode="success"
                      styles="primary"
                      onClick={() => {
                        handleOnSubmit('HE')
                      }}
                    >
                      Hora Extra
                    </Button>
                  </Col>

                  <Col xs="auto">
                    <Button
                      type="button"
                      styles="primary"
                      onClick={() => {
                        handleOnSubmit('BH')
                      }}
                    >
                      Banco de Horas
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
        </Dialog>
      </Backdrop>
    )
  )
}

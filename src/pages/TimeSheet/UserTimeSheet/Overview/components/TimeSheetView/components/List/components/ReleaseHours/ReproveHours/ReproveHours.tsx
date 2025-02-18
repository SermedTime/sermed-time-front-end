import { useEffect, useState } from 'react'

import { useAlertContext } from '@/contexts/Alert'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useParams } from 'react-router-dom'

import { put } from '@/services/api/sermed-api/sermed-api'

import { Col, Row } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Icon } from '@/components/Core/Icons/Icon'
import { Heading } from '@/components/Core/Typography/Heading'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Button } from '@/components/Core/Buttons/Button'
import { TextArea } from '@/components/Core/Form/Fields/TextArea'

import * as S from '../ReleaseHours.styles'

import {
  IReproveHours,
  initialValues,
  validationSchema
} from './ReproveHours.form'

interface Props {
  onClose: (hasChanges: boolean) => void
  timeshift_id: string
}

export function ReproveHours({ onClose, timeshift_id }: Props) {
  const { uuid: userId } = useParams()
  const { addAlertOnCancel } = useAlertContext()
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

  function handleOnCancel(hasChanges: boolean) {
    if (!hasChanges) {
      onClose(false)
    } else {
      addAlertOnCancel(() => {
        onClose(false)
      })
    }
  }

  function handleIconType() {
    return 'pending_actions'
  }

  const handleOnSubmit = async (formValues: IReproveHours) => {
    try {
      showLoader()

      const { data, message } = await put(
        `/overview/time-sheet/update-overtime/user/${userId}/timesheet/${timeshift_id}`,
        {
          ...formValues
        }
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Horas reprovadas com sucesso'
        })

        onClose(false)
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
      <S.Backdrop>
        <S.Dialog>
          <S.Content>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleOnSubmit}
            >
              {({ touched, errors, dirty, isValid, values }) => (
                <>
                  <S.CloseButton>
                    <ButtonIcon
                      size="md"
                      icon="close"
                      onClick={() =>
                        handleOnCancel(!!values.reasorForRejection)
                      }
                    />
                  </S.CloseButton>

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
                          <S.AlertIcon type="warning">
                            <span className="material-icons">
                              {handleIconType()}
                            </span>
                          </S.AlertIcon>
                        </Col>
                      </Row>

                      <Heading size="sm">Reprovar Horas Extras</Heading>

                      <Subtitle size="sm" className="mt-5 mb-4">
                        Digite o motivo da reprovação
                      </Subtitle>

                      <Form>
                        <Row className="mb-4">
                          <Col>
                            <Field
                              as={TextArea}
                              name="reasorForRejection"
                              placeholder="Insira o motivo"
                              error={
                                touched.reasorForRejection &&
                                !!errors.reasorForRejection
                              }
                              helperText={
                                touched.reasorForRejection &&
                                !!errors.reasorForRejection
                                  ? errors.reasorForRejection
                                  : ''
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="justify-content-center">
                          <Col xs="auto">
                            <Button
                              type="submit"
                              mode="warning"
                              styles="primary"
                              disabled={!dirty || !isValid}
                            >
                              Reprovar
                            </Button>
                          </Col>

                          <Col xs="auto">
                            <Button
                              type="button"
                              styles="tertiary"
                              onClick={() => {
                                handleOnCancel(!!values.reasorForRejection)
                              }}
                            >
                              Cancelar
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </>
              )}
            </Formik>
          </S.Content>
        </S.Dialog>
      </S.Backdrop>
    )
  )
}

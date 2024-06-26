import { useEffect, useState } from 'react'

import { useAlertContext } from '@/contexts/Alert'

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
  const { addAlertOnCancel } = useAlertContext()

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

  const onSubmit = (formValues: IReproveHours): void => {
    console.log(formValues)
  }

  return (
    visible && (
      <S.Backdrop>
        <S.Dialog>
          <S.Content>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ touched, errors, dirty, isValid, values }) => (
                <>
                  <S.CloseButton>
                    <ButtonIcon
                      size="md"
                      icon="close"
                      onClick={() => handleOnCancel(!!values.description)}
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
                              name="description"
                              placeholder="Insira a descrição"
                              error={
                                touched.description && !!errors.description
                              }
                              helperText={
                                touched.description && !!errors.description
                                  ? errors.description
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
                                handleOnCancel(!!values.description)
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

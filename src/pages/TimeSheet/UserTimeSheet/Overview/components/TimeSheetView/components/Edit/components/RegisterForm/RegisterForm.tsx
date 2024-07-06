import { useAlertContext } from '@/contexts/Alert'

import { Field, Form, Formik } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { Skeleton } from '@/components/Core/Skeleton'
import { InputText } from '@/components/Core/Form/Fields/InputText'

import { timeMask } from '@/utils/masks'

import { Button } from '@/components/Core/Buttons/Button'
import { TextArea } from '@/components/Core/Form/Fields/TextArea'
import { ITimeSheetForm, validationSchema } from './RegisterForm.form'

interface Props {
  initialValues: ITimeSheetForm | null
  readonly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: ITimeSheetForm) => void
}

export function RegisterTimeSheet({
  initialValues,
  onCancel,
  onSubmit,
  readonly
}: Props) {
  const { addAlertOnCancel } = useAlertContext()

  function handleOnCancel(hasChanges: boolean) {
    if (!hasChanges) {
      onCancel(false)
    } else {
      addAlertOnCancel(() => {
        onCancel(false)
      })
    }
  }

  if (!initialValues) {
    return (
      <Row>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
      </Row>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, dirty, isValid, setFieldValue }) => (
        <Form>
          <Row className="mb-6">
            <Col xs={2}>
              <Field
                as={InputText}
                label="Entrada 1"
                name="firstEntry"
                maxLength={5}
                error={touched.firstEntry && !!errors.firstEntry}
                readOnly={readonly}
                helperText={
                  touched.firstEntry && !!errors.firstEntry
                    ? errors.firstEntry
                    : ''
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = timeMask(e.target.value)

                  setFieldValue('firstEntry', e.target.value)
                }}
              />
            </Col>

            <Col xs={2}>
              <Field
                as={InputText}
                label="Saída 1"
                name="firstExit"
                maxLength={5}
                error={touched.firstExit && !!errors.firstExit}
                readOnly={readonly}
                helperText={
                  touched.firstExit && !!errors.firstExit
                    ? errors.firstExit
                    : ''
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = timeMask(e.target.value)

                  setFieldValue('firstExit', e.target.value)
                }}
              />
            </Col>

            <Col xs={2}>
              <Field
                as={InputText}
                label="Entrada 2"
                name="secondEntry"
                maxLength={5}
                error={touched.secondEntry && !!errors.secondEntry}
                readOnly={readonly}
                helperText={
                  touched.secondEntry && !!errors.secondEntry
                    ? errors.secondEntry
                    : ''
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = timeMask(e.target.value)

                  setFieldValue('secondEntry', e.target.value)
                }}
              />
            </Col>

            <Col xs={2}>
              <Field
                as={InputText}
                label="Saída 2"
                name="secondExit"
                maxLength={5}
                error={touched.secondExit && !!errors.secondExit}
                readOnly={readonly}
                helperText={
                  touched.secondExit && !!errors.secondExit
                    ? errors.secondExit
                    : ''
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = timeMask(e.target.value)

                  setFieldValue('secondExit', e.target.value)
                }}
              />
            </Col>

            <Col xs={2}>
              <Field
                as={InputText}
                label="Entrada 3"
                name="thirdEntry"
                maxLength={5}
                error={touched.thirdEntry && !!errors.thirdEntry}
                readOnly={readonly}
                helperText={
                  touched.thirdEntry && !!errors.thirdEntry
                    ? errors.thirdEntry
                    : ''
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = timeMask(e.target.value)

                  setFieldValue('thirdEntry', e.target.value)
                }}
              />
            </Col>

            <Col xs={2}>
              <Field
                as={InputText}
                label="Saída 3"
                name="thirdExit"
                maxLength={5}
                error={touched.thirdExit && !!errors.thirdExit}
                readOnly={readonly}
                helperText={
                  touched.thirdExit && !!errors.thirdExit
                    ? errors.thirdExit
                    : ''
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = timeMask(e.target.value)

                  setFieldValue('thirdExit', e.target.value)
                }}
              />
            </Col>
          </Row>

          {values.overtimeStatus === 'R' && (
            <Row className="mt-4">
              <Col>
                <Field
                  as={TextArea}
                  name="reasorForRejection"
                  placeholder="Insira o motivo"
                  error={
                    touched.reasorForRejection && !!errors.reasorForRejection
                  }
                  helperText={
                    touched.reasorForRejection && !!errors.reasorForRejection
                      ? errors.reasorForRejection
                      : ''
                  }
                  readOnly
                />
              </Col>
            </Row>
          )}

          {!readonly && (
            <Row className="justify-content-end mt-4">
              <Col xs="auto">
                <Row>
                  <Col xs="auto">
                    <Button
                      type="button"
                      styles="tertiary"
                      onClick={() => handleOnCancel(dirty)}
                    >
                      Cancelar
                    </Button>
                  </Col>

                  <Col xs="auto">
                    <Button
                      type="submit"
                      styles="primary"
                      disabled={!dirty || !isValid}
                    >
                      Salvar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Form>
      )}
    </Formik>
  )
}

RegisterTimeSheet.defaultProps = {
  readonly: undefined
}

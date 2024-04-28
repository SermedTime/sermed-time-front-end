import { useAlertContext } from '@/contexts/Alert'

import { Col, Row } from 'react-bootstrap'
import { Skeleton } from '@/components/Core/Skeleton'

import { Field, Form, Formik } from 'formik'
import { Switch } from '@/components/Core/Form/Fields/Switch'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { Button } from '@/components/Core/Buttons/Button'
import { IWorkingDayRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: IWorkingDayRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: IWorkingDayRegisterForm) => void
}

export function WorkingDayRegisterForm({
  mode,
  initialValues,
  readOnly,
  onCancel,
  onSubmit
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
      <>
        <Row className="mb-4">
          <Col xs={2}>
            <Skeleton />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xxl={12}>
            <Skeleton size="lg" />
          </Col>
        </Row>
      </>
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
          <Row className="mb-4">
            <Col xs="auto">
              <Field
                as={Switch}
                description="Ativo"
                name="status"
                checked={values.status === 'active'}
                disabled={mode === 'create'}
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { checked } = e.target

                  setFieldValue('status', checked ? 'active' : 'inactive')
                }}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={12}>
              <Field
                as={InputText}
                label="Descrição"
                name="workingDayName"
                placeholder="Insira o nome da jornadad de trabalho"
                type="text"
                error={touched.workingDayName && !!errors.workingDayName}
                helperText={
                  touched.workingDayName && !!errors.workingDayName
                    ? errors.workingDayName
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>

          {!readOnly && (
            <Row className="justify-content-end">
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
                      {mode === 'create' ? 'Cadastrar' : 'Salvar'}
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

WorkingDayRegisterForm.defaultProps = {
  readOnly: undefined
}

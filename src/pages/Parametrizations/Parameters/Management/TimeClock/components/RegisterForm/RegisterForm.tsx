import { Col, Row } from 'react-bootstrap'

import { useAlertContext } from '@/contexts/Alert'

import { Skeleton } from '@/components/Core/Skeleton'

import { Field, Form, Formik } from 'formik'
import { Switch } from '@/components/Core/Form/Fields/Switch'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { cnpjMask } from '@/utils/masks'
import { Button } from '@/components/Core/Buttons/Button'
import { ICompanyRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: ICompanyRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: ICompanyRegisterForm) => void
}

export function CompanyRegisterForm({
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
          <Col xxl={6}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={6}>
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
            <Col xl={6}>
              <Field
                as={InputText}
                label="Descrição"
                name="name"
                placeholder="Insira o nome do Relógio de Ponto"
                type="text"
                error={touched.name && !!errors.name}
                helperText={touched.name && !!errors.name ? errors.name : ''}
                readOnly={readOnly}
              />
            </Col>

            <Col xl={6}>
              <Field
                as={InputText}
                label="CNPJ"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                maxLength={18}
                type="text"
                error={touched.cnpj && !!errors.cnpj}
                helperText={touched.cnpj && !!errors.cnpj ? errors.cnpj : ''}
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = cnpjMask(e.target.value)

                  setFieldValue('cnpj', e.target.value)
                }}
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

CompanyRegisterForm.defaultProps = {
  readOnly: undefined
}

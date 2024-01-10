import { Col, Row } from 'react-bootstrap'

import { Field, Form, Formik } from 'formik'

import { Skeleton } from '@/components/Core/Skeleton'

import { useAlertContext } from '@/contexts/Alert'

import { Switch } from '@/components/Core/Form/Fields/Switch'
import { Button } from '@/components/Core/Buttons/Button'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { cnpjMask, cpfMask } from '@/utils/masks'

import { IUserRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: IUserRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: IUserRegisterForm) => void
}

export function UserRegisterForm({
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
        <Row className="mb-4">
          <Col xxl={6}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={6}>
            <Skeleton size="lg" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
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
                readOnly={readOnly}
                disabled={values.resignationDate !== null}
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
                label="CPF"
                name="cpf"
                placeholder="000.000.000-00"
                maxLength={15}
                type="text"
                error={touched.cpf && !!errors.cpf}
                helperText={touched.cpf && !!errors.cpf ? errors.cpf : ''}
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = cpfMask(e.target.value)

                  setFieldValue('cpf', e.target.value)
                }}
              />
            </Col>

            <Col xl={6}>
              <Field
                as={InputText}
                label="Nome"
                name="name"
                placeholder="José Antônio do Nascimento"
                type="text"
                error={touched.name && !!errors.name}
                helperText={touched.name && !!errors.name ? errors.name : ''}
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={6}>
              <Field
                as={InputText}
                label="Nome Social"
                name="socialName"
                placeholder="José Antônio"
                type="text"
                error={touched.socialName && !!errors.socialName}
                helperText={
                  touched.socialName && !!errors.socialName
                    ? errors.socialName
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={6}>
              <Field
                as={InputText}
                label="E-mail"
                name="email"
                placeholder="email@sermed.com.br"
                type="text"
                error={touched.email && !!errors.email}
                helperText={touched.email && !!errors.email ? errors.email : ''}
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={4}>
              <Field
                as={InputText}
                label="Empresa"
                name="companyName"
                placeholder="Digite o nome da Empresa"
                type="text"
                error={touched.companyName && !!errors.companyName}
                helperText={
                  touched.companyName && !!errors.companyName
                    ? errors.companyName
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={InputText}
                label="CNPJ"
                name="companyCnpj"
                placeholder="00.000.000/0000-00"
                type="text"
                error={touched.companyCnpj && !!errors.companyCnpj}
                helperText={
                  touched.companyCnpj && !!errors.companyCnpj
                    ? errors.companyCnpj
                    : ''
                }
                maxLength={18}
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = cnpjMask(e.target.value)

                  setFieldValue('companyCnpj', e.target.value)
                }}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={InputText}
                label="Função"
                name="position"
                placeholder="Digite a função"
                type="text"
                error={touched.position && !!errors.position}
                helperText={
                  touched.position && !!errors.position ? errors.position : ''
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={4}>
              <Field
                as={InputText}
                label="N° Folha de Pagamento"
                name="payrollNumber"
                placeholder="0000"
                type="text"
                error={touched.payrollNumber && !!errors.payrollNumber}
                helperText={
                  touched.payrollNumber && !!errors.payrollNumber
                    ? errors.payrollNumber
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={InputText}
                label="N° Identificador"
                name="employeeCode"
                placeholder="1234"
                type="text"
                error={touched.employeeCode && !!errors.employeeCode}
                helperText={
                  touched.employeeCode && !!errors.employeeCode
                    ? errors.employeeCode
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={InputText}
                label="N° PIS"
                name="pis"
                placeholder="00000000000"
                maxLength={11}
                type="text"
                error={touched.pis && !!errors.pis}
                helperText={touched.pis && !!errors.pis ? errors.pis : ''}
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={4}>
              <Field
                as={InputText}
                label="N° CTPS"
                name="ctps"
                placeholder="00000"
                maxLength={5}
                type="text"
                error={touched.ctps && !!errors.ctps}
                helperText={touched.ctps && !!errors.ctps ? errors.ctps : ''}
                readOnly={readOnly}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={InputText}
                label="Data de Admissão"
                name="admissionDate"
                placeholder="00/00/0000"
                type="date"
                error={touched.admissionDate && !!errors.admissionDate}
                helperText={
                  touched.admissionDate && !!errors.admissionDate
                    ? errors.admissionDate
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={InputText}
                label="Data de Demissão"
                name="resignationDate"
                placeholder="00/00/0000"
                type="date"
                error={touched.resignationDate && !!errors.resignationDate}
                helperText={
                  touched.resignationDate && !!errors.resignationDate
                    ? errors.resignationDate
                    : ''
                }
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const date = e.target.value

                  setFieldValue('status', date !== '' ? 'inactive' : 'active')
                  setFieldValue('resignationDate', date === '' ? null : date)
                }}
              />
            </Col>
          </Row>

          {/* <Row className="mb-4">
            <Col xs="auto">
              <Field
                as={Checkbox}
                description="Supervisor"
                name="isSupervisor"
                checked={values?.isSupervisor === true}
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { checked } = e.target

                  if (checked) {
                    setFieldValue('isSupervisor', true)
                  } else {
                    setFieldValue('isSupervisor', false)
                  }
                }}
              />
            </Col>
          </Row> */}

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

UserRegisterForm.defaultProps = {
  readOnly: undefined
}

import { useAlertContext } from '@/contexts/Alert'
import { useCompanyDropdown } from '@/hooks/services/Rules/Dropdown/useCompanies'
import { useWorkingDayDropdown } from '@/hooks/services/Rules/Dropdown/useWorkingDayDropdown'

import { Col, Row } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { Skeleton } from '@/components/Core/Skeleton'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { Select } from '@/components/Core/Form/Fields/Select'
import { Button } from '@/components/Core/Buttons/Button'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { IUserRegisterForm } from './RegisterForm.form'

interface Props {
  initialValues: IUserRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: IUserRegisterForm) => void
}

export function UserRegisterForm({
  initialValues,
  readOnly,
  onCancel,
  onSubmit
}: Props) {
  const { addAlertOnCancel } = useAlertContext()

  const { companies } = useCompanyDropdown()
  const { workingDays } = useWorkingDayDropdown()

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
          <Col xxl={6}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={6}>
            <Skeleton size="lg" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xxl={3}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={3}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={3}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={3}>
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, dirty, isValid, setFieldValue }) => (
        <Form>
          <Row className="mb-4">
            <Col xl={6}>
              <InputText
                label="CPF"
                name="cpf"
                placeholder="000.000.000-00"
                maxLength={15}
                type="text"
                value={values.cpf}
                readOnly={true}
              />
            </Col>

            <Col xl={6}>
              <InputText
                label="Nome"
                name="name"
                placeholder="José Antônio do Nascimento"
                type="text"
                value={values.name}
                readOnly={true}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={6}>
              <InputText
                label="Nome Social"
                name="socialName"
                placeholder="José Antônio"
                type="text"
                value={values.socialName}
                readOnly={true}
              />
            </Col>

            <Col xl={6}>
              <InputText
                label="E-mail"
                name="email"
                placeholder="email@sermed.com.br"
                type="text"
                value={values.email}
                readOnly={true}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={6}>
              <Select
                label="Empresa"
                name="companyUuid"
                placeholder="Selecione uma empresa"
                options={companies}
                value={values.companyUuid}
                readOnly={true}
              />
            </Col>

            <Col xl={6}>
              <InputText
                label="Função"
                name="position"
                placeholder="Digite a função"
                type="text"
                value={values.position}
                readOnly={true}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={3}>
              <InputText
                label="N° Folha de Pagamento"
                name="payrollNumber"
                placeholder="0000"
                type="text"
                value={values.payrollNumber}
                readOnly={true}
              />
            </Col>

            <Col xl={3}>
              <InputText
                label="N° Identificador"
                name="employeeCode"
                placeholder="1234"
                type="text"
                value={values.employeeCode}
                readOnly={true}
              />
            </Col>

            <Col xl={3}>
              <InputText
                label="N° PIS"
                name="pis"
                placeholder="00000000000"
                maxLength={11}
                type="text"
                value={values.pis}
                readOnly={true}
              />
            </Col>

            <Col xl={3}>
              <InputText
                label="N° CTPS"
                name="ctps"
                placeholder="00000"
                maxLength={5}
                type="text"
                value={values.ctps}
                readOnly={true}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={4}>
              <InputText
                label="Data de Admissão"
                name="admissionDate"
                placeholder="00/00/0000"
                type="date"
                value={values.admissionDate ? values.admissionDate : undefined}
                readOnly={true}
              />
            </Col>

            <Col xl={4}>
              <InputText
                label="Data de Admissão"
                name="admissionDate"
                placeholder="00/00/0000"
                type="date"
                value={values.admissionDate ? values.admissionDate : undefined}
                readOnly={true}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={Select}
                label="Jornada de Trabalho"
                name="workingDayId"
                placeholder="Selecione uma jornada"
                options={workingDays}
                value={values.workingDayId}
                onChange={({ value }: IOption) => {
                  setFieldValue('workingDayId', value)
                }}
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

UserRegisterForm.defaultProps = {
  readOnly: undefined
}

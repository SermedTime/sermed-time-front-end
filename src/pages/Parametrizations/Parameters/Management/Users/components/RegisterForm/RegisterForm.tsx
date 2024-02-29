import { Col, Row } from 'react-bootstrap'

import { Skeleton } from '@/components/Core/Skeleton'

import { useCompanyDropdown } from '@/hooks/services/Rules/Dropdown/useCompanies'

import { InputText } from '@/components/Core/Form/Fields/InputText'

import { Select } from '@/components/Core/Form/Fields/Select'

import { IUserRegisterForm } from './RegisterForm.form'

interface Props {
  initialValues: IUserRegisterForm | null
  readOnly?: boolean
}

export function UserRegisterForm({ initialValues, readOnly }: Props) {
  const { companies } = useCompanyDropdown()

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
    <>
      <Row className="mb-4">
        <Col xl={6}>
          <InputText
            label="CPF"
            name="cpf"
            placeholder="000.000.000-00"
            maxLength={15}
            type="text"
            value={initialValues.cpf}
            readOnly={readOnly}
          />
        </Col>

        <Col xl={6}>
          <InputText
            label="Nome"
            name="name"
            placeholder="José Antônio do Nascimento"
            type="text"
            value={initialValues.name}
            readOnly={readOnly}
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
            value={initialValues.socialName}
            readOnly={readOnly}
          />
        </Col>

        <Col xl={6}>
          <InputText
            label="E-mail"
            name="email"
            placeholder="email@sermed.com.br"
            type="text"
            value={initialValues.email}
            readOnly={readOnly}
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
            value={initialValues.companyUuid}
            readOnly={readOnly}
          />
        </Col>

        <Col xl={6}>
          <InputText
            label="Função"
            name="position"
            placeholder="Digite a função"
            type="text"
            value={initialValues.position}
            readOnly={readOnly}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xl={4}>
          <InputText
            label="N° Folha de Pagamento"
            name="payrollNumber"
            placeholder="0000"
            type="text"
            value={initialValues.payrollNumber}
            readOnly={readOnly}
          />
        </Col>

        <Col xl={4}>
          <InputText
            label="N° Identificador"
            name="employeeCode"
            placeholder="1234"
            type="text"
            value={initialValues.employeeCode}
            readOnly={readOnly}
          />
        </Col>

        <Col xl={4}>
          <InputText
            label="N° PIS"
            name="pis"
            placeholder="00000000000"
            maxLength={11}
            type="text"
            value={initialValues.pis}
            readOnly={readOnly}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xl={4}>
          <InputText
            label="N° CTPS"
            name="ctps"
            placeholder="00000"
            maxLength={5}
            type="text"
            value={initialValues.ctps}
            readOnly={readOnly}
          />
        </Col>

        <Col xl={4}>
          <InputText
            label="Data de Admissão"
            name="admissionDate"
            placeholder="00/00/0000"
            type="date"
            value={
              initialValues.admissionDate
                ? initialValues.admissionDate
                : undefined
            }
            readOnly={readOnly}
          />
        </Col>

        <Col xl={4}>
          <InputText
            label="Data de Demissão"
            name="resignationDate"
            placeholder="00/00/0000"
            type="date"
            value={
              initialValues.resignationDate
                ? initialValues.resignationDate
                : undefined
            }
            readOnly={readOnly}
          />
        </Col>
      </Row>
    </>
  )
}

UserRegisterForm.defaultProps = {
  readOnly: undefined
}

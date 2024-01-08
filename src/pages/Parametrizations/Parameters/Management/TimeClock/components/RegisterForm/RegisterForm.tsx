import { Col, Row } from 'react-bootstrap'

import { useAlertContext } from '@/contexts/Alert'

import { Skeleton } from '@/components/Core/Skeleton'

import { Field, Form, Formik } from 'formik'
import { Switch } from '@/components/Core/Form/Fields/Switch'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { ipMask } from '@/utils/masks'
import { Button } from '@/components/Core/Buttons/Button'
import { Select } from '@/components/Core/Form/Fields/Select'
import { UF_OPTIONS } from '@/constants/options/uf.options'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { IClockTimeRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: IClockTimeRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: IClockTimeRegisterForm) => void
}

export function ClockTimeRegisterForm({
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
      </>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        touched,
        errors,
        dirty,
        isValid,
        setFieldValue,
        setFieldTouched
      }) => (
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
                label="IP do Equipamento"
                name="clock_ip"
                placeholder="255.255.255.255"
                maxLength={15}
                type="text"
                error={touched.clock_ip && !!errors.clock_ip}
                helperText={
                  touched.clock_ip && !!errors.clock_ip ? errors.clock_ip : ''
                }
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = ipMask(e.target.value)

                  setFieldValue('clock_ip', e.target.value)
                }}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={6}>
              <Field
                as={InputText}
                label="Unidade"
                name="unit"
                placeholder="Insira a unidade do Relógio de Ponto"
                type="text"
                error={touched.unit && !!errors.unit}
                helperText={touched.unit && !!errors.unit ? errors.unit : ''}
                readOnly={readOnly}
              />
            </Col>

            <Col xl={6}>
              <Field
                as={InputText}
                label="Setor"
                name="sector"
                placeholder="Insira o Setor do Relógio de Ponto"
                type="text"
                error={touched.sector && !!errors.sector}
                helperText={
                  touched.sector && !!errors.sector ? errors.sector : ''
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={6}>
              <Field
                as={InputText}
                label="Cidade"
                name="city"
                placeholder="Insira a cidade do Relógio de Ponto"
                type="text"
                error={touched.city && !!errors.city}
                helperText={touched.city && !!errors.city ? errors.city : ''}
                readOnly={readOnly}
              />
            </Col>

            <Col xl={6}>
              <Field
                as={Select}
                label="UF"
                name="state"
                placeholder="Selecione um UF"
                value={values.state}
                options={UF_OPTIONS}
                error={touched.state && !!errors.state}
                helperText={touched.state && !!errors.state ? errors.state : ''}
                onChange={({ value }: IOption) => {
                  setFieldTouched('state')
                  setFieldValue('state', value)
                }}
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={6}>
              <Field
                as={InputText}
                label="Fabricante"
                name="manufacturer"
                placeholder="Insira a fabricate do Relógio de Ponto"
                type="text"
                error={touched.manufacturer && !!errors.manufacturer}
                helperText={
                  touched.manufacturer && !!errors.manufacturer
                    ? errors.manufacturer
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={6}>
              <Field
                as={InputText}
                label="Modelo"
                name="model"
                placeholder="Insira o modelo do Relógio de Ponto"
                type="text"
                error={touched.model && !!errors.model}
                helperText={touched.model && !!errors.model ? errors.model : ''}
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
                    <Button type="submit" styles="primary" disabled={!isValid}>
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

ClockTimeRegisterForm.defaultProps = {
  readOnly: undefined
}

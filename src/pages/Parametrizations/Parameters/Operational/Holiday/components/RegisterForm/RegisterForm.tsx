import { useAlertContext } from '@/contexts/Alert'

import { Col, Row } from 'react-bootstrap'
import { Skeleton } from '@/components/Core/Skeleton'
import { Field, Form, Formik } from 'formik'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { Select } from '@/components/Core/Form/Fields/Select'
import { InputDatePicker } from '@/components/Core/Form/Fields/InputDatePicker'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { Button } from '@/components/Core/Buttons/Button'
import { UF_OPTIONS } from '@/constants/options/uf.options'
import { useCitiesDropdown } from '@/hooks/services/Rules/Dropdown/useCities'
import { IHolidayRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: IHolidayRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: IHolidayRegisterForm) => void
}

export function HolidayRegisterForm({
  mode,
  initialValues,
  readOnly,
  onCancel,
  onSubmit
}: Props) {
  const { addAlertOnCancel } = useAlertContext()

  const { cities, setState } = useCitiesDropdown()

  const HOLIDAY_TYPES: IOption[] = [
    { value: 'N', label: 'Nacional' },
    { value: 'E', label: 'Estadual' },
    { value: 'M', label: 'Municipal' }
  ]

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
          <Col xxl={9}>
            <Skeleton size="lg" />
          </Col>

          <Col xxl={3}>
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
            <Col xl={2}>
              <Field
                as={InputDatePicker}
                size="lg"
                label="Data"
                name="date"
                value={values.date}
                onChange={(date: Date) => {
                  setFieldValue('date', date)
                }}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={9}>
              <Field
                as={InputText}
                label="Descrição"
                name="description"
                placeholder="Insira o nome do feriado"
                type="text"
                error={touched.description && !!errors.description}
                helperText={
                  touched.description && !!errors.description
                    ? errors.description
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={3}>
              <Field
                as={Select}
                label="Tipo de Feriado"
                name="holidayType"
                placeholder="Selecione um tipo de Feriado"
                defaultOption={values.holidayType}
                value={values.holidayType}
                options={HOLIDAY_TYPES}
                error={touched.holidayType && !!errors.holidayType}
                helperText={
                  touched.holidayType && !!errors.holidayType
                    ? errors.holidayType
                    : ''
                }
                onChange={({ value }: IOption) => {
                  setFieldValue('state', '')
                  setFieldValue('city', '')
                  setState('')

                  setFieldTouched('holidayType')
                  setFieldValue('holidayType', value)
                }}
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            {(values.holidayType === 'E' || values.holidayType === 'M') && (
              <Col xl={4}>
                <Field
                  as={Select}
                  label="UF"
                  name="state"
                  placeholder="Selecione um UF"
                  value={values.state}
                  options={UF_OPTIONS}
                  error={touched.state && !!errors.state}
                  helperText={
                    touched.state && !!errors.state ? errors.state : ''
                  }
                  onChange={({ value }: IOption) => {
                    if (values.holidayType === 'M') {
                      setState(value as string)
                    }
                    setFieldValue('city', '')
                    setFieldTouched('state')
                    setFieldValue('state', value)
                  }}
                  readOnly={readOnly}
                />
              </Col>
            )}

            {values.holidayType === 'M' && cities.length > 0 && (
              <Col xl={8}>
                <Field
                  as={Select}
                  label="Cidade"
                  name="city"
                  placeholder="Selecione uma cidade"
                  value={values.city}
                  options={values.state ? cities : []}
                  error={touched.city && !!errors.city}
                  helperText={touched.city && !!errors.city ? errors.city : ''}
                  onChange={({ value }: IOption) => {
                    setFieldTouched('city')
                    setFieldValue('city', value)
                  }}
                  readOnly={readOnly}
                />
              </Col>
            )}
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

HolidayRegisterForm.defaultProps = {
  readOnly: undefined
}

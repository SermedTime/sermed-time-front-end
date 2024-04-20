import { useEffect, useState } from 'react'
import { useSystemParams } from '@/hooks/utils/useParams'
import { useToastContext } from '@/contexts/Toast'

import { Col, Row } from 'react-bootstrap'
import { SmoothReveal } from '@/components/Core/Animations/SmoothReveal'
import { Widget } from '@/components/Core/Containers/Widget'
import { Skeleton } from '@/components/Core/Skeleton'
import { Field, Form, Formik } from 'formik'
import { Select } from '@/components/Core/Form/Fields/Select'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { InputDatePicker } from '@/components/Core/Form/Fields/InputDatePicker'
import { validateData } from '@/utils/date'
import { FormGroup } from '@/components/Core/Form/Group'
import { IHolidayFilterForm, initialFilterValues } from './FilterForm.form'

interface Props {
  defaultValues?: IHolidayFilterForm | null
  onChange?: (data: IHolidayFilterForm) => void
}

export function HolidayFilterForm({ defaultValues, onChange }: Props) {
  const { totalRecords } = useSystemParams()
  const { addToast } = useToastContext()

  const [initialValues, setInitialValues] = useState<IHolidayFilterForm | null>(
    null
  )

  useEffect(() => {
    if (defaultValues) {
      if (initialValues === null) {
        setInitialValues(defaultValues)
      } else {
        setInitialValues(initialFilterValues)
      }
    }
  }, [initialValues, defaultValues])

  return (
    <SmoothReveal visible={true}>
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          onSubmit={values => onChange && onChange(values)}
        >
          {({
            initialValues,
            values,
            setValues,
            setFieldValue,
            submitForm
          }) => (
            <Form>
              <Row>
                <Col>
                  <Widget
                    icon="search"
                    heading="Filtros"
                    caption="Opções"
                    actionIcon="refresh"
                    onClick={() => {
                      if (initialValues !== values) {
                        setValues(initialFilterValues)
                        onChange && onChange(initialFilterValues)
                      }
                    }}
                  >
                    <Row className="mt-3 mb-3">
                      <Col>
                        <Field
                          as={Select}
                          size="sm"
                          label="Registros"
                          placeholder="Selecione"
                          value={values.records}
                          options={totalRecords}
                          onChange={({ value }: IOption) => {
                            setFieldValue('records', value)
                            submitForm()
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <Field
                          as={Select}
                          size="sm"
                          label="Situação"
                          placeholder="Selecione"
                          value={values.status}
                          options={[
                            {
                              value: 'all',
                              label: 'Todos'
                            },
                            {
                              value: 'active',
                              label: 'Ativos'
                            },
                            {
                              value: 'inactive',
                              label: 'Inativos'
                            }
                          ]}
                          onChange={({ value }: IOption) => {
                            setFieldValue('status', value)
                            submitForm()
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <FormGroup
                          size="sm"
                          label="Data do Feriado"
                          defaultOpen={true}
                        >
                          <Row className="mb-2">
                            <Col>
                              <Field
                                as={InputDatePicker}
                                size="sm"
                                label="Início"
                                name="initialDate"
                                value={values.initialDate}
                                onChange={(date: Date) => {
                                  if (
                                    validateData(values, date, 'initialDate')
                                  ) {
                                    setFieldValue('initial_date', date)
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'A data final deve ser maior que a data inicial!'
                                    })
                                  } else {
                                    setFieldValue('initialDate', date)

                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Field
                                as={InputDatePicker}
                                size="sm"
                                label="Final"
                                name="finalDate"
                                value={values.finalDate}
                                onChange={(date: Date) => {
                                  if (validateData(values, date, 'finalDate')) {
                                    setFieldValue('finalDate', date)
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'A data final deve ser maior que a data inicial!'
                                    })
                                  } else {
                                    setFieldValue('finalDate', date)

                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Widget>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      ) : (
        <Widget
          icon="search"
          heading="Filtros"
          caption="Opções"
          actionIcon="refresh"
          actionDisabled={true}
        >
          <Row className="mb-3">
            <Col>
              <Skeleton />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Skeleton />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Skeleton />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Skeleton />
            </Col>
          </Row>

          <Row>
            <Col>
              <Skeleton />
            </Col>
          </Row>
        </Widget>
      )}
    </SmoothReveal>
  )
}

HolidayFilterForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

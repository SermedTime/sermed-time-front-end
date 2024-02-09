import { useEffect, useState } from 'react'

import { useSystemParams } from '@/hooks/utils/useParams'
import { useToastContext } from '@/contexts/Toast'

import { Field, Form, Formik } from 'formik'
import { Row, Col } from 'react-bootstrap'

import { Widget } from '@/components/Core/Containers/Widget'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { Skeleton } from '@/components/Core/Skeleton'
import { SmoothReveal } from '@/components/Core/Animations/SmoothReveal'
import { FormGroup } from '@/components/Core/Form/Group'

import { InputDatePicker } from '@/components/Core/Form/Fields/InputDatePicker'
import { validateData } from '@/utils/date'
import { InputNumber } from '@/components/Core/Form/Fields/InputNumber'
import { IReportsFilterForm, initialFilterValues } from './FilterForm.form'

interface Props {
  defaultValues?: IReportsFilterForm | null
  onChange?: (data: IReportsFilterForm) => void
}

export function ReportsFilterForm({ defaultValues, onChange }: Props) {
  const { totalRecords } = useSystemParams()
  const { addToast } = useToastContext()

  const [initialValues, setInitialValues] = useState<IReportsFilterForm | null>(
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
                        <FormGroup size="sm" label="Data" defaultOpen={true}>
                          <Row className="mb-2">
                            <Col>
                              <Field
                                as={InputDatePicker}
                                size="sm"
                                label="Início"
                                name="initial_date"
                                value={values.initial_date}
                                onChange={(date: Date) => {
                                  if (
                                    validateData(values, date, 'initial_date')
                                  ) {
                                    setFieldValue('initial_date', date)
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'A data final deve ser maior que a data inicial!'
                                    })
                                  } else {
                                    setFieldValue('initial_date', date)

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
                                name="final_date"
                                value={values.final_date}
                                onChange={(date: Date) => {
                                  if (
                                    validateData(values, date, 'final_date')
                                  ) {
                                    setFieldValue('final_date', date)
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'A data final deve ser maior que a data inicial!'
                                    })
                                  } else {
                                    setFieldValue('final_date', date)

                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <FormGroup size="sm" label="Faltas" defaultOpen={false}>
                          <Row className="mb-2">
                            <Col>
                              <Field
                                as={InputNumber}
                                label="Min"
                                name="min_absense"
                                size="sm"
                                value={values.min_absense}
                                onChange={(value: number) => {
                                  setFieldValue('min_absense', value)
                                  if (
                                    values.min_absense &&
                                    values.max_absense &&
                                    values.min_absense > values.max_absense
                                  ) {
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'O mínimo de faltas deve ser maior que o máximo'
                                    })
                                  } else {
                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Field
                                as={InputNumber}
                                label="Max"
                                name="max_absense"
                                size="sm"
                                value={values.max_absense}
                                onChange={(value: number) => {
                                  setFieldValue('max_absense', value)
                                  if (
                                    values.min_absense &&
                                    values.max_absense &&
                                    values.min_absense > values.max_absense
                                  ) {
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'O mínimo de faltas deve ser maior que o máximo'
                                    })
                                  } else {
                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <FormGroup
                          size="sm"
                          label="Horas Extras"
                          defaultOpen={false}
                        >
                          <Row className="mb-2">
                            <Col>
                              <Field
                                as={InputNumber}
                                label="Min"
                                name="min_extra_time"
                                size="sm"
                                value={values.min_extra_time}
                                onChange={(value: number) => {
                                  setFieldValue('min_extra_time', value)

                                  if (
                                    values.min_extra_time &&
                                    values.max_extra_time &&
                                    values.min_extra_time >
                                      values.max_extra_time
                                  ) {
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'O mínimo de horas extras deve ser maior que o máximo'
                                    })
                                  } else {
                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Field
                                as={InputNumber}
                                label="Max"
                                name="max_extra_time"
                                size="sm"
                                value={values.max_extra_time}
                                onChange={(value: number) => {
                                  setFieldValue('max_extra_time', value)

                                  if (
                                    values.min_extra_time &&
                                    values.max_extra_time &&
                                    values.min_extra_time >
                                      values.max_extra_time
                                  ) {
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'O mínimo de horas extras deve ser maior que o máximo'
                                    })
                                  } else {
                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormGroup
                          size="sm"
                          label="Banco de Horas"
                          defaultOpen={false}
                        >
                          <Row className="mb-2">
                            <Col>
                              <Field
                                as={InputNumber}
                                label="Min"
                                name="min_annual_leave"
                                size="sm"
                                value={values.min_annual_leave}
                                onChange={(value: number) => {
                                  setFieldValue('min_annual_leave', value)

                                  if (
                                    values.min_annual_leave &&
                                    values.max_annual_leave &&
                                    values.min_annual_leave >
                                      values.max_annual_leave
                                  ) {
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'O mínimo de banco de horas deve ser maior que o máximo'
                                    })
                                  } else {
                                    submitForm()
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Field
                                as={InputNumber}
                                label="Max"
                                name="max_annual_leave"
                                size="sm"
                                value={values.max_annual_leave}
                                onChange={(value: number) => {
                                  setFieldValue('max_annual_leave', value)

                                  if (
                                    values.min_annual_leave &&
                                    values.max_annual_leave &&
                                    values.min_annual_leave >
                                      values.max_annual_leave
                                  ) {
                                    addToast({
                                      type: 'helper',
                                      title: 'Oops',
                                      description:
                                        'O mínimo de banco de horas deve ser maior que o máximo'
                                    })
                                  } else {
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

ReportsFilterForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

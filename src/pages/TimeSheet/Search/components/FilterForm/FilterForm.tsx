import { useState, useEffect } from 'react'

import { Row, Col } from 'react-bootstrap'

import { Formik, Form, Field } from 'formik'

import { SmoothReveal } from '@/components/Core/Animations/SmoothReveal'
import { Widget } from '@/components/Core/Containers/Widget'
import { Select } from '@/components/Core/Form/Fields/Select'
import { Skeleton } from '@/components/Core/Skeleton'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { IUserFilterForm, initialFilterValues } from './FilterForm.form'

interface Props {
  defaultValues?: IUserFilterForm | null
  onChange?: (data: IUserFilterForm) => void
}

export function UserFilterForm({ defaultValues, onChange }: Props) {
  const totalRecords = [
    {
      value: 6,
      label: '6'
    },
    {
      value: 12,
      label: '12'
    },
    {
      value: 24,
      label: '24'
    },
    {
      value: 48,
      label: '48'
    },
    {
      value: 96,
      label: '96'
    }
  ]

  const [initialValues, setInitialValues] = useState<IUserFilterForm | null>(
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
    <SmoothReveal visible>
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

UserFilterForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

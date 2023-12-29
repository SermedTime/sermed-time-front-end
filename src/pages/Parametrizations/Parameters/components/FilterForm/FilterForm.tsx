import { useEffect, useState } from 'react'

import { Field, Form, Formik } from 'formik'
import { Col, Row } from 'react-bootstrap'

import { SmoothReveal } from '@/components/Core/Animations/SmoothReveal'
import { Widget } from '@/components/Core/Containers/Widget'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { Skeleton } from '@/components/Core/Skeleton'

import { useSystemParams } from '@/hooks/utils/useParams'

import { IParametersFilterForm, initialFilterValues } from './FilterForm.Form'

interface Props {
  defaultValues?: IParametersFilterForm | null
  onChange?: (data: IParametersFilterForm) => void
}

export function ParametersFilterForm({ defaultValues, onChange }: Props) {
  const { totalRecords } = useSystemParams()

  const [initialValues, setInitialValues] =
    useState<IParametersFilterForm | null>(null)

  useEffect(() => {
    if (defaultValues) {
      if (initialValues === null) {
        setInitialValues(defaultValues)
      } else {
        setInitialValues(initialFilterValues)
      }
    }
  }, [defaultValues, initialValues])

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

ParametersFilterForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

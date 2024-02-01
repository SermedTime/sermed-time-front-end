import { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'

import { selectYears } from '@/utils/selectYears'

import { Col, Container, Row } from 'react-bootstrap'
import { Select } from '@/components/Core/Form/Fields/Select'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { Skeleton } from '@/components/Core/Skeleton'
import { useSystemParams } from '@/hooks/utils/useParams'
import { ITimeSheetFilterForm, initialFilterValues } from './FilterForm.form'

interface Props {
  defaultValues?: ITimeSheetFilterForm | null
  onChange?: (data: ITimeSheetFilterForm) => void
}

export function TimeSheetFilterForm({ defaultValues, onChange }: Props) {
  const years_options = selectYears(5)

  const { months } = useSystemParams()
  const months_current_year = months.filter(month => {
    return month.value <= new Date().getMonth() + 1
  })

  const [initialValues, setInitialValues] =
    useState<ITimeSheetFilterForm | null>(null)

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
    <Container>
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          onSubmit={values => onChange && onChange(values)}
        >
          {({ values, setFieldValue, submitForm }) => (
            <Form>
              <Row>
                <Col>
                  <Field
                    as={Select}
                    size="sm"
                    placeholder="Selecione o ano"
                    value={values.year}
                    options={years_options}
                    onChange={({ value }: IOption) => {
                      setFieldValue('year', value)
                      setFieldValue('month', 1)
                      submitForm()
                    }}
                  />
                </Col>

                <Col>
                  <Field
                    as={Select}
                    size="sm"
                    placeholder="Selecione o mês"
                    value={values.month}
                    options={
                      values.year === new Date().getFullYear()
                        ? months_current_year
                        : months
                    }
                    onChange={({ value }: IOption) => {
                      setFieldValue('month', value)
                      submitForm()
                    }}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      ) : (
        <Row className="mb-3">
          <Col>
            <Skeleton />
          </Col>
          <Col>
            <Skeleton />
          </Col>
        </Row>
      )}
    </Container>
  )
}

TimeSheetFilterForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

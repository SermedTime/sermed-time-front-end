import { useEffect, useState } from 'react'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { InputSearch } from '@/components/Core/Form/Fields/Search/Input'
import { SelectSearch } from '@/components/Core/Form/Fields/Search/Select'

import { Col, Row } from 'react-bootstrap'

import { Field, Form, Formik } from 'formik'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Skeleton } from '@/components/Core/Skeleton'
import { IParametersSearchForm, initialSearchValues } from './SearchForm.form'

interface Props {
  options: IOption[]
  defaultValues?: IParametersSearchForm | null
  onChange?: (data: IParametersSearchForm) => void
}

export function ParametersSearchForm({
  options,
  defaultValues,
  onChange
}: Props) {
  const [initialValues, setInitialValues] =
    useState<IParametersSearchForm | null>(null)

  useEffect(() => {
    if (defaultValues) {
      if (initialValues === null) {
        setInitialValues(defaultValues)
      }
    } else {
      setInitialValues(initialSearchValues)
    }
  }, [defaultValues, initialValues])

  return (
    <Row className="mb-2">
      <Col>
        {initialValues ? (
          <Formik
            initialValues={initialValues}
            onSubmit={values => onChange && onChange(values)}
          >
            {({ values, setFieldValue, submitForm }) => (
              <Form>
                <Row>
                  <Col lg={6} xxl={7}>
                    <Field
                      as={InputSearch}
                      placeholder="Pesquisar"
                      name="search"
                      type="text"
                      onReset={() => {
                        setFieldValue('search', '')
                        submitForm()
                      }}
                    />
                  </Col>

                  <Col lg={5} xxl={4}>
                    <Field
                      as={SelectSearch}
                      placeholder="Tipo de pesquisa"
                      value={values.searchingBy}
                      options={options}
                      readOnly={options.length === 1}
                      onChange={(option: IOption) =>
                        setFieldValue('searchingBy', option.value)
                      }
                      onReset={() => {
                        setFieldValue('searchingBy', '')
                        submitForm()
                      }}
                    />
                  </Col>

                  <Col xs={1}>
                    <ButtonIcon type="submit" size="md" icon="search" />
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        ) : (
          <Row className="mb-2">
            <Col xs={7}>
              <Skeleton size="lg" />
            </Col>

            <Col xs={4}>
              <Skeleton size="lg" />
            </Col>

            <Col xs={1}>
              <Skeleton size="lg" />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  )
}

ParametersSearchForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

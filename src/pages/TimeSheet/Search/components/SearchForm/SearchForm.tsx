import { ReactNode, useEffect, useState } from 'react'

import { Row, Col } from 'react-bootstrap'

import { Formik, Form, Field } from 'formik'

import { IOption } from '@/components/Core/Form/Fields/Search/Select/Select.interface'

import { InputSearch } from '@/components/Core/Form/Fields/Search/Input'
import { SelectSearch } from '@/components/Core/Form/Fields/Search/Select'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Skeleton } from '@/components/Core/Skeleton'

import { IUserSearchForm, initialSearchValues } from './SearchForm.form'

interface Props {
  defaultValues?: IUserSearchForm | null
  children: ReactNode
  onChange?: (data: IUserSearchForm) => void
}

export function UserSearchForm({ defaultValues, children, onChange }: Props) {
  const [initialValues, setInitialValues] = useState<IUserSearchForm | null>(
    null
  )

  useEffect(() => {
    if (defaultValues) {
      if (initialValues === null) {
        setInitialValues(defaultValues)
      } else {
        setInitialValues(initialSearchValues)
      }
    }
  }, [initialValues, defaultValues])

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
                <Row className="mb-3">
                  <Col lg={6} xxl={7}>
                    <Field
                      as={InputSearch}
                      placeholder="Pesquisar"
                      name="search"
                      type={values.searchingBy !== 'name' ? 'number' : 'text'}
                      onReset={() => {
                        setFieldValue('search', '')
                        submitForm()
                      }}
                      disabled={values.searchingBy === ''}
                    />
                  </Col>

                  <Col lg={5} xxl={4}>
                    <Field
                      as={SelectSearch}
                      placeholder="Tipo de Pesquisa"
                      value={values.searchingBy}
                      options={[
                        { value: 'name', label: 'Nome' },
                        { value: 'cpf', label: 'CPF' },
                        { value: 'pis', label: 'PIS' }
                      ]}
                      onChange={(option: IOption) => {
                        setFieldValue('search', '')
                        setFieldValue('searchingBy', option.value)
                      }}
                      onReset={() => {
                        setFieldValue('searchingBy', '')
                        setFieldValue('search', '')
                        submitForm()
                      }}
                    />
                  </Col>

                  <Col xs={1}>
                    <ButtonIcon type="submit" size="md" icon="search" />
                  </Col>

                  <Col>{children}</Col>
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

UserSearchForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

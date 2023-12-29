import { Col, Row } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'

import { InputSearch } from '@/components/Core/Form/Fields/Search/Input'
import { SelectSearch } from '@/components/Core/Form/Fields/Search/Select'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

import {
  IParametrizationsSearchForm,
  initialValuesSchema
} from './SearchForm.form'

import { PARAMETER_OPTIONS } from './Parameter.options'

interface Props {
  onSubmit?: (data: IParametrizationsSearchForm) => void
}

export function ParametrizationsSearchForm({ onSubmit }: Props) {
  return (
    <Row>
      <Col>
        <Formik
          initialValues={initialValuesSchema}
          onSubmit={values => onSubmit && onSubmit(values)}
        >
          {({ values, setFieldValue, submitForm }) => (
            <Form>
              <Row className="justify-content-between mb-2">
                <Col lg={5} xxl={6}>
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

                <Col lg={6} xxl={5}>
                  <Field
                    as={SelectSearch}
                    placeholder="Parâmetro"
                    value={values.parameter}
                    options={PARAMETER_OPTIONS}
                    showSearch={true}
                    onChange={(option: IOption) =>
                      setFieldValue('parameter', option.value)
                    }
                    onReset={() => {
                      setFieldValue('parameter', '')
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
      </Col>
    </Row>
  )
}

ParametrizationsSearchForm.defaultProps = {
  onSubmit: undefined
}

import { useEffect, useState } from 'react'
import { useSystemParams } from '@/hooks/utils/useParams'

import { Col, Row } from 'react-bootstrap'
import { SmoothReveal } from '@/components/Core/Animations/SmoothReveal'
import { Widget } from '@/components/Core/Containers/Widget'
import { Skeleton } from '@/components/Core/Skeleton'

import { Field, Form, Formik } from 'formik'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { useCompanyDropdown } from '@/hooks/services/Rules/Dropdown/useCompanies'
import { useUnitsDropdown } from '@/hooks/services/Rules/Dropdown/useUnits'
import { useTeamDropdown } from '@/hooks/services/Rules/Dropdown/useTeams'
import { IUserFilterForm, initialFilterValues } from './FilterForm.form'

interface Props {
  defaultValues?: IUserFilterForm | null
  onChange?: (data: IUserFilterForm) => void
}

export function UserFilterForm({ defaultValues, onChange }: Props) {
  const { totalRecords } = useSystemParams()
  const { companies } = useCompanyDropdown()
  const { units } = useUnitsDropdown()
  const { teams, setUnitId } = useTeamDropdown({ allTeams: 'active' })

  const [initialValues, setInitialValues] = useState<IUserFilterForm | null>(
    null
  )

  const STATUS_OPTIONS: IOption[] = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Ativos' },
    { value: 'inactive', label: 'Inativos' }
  ]

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
                          options={STATUS_OPTIONS}
                          onChange={({ value }: IOption) => {
                            setFieldValue('status', value)
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
                          label="Empresa"
                          placeholder="Selecione"
                          value={values.companyId}
                          options={companies}
                          onChange={({ value }: IOption) => {
                            setFieldValue('companyId', value)
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
                          label="Unidade"
                          placeholder="Selecione"
                          value={values.unitId}
                          options={units}
                          onChange={({ value }: IOption) => {
                            setFieldValue('teamId', '')
                            setFieldValue('unitId', value)
                            setUnitId(value)
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
                          label="Equipe"
                          placeholder="Selecione"
                          value={values.teamId}
                          options={teams}
                          disabled={values.unitId === ''}
                          onChange={({ value }: IOption) => {
                            setFieldValue('teamId', value)
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

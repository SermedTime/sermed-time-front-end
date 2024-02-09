import { useEffect, useState } from 'react'

import { useTeamDropdown } from '@/hooks/services/Rules/Dropdown/useTeams'
import { useUsersDropdown } from '@/hooks/services/Rules/Dropdown/useUser'

import { Col, Row } from 'react-bootstrap'

import { Skeleton } from '@/components/Core/Skeleton'
import { Field, Form, Formik } from 'formik'
import { SelectSearch } from '@/components/Core/Form/Fields/Search/Select'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { Switch } from '@/components/Core/Form/Fields/Switch'
import { IReportsSearchForm, initialSearchValues } from './SearchForm.form'

interface Props {
  defaultValues?: IReportsSearchForm | null
  onChange?: (data: IReportsSearchForm) => void
  onAgroup?: (groupByTeam: boolean) => void
}

export function ReportsSearchForm({
  defaultValues,
  onChange,
  onAgroup
}: Props) {
  const { teams } = useTeamDropdown({ allTeams: 'active' })
  const { users, setAllData, setDependsOn, setTeamId } = useUsersDropdown()

  const [initialValues, setInitialValues] = useState<IReportsSearchForm | null>(
    null
  )

  useEffect(() => {
    setAllData(true)
    setDependsOn(true)
    if (defaultValues) {
      if (initialValues === null) {
        setInitialValues(defaultValues)
      }
    } else {
      setInitialValues(initialSearchValues)
    }
  }, [defaultValues, initialValues, setAllData, setDependsOn])

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
                  <Col lg={5} xxl={5}>
                    <Field
                      as={SelectSearch}
                      placeholder="Selecione uma Equipe"
                      value={values.team_id}
                      options={teams}
                      readOnly={!teams || teams.length < 2}
                      name="team_id"
                      onChange={(option: IOption) => {
                        setFieldValue('team_id', option.value)
                        setFieldValue('user_id', null)
                        setTeamId(String(option.value))
                        submitForm()
                      }}
                      onReset={() => {
                        setFieldValue('team_id', '')
                        setFieldValue('user_id', '')
                        setTeamId(null)
                        submitForm()
                      }}
                    />
                  </Col>

                  <Col lg={5} xxl={6}>
                    <Field
                      as={SelectSearch}
                      placeholder="Selecione um usuário"
                      value={values.user_id}
                      options={users}
                      readOnly={!users || !values.team_id || users.length < 2}
                      onChange={(option: IOption) => {
                        setFieldValue('user_id', option.value)
                        submitForm()
                      }}
                      onReset={() => {
                        setFieldValue('user_id', '')
                        submitForm()
                      }}
                    />
                  </Col>

                  <Col xs={1}>
                    <ButtonIcon type="submit" size="md" icon="search" />
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col xs="auto">
                    <Field
                      as={Switch}
                      description="Agrupar por Equipe"
                      name="groupByTeam"
                      checked={values.groupByTeam}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target

                        setFieldValue('groupByTeam', checked)
                        onAgroup && onAgroup(checked)
                        submitForm()
                      }}
                    />
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

ReportsSearchForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined,
  onAgroup: undefined
}

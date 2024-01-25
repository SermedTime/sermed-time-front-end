import { useEffect, useState } from 'react'

import { Formik, Form, Field } from 'formik'

import { Col, Row } from 'react-bootstrap'
import { Skeleton } from '@/components/Core/Skeleton'
import { Select } from '@/components/Core/Form/Fields/Select'
import { useTeamDropdown } from '@/hooks/services/Rules/Dropdown/useTeams'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { useUsersDropdown } from '@/hooks/services/Rules/Dropdown/useUser'
import {
  ITeamsAndUsersSearchForm,
  initialTeamsAndUsers
} from './TeamsAndUsers.form'

interface Props {
  defaultValues?: ITeamsAndUsersSearchForm | null
  onChange?: (data: ITeamsAndUsersSearchForm) => void
}

export function TeamsAndUsersSearchForm({ defaultValues, onChange }: Props) {
  const { teams } = useTeamDropdown({})
  const { users, setAllData, setDependsOn, setTeamId } = useUsersDropdown()

  const [initialValues, setInitialValues] =
    useState<ITeamsAndUsersSearchForm | null>(null)

  useEffect(() => {
    setAllData(true)
    setDependsOn(true)
    if (defaultValues) {
      if (initialValues === null) {
        setInitialValues(defaultValues)
      } else {
        setInitialValues(initialTeamsAndUsers)
      }
    }
  }, [setAllData, setDependsOn, initialValues, defaultValues])

  if (!initialValues) {
    return (
      <Row className="mb-2">
        <Col>
          <Skeleton />
        </Col>
        <Col>
          <Skeleton />
        </Col>
      </Row>
    )
  }

  return (
    <Row className="mb-2">
      <Col>
        <Formik
          initialValues={initialValues}
          onSubmit={values => onChange && onChange(values)}
        >
          {({ values, setFieldValue, submitForm }) => (
            <Form>
              <Row className="mb-2">
                <Col>
                  <Field
                    as={Select}
                    size="sm"
                    label="Equipe"
                    placeholder="Selecione uma equipe"
                    value={values.team_id}
                    options={teams}
                    onChange={({ value }: IOption) => {
                      setFieldValue('team_id', value)
                      setFieldValue('user_id', null)
                      setTeamId(value as string)
                      submitForm()
                    }}
                  />
                </Col>

                <Col>
                  <Field
                    as={Select}
                    size="sm"
                    label="Funcionário"
                    placeholder="Selecione um Funcionário"
                    value={values.user_id}
                    options={users}
                    onChange={({ value }: IOption) => {
                      setFieldValue('user_id', value)
                      submitForm()
                    }}
                    disabled={!values.team_id}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

TeamsAndUsersSearchForm.defaultProps = {
  defaultValues: undefined,
  onChange: undefined
}

import { Formik, Form, Field } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

import { useUsersDropdown } from '@/hooks/services/Rules/Dropdown/useUser'
import { useEffect } from 'react'
import { useTeamDropdown } from '@/hooks/services/Rules/Dropdown/useTeams'
import { ISheduleRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  initialValues: ISheduleRegisterForm
  onSubmit: (formaValues: ISheduleRegisterForm) => void
}

export function ManageScheduleRegisterForm({ initialValues, onSubmit }: Props) {
  const { teams } = useTeamDropdown({})
  const { users, setTeamId, setDependsOn } = useUsersDropdown()

  useEffect(() => {
    setDependsOn(true)
  }, [initialValues, setDependsOn])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        touched,
        errors,
        dirty,
        isValid,
        setFieldValue,
        setFieldTouched
      }) => (
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
                }}
                disabled={!values.team_id}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

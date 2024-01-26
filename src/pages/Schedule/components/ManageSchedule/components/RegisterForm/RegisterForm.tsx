import { Formik, Form, Field } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

import { useUsersDropdown } from '@/hooks/services/Rules/Dropdown/useUser'
import { useEffect } from 'react'
import { useShiftDropdown } from '@/hooks/services/Rules/Dropdown/useShift'
import { Button } from '@/components/Core/Buttons/Button'
import { ISheduleRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  initialValues: ISheduleRegisterForm
  onSubmit: (formaValues: ISheduleRegisterForm) => void
}

export function ManageScheduleRegisterForm({ initialValues, onSubmit }: Props) {
  const { users, setTeamId, setDependsOn } = useUsersDropdown()
  const { shifts } = useShiftDropdown()

  useEffect(() => {
    setTeamId(initialValues.team_id)
    setDependsOn(true)
  }, [initialValues, setDependsOn, setTeamId])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, dirty, isValid, setFieldValue }) => (
        <Form>
          <Row className="mb-2 ">
            <Col xl={5}>
              <Field
                as={Select}
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

            <Col xl={5}>
              <Field
                as={Select}
                label="Turno"
                placeholder="Selecione um Turno"
                value={values.shift_id}
                options={shifts}
                onChange={({ value }: IOption) => {
                  setFieldValue('shift_id', value)
                }}
              />
            </Col>

            <Col xs="2" style={{ marginTop: '1.20rem' }}>
              <Button
                type="submit"
                styles="primary"
                disabled={!dirty || !isValid}
              >
                Escalar
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

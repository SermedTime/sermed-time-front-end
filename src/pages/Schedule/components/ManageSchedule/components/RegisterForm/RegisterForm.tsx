import { Formik, Form, Field } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

import { useUsersDropdown } from '@/hooks/services/Rules/Dropdown/useUser'
import { useEffect } from 'react'

import { Button } from '@/components/Core/Buttons/Button'
import { Skeleton } from '@/components/Core/Skeleton'

import { ISheduleRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  initialValues: ISheduleRegisterForm | null
  onSubmit: (formaValues: ISheduleRegisterForm) => void
  shifts?: IOption[] | null
  readOnly?: boolean
}

export function ManageScheduleRegisterForm({
  initialValues,
  shifts,
  onSubmit,
  readOnly
}: Props) {
  const { users, setTeamId, setDependsOn } = useUsersDropdown()

  useEffect(() => {
    setTeamId(initialValues ? initialValues.team_id : null)
    setDependsOn(true)
  }, [initialValues, setDependsOn, setTeamId])

  if (!initialValues) {
    return (
      <Row className="mb-4">
        <Col>
          <Skeleton size="lg" />
        </Col>
      </Row>
    )
  }

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
                readOnly={readOnly}
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

            <Col xs="auto">
              <div style={{ marginTop: '1.175rem' }}>
                <Button
                  type="submit"
                  styles="primary"
                  disabled={!dirty || !isValid}
                >
                  Escalar
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

ManageScheduleRegisterForm.defaultProps = {
  shifts: undefined,
  readOnly: undefined
}

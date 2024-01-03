import { Col, Row } from 'react-bootstrap'

import { Field, Form, Formik } from 'formik'

import { useAlertContext } from '@/contexts/Alert'

import { Skeleton } from '@/components/Core/Skeleton'
import { Button } from '@/components/Core/Buttons/Button'
import { Checkbox } from '@/components/Core/Form/Fields/Checkbox'
import { Select } from '@/components/Core/Form/Fields/Select'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { IAssignTeamForm, validationSchema } from './AssignTeam.form'

interface Props {
  initialValues: IAssignTeamForm | null
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: IAssignTeamForm) => void
}

export function AssignTeamRegisterForm({
  initialValues,
  onCancel,
  onSubmit
}: Props) {
  const { addAlertOnCancel } = useAlertContext()

  function handleOnCancel(hasChanges: boolean) {
    if (!hasChanges) {
      onCancel(false)
    } else {
      addAlertOnCancel(() => {
        onCancel(false)
      })
    }
  }

  if (!initialValues) {
    return (
      <Row className="mb-4">
        <Col xs={6}>
          <Skeleton />
        </Col>
        <Col xs={4}>
          <Skeleton />
        </Col>
        <Col xs={2}>
          <Skeleton />
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
          <Row className="mb-2 d-flex align-items-center justify-content-between">
            <Col xl={10}>
              <Field
                as={Select}
                name="team"
                placeholder="Selecione uma Equipe"
                value={values.team}
                options={[{ label: 'Enfermagem', value: 'enfermagem' }]}
                error={touched.team && !!errors.team}
                helperText={touched.team && !!errors.team ? errors.team : ''}
                onChange={({ value }: IOption) => {
                  setFieldTouched('supervisor')
                  setFieldValue('supervisor', value)
                }}
              />
            </Col>

            <Col xs="2">
              <Button
                type="submit"
                styles="primary"
                disabled={!dirty || !isValid}
              >
                Assossiar
              </Button>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Field
                as={Checkbox}
                description="Supervisor"
                name="isSupervisor"
                checked={values?.isSupervisor === true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { checked } = e.target

                  if (checked) {
                    setFieldValue('isSupervisor', true)
                  } else {
                    setFieldValue('isSupervisor', false)
                  }
                }}
              />
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col xs="auto">
              <Row>
                <Col xs="auto">
                  <Button
                    type="button"
                    styles="tertiary"
                    onClick={() => handleOnCancel(dirty)}
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

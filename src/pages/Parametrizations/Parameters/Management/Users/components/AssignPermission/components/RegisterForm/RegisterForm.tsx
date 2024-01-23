import { Col, Row } from 'react-bootstrap'

import { Field, Form, Formik } from 'formik'

import { usePermissionsDropdown } from '@/hooks/services/Rules/Dropdown/usePermissions'

import { Skeleton } from '@/components/Core/Skeleton'
import { Button } from '@/components/Core/Buttons/Button'
import { Checkbox } from '@/components/Core/Form/Fields/Checkbox'
import { Select } from '@/components/Core/Form/Fields/Select'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { IAssignPermissionForm, validationSchema } from './AssignPermission'

interface Props {
  initialValues: IAssignPermissionForm | null
  user_id: string
  onSubmit: (formValues: IAssignPermissionForm) => void
}

export function AssignPermissionRegisterForm({
  initialValues,
  onSubmit,
  user_id
}: Props) {
  const { permissions } = usePermissionsDropdown({ uuid: user_id })

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
                name="permission_id"
                placeholder="Selecione uma Permissão"
                value={values.permission_id}
                options={permissions}
                error={touched.permission_id && !!errors.permission_id}
                helperText={
                  touched.permission_id && !!errors.permission_id
                    ? errors.permission_id
                    : ''
                }
                onChange={({ value }: IOption) => {
                  setFieldTouched('permission_id')
                  setFieldValue('permission_id', value)
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
                description="Permissão de Escrita"
                name="is_writer"
                checked={values.is_writer === 'active'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { checked } = e.target

                  if (checked) {
                    setFieldValue('is_writer', 'active')
                  } else {
                    setFieldValue('is_writer', 'inactive')
                  }
                }}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useAlertContext } from '@/contexts/Alert'

import { del } from '@/services/api/sermed-api/sermed-api'

import { Field, Form, Formik } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { InputDatePicker } from '@/components/Core/Form/Fields/InputDatePicker'
import { ISheduleRegisterForm, validationSchema } from '../RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: ISheduleRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: ISheduleRegisterForm) => void
}

export function ScheduleRegisterForm({
  mode,
  initialValues,
  readOnly,
  onCancel,
  onSubmit
}: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast } = useToastContext()
  const { addAlert, addAlertOnCancel } = useAlertContext()

  function handleOnCancel(hasChanges: boolean) {
    if (!hasChanges) {
      onCancel(false)
    } else {
      addAlertOnCancel(() => {
        onCancel(false)
      })
    }
  }

  function handleOnDelete() {
    if (initialValues) {
      addAlert({
        iconModal: 'error',
        titleModal: 'Confirmar',
        iconType: 'helper',
        buttonType: 'warning',
        title: 'As informações serão perdidas',
        description: 'Deseja continuar?',
        cancelTxt: 'Voltar',
        confirmTxt: 'Continuar',
        onConfirm: async () => {
          try {
            showLoader()

            const { data } = await del(
              `/schale/remove/${initialValues.shcedule_id}`
            )

            if (data.success) {
              hideLoader()

              addToast({
                type: 'success',
                title: 'Sucesso',
                description: 'O evento foi excluído.'
              })

              onCancel(true)
            }
          } catch {
            hideLoader()

            addToast({
              type: 'warning',
              title: 'Ooops',
              description: 'Não foi possível excluir o evento.'
            })

            onCancel(false)
          }
        }
      })
    }
  }

  if (!initialValues) {
    return <h1>hello</h1>
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        touched,
        errors,
        dirty,
        isValid,
        setFieldTouched,
        setFieldValue,
        setValues
      }) => (
        <Form>
          <Row className="mb-4">
            <Col xs={3}>
              <Field
                as={InputDatePicker}
                label="Data da Escala"
                name="schedule_date"
                placeholder="dd/mm/aa"
                value={values.schedule_date}
                readOnly={readOnly}
                onChange={(date: Date) => {
                  setFieldValue('schedule_date', date)
                }}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

ScheduleRegisterForm.defaultProps = {
  readOnly: undefined
}

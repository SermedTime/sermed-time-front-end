import { Formik, Form, Field } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

import { useUsersDropdown } from '@/hooks/services/Rules/Dropdown/useUser'
import { useEffect } from 'react'
import { useShiftDropdown } from '@/hooks/services/Rules/Dropdown/useShift'
import { Button } from '@/components/Core/Buttons/Button'
import { Skeleton } from '@/components/Core/Skeleton'
import { useToastContext } from '@/contexts/Toast'
import { useAlertContext } from '@/contexts/Alert'
import { del } from '@/services/api/sermed-api/sermed-api'
import { useLoaderContext } from '@/contexts/Loader'
import { ISheduleRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: ISheduleRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formaValues: ISheduleRegisterForm) => void
}

export function ManageScheduleRegisterForm({
  mode,
  initialValues,
  onSubmit,
  readOnly,
  onCancel
}: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast } = useToastContext()
  const { addAlert, addAlertOnCancel } = useAlertContext()

  const { users, setTeamId, setDependsOn } = useUsersDropdown()
  const { shifts } = useShiftDropdown()

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
              `/user/calendar/event/cancel/${initialValues.shcedule_id}`
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

  function handleOnCancel(hasChanges: boolean) {
    if (!hasChanges) {
      onCancel(false)
    } else {
      addAlertOnCancel(() => {
        onCancel(false)
      })
    }
  }

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

            {!readOnly && (
              <Row className="justify-content-between">
                <Col xs="auto">
                  {mode === 'edit' && (
                    <Button
                      type="button"
                      styles="secondary"
                      mode="warning"
                      onClick={() => handleOnDelete()}
                    >
                      Excluir
                    </Button>
                  )}
                </Col>

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

                    <Col xs="auto">
                      <Button
                        type="submit"
                        styles="primary"
                        disabled={!dirty || !isValid}
                      >
                        {mode === 'create' ? 'Cadastrar' : 'Salvar'}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Row>
        </Form>
      )}
    </Formik>
  )
}

ManageScheduleRegisterForm.defaultProps = {
  readOnly: undefined
}

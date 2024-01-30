import { useToastContext } from '@/contexts/Toast'
import { useLoaderContext } from '@/contexts/Loader'
import { useShiftDropdown } from '@/hooks/services/Rules/Dropdown/useShift'

import { put } from '@/services/api/sermed-api/sermed-api'

import { Modal } from '@/components/Core/Modal'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Col, Row } from 'react-bootstrap'

import { IScheduleShift } from '@/hooks/services/Schedules/useSchedules'
import { Button } from '@/components/Core/Buttons/Button'
import { ManageScheduleRegisterForm } from '../RegisterForm'

import { ISheduleRegisterForm } from '../RegisterForm/RegisterForm.form'

interface Props {
  schedule_data: IScheduleShift
  show: boolean
  onClose: (hasChanges?: boolean) => void
}

export function EditEvent({ schedule_data, show, onClose }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const { shifts } = useShiftDropdown()

  function handleOnCancel() {
    onClose(false)
  }

  async function handleOnSubmit(formValues: ISheduleRegisterForm) {
    try {
      showLoader()

      const params = {
        shift_id: formValues.shift_id
      }

      const { data, message } = await put(
        `/schedule/update/${schedule_data.schedule_id}`,
        params
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'A permissão foi atribuida ao usuário.'
        })

        onClose(true)
      }

      if (message) {
        addToast({
          type: 'warning',
          title: 'Ooops',
          description: message
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    <Modal visible={show} onClose={() => handleOnCancel()} blur="xl">
      <div className="d-flex align-items-center gap-2 mb-3">
        <Icon appearance="outlined" size="lg" icon="event_available" />

        <Subtitle size="sm">Editar Escala</Subtitle>
      </div>

      <Row>
        <Col>
          <ManageScheduleRegisterForm
            initialValues={{
              team_id: schedule_data.team_id,
              user_id: schedule_data.user_id,
              schedule_date: schedule_data.start,
              shift_id: schedule_data.shift_id
            }}
            onSubmit={values => handleOnSubmit(values)}
            shifts={shifts}
            readOnly={true}
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
                onClick={() => handleOnCancel()}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

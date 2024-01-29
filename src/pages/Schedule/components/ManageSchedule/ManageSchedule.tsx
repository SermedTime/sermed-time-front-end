import { useToastContext } from '@/contexts/Toast'
import { useLoaderContext } from '@/contexts/Loader'

import { post } from '@/services/api/sermed-api/sermed-api'

import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Button } from '@/components/Core/Buttons/Button'

import { useRefreshKeyContext } from '@/contexts/Refresh'

import { convertDateToString } from '@/utils/date'
import { useShiftDropdown } from '@/hooks/services/Rules/Dropdown/useShift'
import { ManageScheduleRegisterForm } from './components/RegisterForm'

import { ISheduleRegisterForm } from './components/RegisterForm/RegisterForm.form'
import { ListDaySchedules } from './components/List/components'

interface Props {
  team_id: string
  show: boolean
  date: Date | undefined
  onClose: (hasChanges?: boolean) => void
}

export function ManageSchedule({ date, show, onClose, team_id }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()
  const { shifts } = useShiftDropdown()

  const { refreshKey, onRefresh } = useRefreshKeyContext()

  function handleOnCancel() {
    onRefresh()
    onClose(false)
  }

  async function handleOnSubmit(formValues: ISheduleRegisterForm) {
    try {
      showLoader()

      const { data, message } = await post(`/schedule/create`, formValues)

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'A permissão foi atribuida ao usuário.'
        })

        onRefresh()
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
    <Modal
      key={refreshKey}
      visible={show}
      onClose={() => handleOnCancel()}
      blur="xl"
    >
      <div className="d-flex align-items-center gap-2 mb-3">
        <Icon appearance="outlined" size="lg" icon="event_available" />

        <Subtitle size="sm">
          {`Gerenciamendo de Escalas ${
            date ? ` - ${convertDateToString(date)}` : ''
          }`}{' '}
        </Subtitle>
      </div>

      <Row>
        <Col>
          <ManageScheduleRegisterForm
            initialValues={{
              team_id,
              user_id: '',
              schedule_date: date || '',
              shift_id: ''
            }}
            onSubmit={values => handleOnSubmit(values)}
            shifts={shifts}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <ListDaySchedules team_id={team_id} date={date} shifts={shifts} />
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

ManageSchedule.defaultProp = {
  team: undefined
}

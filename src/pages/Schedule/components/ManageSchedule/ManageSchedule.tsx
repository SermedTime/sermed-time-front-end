import { useEffect, useState } from 'react'

import { useToastContext } from '@/contexts/Toast'
import { useLoaderContext } from '@/contexts/Loader'

import { post } from '@/services/api/sermed-api/sermed-api'

import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Button } from '@/components/Core/Buttons/Button'

import { useRefreshKeyContext } from '@/contexts/Refresh'
import { ManageScheduleRegisterForm } from './components/RegisterForm'

import { ISheduleRegisterForm } from './components/RegisterForm/RegisterForm.form'

interface Props {
  team_id: string
  show: boolean
  date: Date | undefined
  onClose: (hasChanges?: boolean) => void
}

export function ManageSchedule({ team_id, date, show, onClose }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [showModal, setShowModal] = useState(false)
  const { refreshKey, onRefresh } = useRefreshKeyContext()

  useEffect(() => {
    if (team_id && show) {
      setShowModal(true)
    }
  }, [team_id, show])

  function handleOnCancel() {
    setShowModal(false)

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
      visible={showModal}
      onClose={() => handleOnCancel()}
      blur="xl"
    >
      <div className="d-flex align-items-center gap-2 mb-5">
        <Icon appearance="outlined" size="lg" icon="event_available" />

        <Subtitle size="sm">Gerenciamendo de Escalas </Subtitle>
      </div>

      <Row>
        <Col>
          <ManageScheduleRegisterForm
            initialValues={{
              team_id: team_id || '',
              user_id: '',
              schedule_date: date || '',
              shift: ''
            }}
            onSubmit={values => handleOnSubmit(values)}
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

ManageSchedule.defaultProp = {
  team: undefined
}

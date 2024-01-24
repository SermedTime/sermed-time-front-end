import { useEffect, useState } from 'react'

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useRefreshKeyContext } from '@/contexts/Refresh'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { Col, Row } from 'react-bootstrap'
import { Modal } from '@/components/Core/Modal'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { post } from '@/services/api/sermed-api/sermed-api'

import { Button } from '@/components/Core/Buttons/Button'
import { IAssignTeamForm } from './components/RegisterForm/AssignTeam.form'
import { AssignTeamRegisterForm } from './components/RegisterForm'
import { ListTeams } from './components/List'

interface Props {
  user_id: string
  user_name: string
  onClose: (hasChanges: boolean) => void
}

export function AssignTeam({ user_id, onClose, user_name }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [showModal, setShowModal] = useState(false)
  const { refreshKey, onRefresh } = useRefreshKeyContext()

  useEffect(() => {
    if (user_id) {
      setShowModal(true)
    }
  }, [user_id])

  function handleOnCancel() {
    setShowModal(false)

    onClose(false)
  }

  async function handleOnSubmit(formValues: IAssignTeamForm) {
    try {
      showLoader()

      const params = {
        user_id,
        ...formValues
      }

      const { data, message } = await post(
        `/parametrizations/assign-teams`,
        params
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'A equipe foi atribuida ao usuário.'
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
    >
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="group_add" />

            <Subtitle size="sm">{user_name}</Subtitle>
          </div>
        </Col>
      </Row>

      {hasParametrizationsWriter() && (
        <Row className="mb-4">
          <Col>
            <AssignTeamRegisterForm
              initialValues={{
                is_supervisor: 'inactive',
                team_id: ''
              }}
              user_id={user_id}
              onSubmit={values => {
                handleOnSubmit(values)
              }}
            />
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col>
          <ListTeams user_id={user_id} />
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

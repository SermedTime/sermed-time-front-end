import { useEffect, useState } from 'react'

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { Col, Row } from 'react-bootstrap'
import { Modal } from '@/components/Core/Modal'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { post } from '@/services/api/sermed-api/sermed-api'

import { Button } from '@/components/Core/Buttons/Button'
import { IAssignTeamForm } from './RegisterForm/AssignTeam.form'
import { AssignTeamRegisterForm } from './RegisterForm'
import { ListTeams } from './components/List'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function AssignTeam({ uuid, onClose }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (uuid) {
      setShowModal(true)
    }
  }, [uuid])

  function handleOnCancel() {
    setShowModal(false)

    onClose(false)
  }

  async function handleOnSubmit(formValues: IAssignTeamForm) {
    try {
      showLoader()

      const { data, message } = await post(
        `/parametrizations/users/team/${formValues.user}`,
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'O cadastro do Usuário foi editado.'
        })
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
    <Modal visible={showModal} onClose={() => handleOnCancel()}>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="group_add" />

            <Subtitle size="sm">Atribuir Equipe</Subtitle>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <AssignTeamRegisterForm
            initialValues={{ isSupervisor: false, team: '', user: uuid }}
            onSubmit={values => {
              handleOnSubmit(values)
            }}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <ListTeams uuid={uuid} />
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

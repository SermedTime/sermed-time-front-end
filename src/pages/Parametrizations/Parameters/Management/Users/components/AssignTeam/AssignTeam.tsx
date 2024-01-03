import { useCallback, useEffect, useState } from 'react'

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { Col, Row } from 'react-bootstrap'
import { Modal } from '@/components/Core/Modal'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { get, post } from '@/services/api/sermed-api/sermed-api'

import { IAssignTeamForm } from './RegisterForm/AssignTeam.form'
import { AssignTeamRegisterForm } from './RegisterForm'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function AssignTeam({ uuid, onClose }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [showModal, setShowModal] = useState(false)

  const [initialValues, setInitialValues] = useState<IAssignTeamForm | null>(
    null
  )

  const fetchData = useCallback(
    async (uuid: string) => {
      try {
        const {
          data: { data }
        } = await get(`parametrizations/users/team/${uuid}`)

        const { user, team, isSupervisor } = data

        setInitialValues({
          user,
          team,
          isSupervisor
        })
      } catch {
        handleApiRejection()
        onClose(false)
      }
    },
    [handleApiRejection, onClose]
  )

  useEffect(() => {
    if (initialValues === null && uuid) {
      setShowModal(true)

      fetchData(uuid)
    }
  }, [initialValues, uuid, fetchData])

  function handleOnCancel() {
    setShowModal(false)

    setInitialValues(null)

    onClose(false)
  }

  async function handleOnSubmit(formValues: IAssignTeamForm) {
    try {
      showLoader()

      const { data, message } = await post(
        `parametrizations/users/team/${formValues.user}`,
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'O cadastro do Usuário foi editado.'
        })

        setShowModal(false)

        setInitialValues(null)

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
    <Modal visible={showModal} onClose={() => handleOnCancel()}>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="group_add" />

            <Subtitle size="sm">Atribuir Equipe</Subtitle>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <AssignTeamRegisterForm
            // initialValues={initialValues}
            initialValues={{ isSupervisor: false, team: '', user: '' }}
            onCancel={() => handleOnCancel()}
            onSubmit={values => handleOnSubmit(values)}
          />
        </Col>
      </Row>
    </Modal>
  )
}

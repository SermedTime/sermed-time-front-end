import { Button } from '@/components/Core/Buttons/Button'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'
import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

interface Props {
  data: ITimeSheet
  onClose: (hasChanges: boolean) => void
}

export function EditTimeSheet({ data, onClose }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()

  const [showModal, setShowModal] = useState(false)
  const [readOnly, setReadOnly] = useState(true)

  useEffect(() => {
    if (data.date) {
      setShowModal(true)
      setReadOnly(true)
    }
  }, [data])

  function handleOnCancel() {
    setShowModal(false)
    setReadOnly(true)

    onClose(false)
  }

  return (
    <Modal visible={showModal} onClose={() => handleOnCancel()}>
      <Row>
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="edit" />

            <Subtitle size="sm">Editar Equipe</Subtitle>
          </div>
        </Col>

        <Col>
          <Button
            type="button"
            styles="tertiary"
            icon="edit"
            onClick={() => setReadOnly(readOnly => !readOnly)}
            disabled={!readOnly || !hasParametrizationsWriter()}
          >
            {`${readOnly ? 'Alterar' : 'Alterando...'}`}
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

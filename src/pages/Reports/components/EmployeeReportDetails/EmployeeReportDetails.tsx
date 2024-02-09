import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Tab, Tabs } from '@/components/Core/Tabs'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

interface Props {
  user_id: string
  user_name: string
  onClose: () => void
}

export function EmployeeReportDetails({ user_id, user_name, onClose }: Props) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user_id) {
      setShowModal(true)
    }
  }, [user_id])

  function handleOnCancel() {
    setShowModal(false)

    onClose()
  }

  return (
    <Modal visible={showModal} onClose={() => handleOnCancel()}>
      <Row>
        <Col>
          <div className="d-flex align-items-center gap-2 mb-5">
            <Icon icon="list_alt" />

            <Subtitle size="sm">{user_name}</Subtitle>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Tabs defaultActiveKey="absenses">
            <Tab eventKey="absenses" title="Faltas">
              <div>Faltas</div>
            </Tab>

            <Tab eventKey="extra_hour" title="Horas Extras">
              <div>Horas Extras</div>
            </Tab>

            <Tab eventKey="annual_leave" title="Banco de Horas">
              <div>Banco de Horas</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Modal>
  )
}

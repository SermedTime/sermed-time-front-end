import { Modal } from '@/components/Core/Modal'
import { Tab, Tabs } from '@/components/Core/Tabs'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { WorkingDay } from './components/WorkingDay'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function EditWorkingDay({ uuid, onClose }: Props) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (uuid) {
      setShowModal(true)
    }
  }, [uuid])

  function handleOnCancel(hasChanges: boolean) {
    setShowModal(false)

    onClose(hasChanges)
  }

  return (
    <Modal visible={showModal} onClose={() => handleOnCancel(false)}>
      <Row>
        <Col>
          <Tabs defaultActiveKey="workingDay">
            <Tab eventKey="workingDay" title="Jornada de Trabalho">
              <WorkingDay
                uuid={uuid}
                onClose={(hasChanges: boolean) => handleOnCancel(hasChanges)}
              />
            </Tab>

            <Tab eventKey="hours" title="Horas da jornada">
              <div>
                <h1>Horas da jornada</h1>
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Modal>
  )
}

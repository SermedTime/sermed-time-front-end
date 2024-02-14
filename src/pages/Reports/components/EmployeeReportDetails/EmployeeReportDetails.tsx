import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Tab, Tabs } from '@/components/Core/Tabs'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Absenses } from './components/Absenses'
import { ExtraHour } from './components/ExtraHour'
import { AnnualLeave } from './components/AnnualLeave'

interface Props {
  params: {
    user_id: string
    initial_date: string
    final_date: string
  }
  user_name: string
  onClose: () => void
}

export function EmployeeReportDetails({ params, user_name, onClose }: Props) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (params.user_id) {
      setShowModal(true)
    }
  }, [params])

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
              <Absenses params={params} />
            </Tab>

            <Tab eventKey="extra_hour" title="Horas Extras">
              <ExtraHour params={params} />
            </Tab>

            <Tab eventKey="annual_leave" title="Banco de Horas">
              <AnnualLeave params={params} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Modal>
  )
}

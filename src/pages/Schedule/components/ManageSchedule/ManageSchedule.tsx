import { useToastContext } from '@/contexts/Toast'
import { useLoaderContext } from '@/contexts/Loader'

import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

interface ITeam {
  team_id: string
  team_name: string
}

interface Props {
  team: ITeam | undefined
  date: Date | undefined
  show: boolean
  onClose: (hasChanges?: boolean) => void
}

export function ManageSchedule({ team, date, show, onClose }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast } = useToastContext()

  return (
    <Modal blur="xl" visible={show} onClose={() => onClose(false)}>
      <div className="d-flex align-items-center gap-2 mb-5">
        <Icon appearance="outlined" size="lg" icon="event_available" />

        <Subtitle size="sm">Gerenciamendo de Escala</Subtitle>
      </div>

      <Row>
        <Col>
          {/* <EventRegisterForm
            mode="create"
            initialValues={{
              titleId: '',
              titleUuid: '',
              customerUuid: customer ? customer.customerUuid : '',
              tradingName: customer ? customer.tradingName : '',
              contactMethodUuid: '',
              contactSourceUuid: '',
              eventDate: date || '',
              startTime: '',
              endTime: '',
              allDay: false,
              notes: ''
            }}
            onCancel={hasChanges => onClose(hasChanges)}
            onSubmit={values => handleOnSubmit(values)}
          /> */}
        </Col>
      </Row>
    </Modal>
  )
}

ManageSchedule.defaultProp = {
  team: undefined
}

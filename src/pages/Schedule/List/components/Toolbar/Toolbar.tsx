import { Row, Col } from 'react-bootstrap'

import { NavigateAction } from 'react-big-calendar'
import { Icon } from '@/components/Core/Icons/Icon'
import { Heading } from '@/components/Core/Typography/Heading'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

interface Props {
  label: string
  onNavigate: (action: NavigateAction, date?: Date) => void
}

export function Toolbar({ label, onNavigate }: Props) {
  return (
    <Row className="justify-content-between align-items-center mb-4">
      <Col xs="auto">
        <div className="d-flex align-items-center gap-2">
          <Icon appearance="outlined" size="md" icon="calendar_today" />

          <Heading size="xs">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Heading>
        </div>
      </Col>

      <Col xs="auto">
        <Row>
          <Col>
            <ButtonIcon
              size="sm"
              icon="keyboard_arrow_left"
              onClick={() => onNavigate('PREV')}
            />
          </Col>

          <Col>
            <ButtonIcon
              size="sm"
              icon="keyboard_arrow_right"
              onClick={() => onNavigate('NEXT')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

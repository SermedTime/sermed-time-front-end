import { ReactNode, useState } from 'react'

import { Row, Col } from 'react-bootstrap'

import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { Container, Body } from './Accordion.styles'

interface Props extends React.HTMLProps<HTMLDivElement> {
  defaultOpen?: boolean
  heading: ReactNode
  description?: string
  visible?: boolean
  children: ReactNode
}

export function Accordion({
  defaultOpen,
  heading,
  description,
  visible,
  className,
  children
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false)

  return (
    <Container open={isOpen} className={className}>
      <Row className="justify-content-between align-items-center">
        <Col>{heading}</Col>

        <Col xs="auto">
          <ButtonIcon
            size="md"
            icon={`${isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}`}
            onClick={() => setIsOpen(open => !open)}
          />
        </Col>
      </Row>

      <Body open={isOpen} visible={visible}>
        <Paragraph size="sm">{description}</Paragraph>

        <Row>
          <Col>{children}</Col>
        </Row>
      </Body>
    </Container>
  )
}

Accordion.defaultProps = {
  defaultOpen: undefined,
  visible: undefined,
  description: undefined
}

import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Caption } from '@/components/Core/Typography/Caption'
import { Heading } from '@/components/Core/Typography/Heading'
import { Col, Row } from 'react-bootstrap'

export function ListTimeSheet() {
  return (
    <Section>
      <Row className="mb-3">
        <Col>
          <div className="d-flex gap-1">
            <Icon appearance="outlined" size="lg" icon="poll" />

            <div className="mt-1">
              <Heading size="xs">Resumo das Horas</Heading>

              <Caption size="lg">Dados deste mês</Caption>
            </div>
          </div>
        </Col>
      </Row>
    </Section>
  )
}

import { useParams } from 'react-router-dom'

import { Summary } from '@/pages/Home/components/Summary'
import { Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { ListTimeSheet } from './components/List'

export function TimeSheetView() {
  const { uuid } = useParams()

  return (
    <Container>
      {uuid && (
        <Row className="mb-4">
          <Summary user_id={uuid} />
        </Row>
      )}

      <Row>
        <Section>
          <ListTimeSheet />
        </Section>
      </Row>
    </Container>
  )
}

import { Container, Row } from 'react-bootstrap'
import { ListPayslips } from './components/List'

export function PayslipsView() {
  return (
    <Container>
      <Row>
        <ListPayslips />
      </Row>
    </Container>
  )
}

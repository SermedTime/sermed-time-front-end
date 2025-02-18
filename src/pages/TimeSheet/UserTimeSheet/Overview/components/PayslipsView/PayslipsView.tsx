import { Row } from 'react-bootstrap'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'

import { ListPayslips } from './components/List'

export function PayslipsView() {
  return (
    <AnimatedPage>
      <Row>
        <ListPayslips />
      </Row>
    </AnimatedPage>
  )
}

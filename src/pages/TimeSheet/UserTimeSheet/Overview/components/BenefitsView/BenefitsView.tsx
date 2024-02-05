import { Row } from 'react-bootstrap'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { ListBenefits } from './components/List'

export function BenefitsView() {
  return (
    <AnimatedPage>
      <Row>
        <ListBenefits />
      </Row>
    </AnimatedPage>
  )
}

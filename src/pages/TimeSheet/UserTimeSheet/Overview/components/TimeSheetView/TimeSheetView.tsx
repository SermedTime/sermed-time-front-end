import { useParams } from 'react-router-dom'

import { Summary } from '@/pages/Home/components/Summary'
import { Row } from 'react-bootstrap'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { ListTimeSheet } from './components/List'

export function TimeSheetView() {
  const { uuid } = useParams()

  return (
    <AnimatedPage>
      {uuid && (
        <Row className="mb-4">
          <Summary user_id={uuid} />
        </Row>
      )}

      <Row>
        <ListTimeSheet />
      </Row>
    </AnimatedPage>
  )
}

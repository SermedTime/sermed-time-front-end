import { useEffect } from 'react'

import { useAuthContext } from '@/contexts/Auth'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'

import { TITLE_HOME } from '@/constants/title.browser'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'

import { Col, Container, Row } from 'react-bootstrap'

import { WidgetPaycheck } from '@/components/Rules/Users/Widgets/Paycheck'
import { Summary } from './components/Summary'
import { TimeSheet } from './components/TimeSheet'

export function Home() {
  const { user } = useAuthContext()
  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  useEffect(() => {
    document.title = TITLE_HOME

    setPageHeading(`Olá, ${user?.firstName}!`)

    setPageBreadcrumb([])
  }, [user, setPageHeading, setPageBreadcrumb])

  return (
    <AnimatedPage>
      <Container>
        <Row>
          <Col g={9} xxl={10}>
            <Row className="mb-4">
              <Col>
                <Summary />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <TimeSheet />
              </Col>
            </Row>
          </Col>

          <Col lg={3} xxl={2}>
            <Row className="mb-4">
              <Col>
                <WidgetPaycheck />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'

import { TITLE_USER_TIME_SHEET_OVERVIEW } from '@/constants/title.browser'
import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { ROUTE_TIME_SHEET_USER_SEARCH } from '@/routes/Pages/TimeSheet/TimeSheet.paths'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'

import { Summary } from '@/pages/Home/components/Summary'
import { UserData } from './components/UserData'
import { WidgetMenu } from './components/WidgetMenu'
import { usePageViewContext } from '../context/PageView'

export function Overview() {
  const { uuid } = useParams()

  const { view } = usePageViewContext()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  useEffect(() => {
    document.title = TITLE_USER_TIME_SHEET_OVERVIEW

    setPageHeading('Folha de ponto')

    setPageBreadcrumb([
      { text: 'Home', route: ROUTE_HOME },
      { text: 'Funcionários', route: ROUTE_TIME_SHEET_USER_SEARCH },
      { text: 'Visão Geral' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  console.log(view)

  return (
    <AnimatedPage>
      <Container>
        <Row>
          <Col lg={9} xxl={10}>
            <Row className="mb-4">
              <Col>
                <Section>
                  <Row className="mb-5">
                    <Col>
                      <UserData user_id={uuid || ''} />
                    </Col>
                  </Row>
                </Section>
              </Col>
            </Row>

            {uuid && (
              <Row className="mb-4">
                <Summary user_id={uuid} />
              </Row>
            )}
          </Col>

          <Col lg={3} xxl={2}>
            <WidgetMenu />
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

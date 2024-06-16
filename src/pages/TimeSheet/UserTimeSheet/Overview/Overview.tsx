import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { TITLE_USER_TIME_SHEET_OVERVIEW } from '@/constants/title.browser'
import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { ROUTE_TIME_SHEET_USER_SEARCH } from '@/routes/Pages/TimeSheet/TimeSheet.paths'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'

import { UserData } from './components/UserData'
import { WidgetMenu } from './components/WidgetMenu'
import { usePageViewContext } from '../context/PageView'
import { TimeSheetView } from './components/TimeSheetView'
import { PayslipsView } from './components/PayslipsView'
import { BenefitsView } from './components/BenefitsView'

export function Overview() {
  const { uuid } = useParams()

  const { hasMultiviewPoint, hasTeamPoint } = useAuthRoles()

  const { view, pageTitle } = usePageViewContext()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  useEffect(() => {
    document.title = TITLE_USER_TIME_SHEET_OVERVIEW

    setPageHeading(pageTitle)

    setPageBreadcrumb(
      hasMultiviewPoint() || hasTeamPoint()
        ? [
            { text: 'Home', route: ROUTE_HOME },
            { text: 'Funcionários', route: ROUTE_TIME_SHEET_USER_SEARCH },
            { text: 'Visão Geral' }
          ]
        : [{ text: 'Home', route: ROUTE_HOME }, { text: 'Visão Geral' }]
    )
  }, [
    setPageHeading,
    setPageBreadcrumb,
    pageTitle,
    hasMultiviewPoint,
    hasTeamPoint
  ])

  return (
    <AnimatedPage>
      <Container>
        <Row>
          <Col lg={9} xxl={10}>
            <Row className="mb-4">
              <Col>
                <Row>
                  <Col>
                    <UserData user_id={uuid || ''} />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <Row>
                  <Col>
                    {view === 'summary' && <TimeSheetView />}

                    {view === 'payslips' && <PayslipsView />}

                    {view === 'benefits' && <BenefitsView />}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col lg={3} xxl={2}>
            <WidgetMenu />
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

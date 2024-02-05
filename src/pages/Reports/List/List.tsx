import { useEffect, useState } from 'react'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { TITLE_REPORTS } from '@/constants/title.browser'

import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Section } from '@/components/Core/Containers/Section'

export function ListReports() {
  const [loaded, setLoaded] = useState(false)

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  useEffect(() => {
    document.title = TITLE_REPORTS

    setPageHeading('Equipes')

    setPageBreadcrumb([
      { text: 'Home', route: ROUTE_HOME },
      { text: 'Relatórios' }
    ])

    setLoaded(true)
  }, [setPageHeading, setPageBreadcrumb])

  return (
    <AnimatedPage>
      <Container>
        <Row>
          <Col lg={9} xxl={10}>
            <Section>
              <Row className="mb-2">
                <Col>Filtros</Col>
              </Row>
            </Section>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

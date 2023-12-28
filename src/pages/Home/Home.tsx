import { useEffect } from 'react'

import { useAuthContext } from '@/contexts/Auth'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'

import { TITLE_HOME } from '@/constants/title.browser'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'

import { Col, Container, Row } from 'react-bootstrap'

import { Summary } from './Summary'

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
              <Summary />
            </Row>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

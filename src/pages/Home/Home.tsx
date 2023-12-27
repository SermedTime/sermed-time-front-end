import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/contexts/Auth'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'

import { TITLE_HOME } from '@/constants/title.browser'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'

export function Home() {
  const navigate = useNavigate()

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
            <h1>Home</h1>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

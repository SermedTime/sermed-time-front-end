import { useNavigate } from 'react-router-dom'

import { Col, Container, Row } from 'react-bootstrap'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'

import { useHeaderContext } from '@/contexts/Layout/Header'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'

import { Heading } from '@/components/Core/Typography/Heading'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { DropdownMenu } from './Dropdown'
import { Breadcrumb } from '../Breadcrumb'

export function Header() {
  const navigate = useNavigate()

  const { visible, heading } = useHeaderContext()
  const { breadcrumb } = useBreadcrumbContext()

  if (!visible) return null

  return (
    <Container className="my-lg-4 my-xxl-5">
      <Row>
        <Col lg={9} xxl={10}>
          <Row className="align-items-center justify-content-between h-100">
            <Col xs={8}>
              <Row>
                <Col xs={12}>
                  <Heading size="sm">{heading}</Heading>
                </Col>

                <Col className="mt-1">
                  <Breadcrumb items={breadcrumb} />
                </Col>
              </Row>
            </Col>

            <Col xs={4}>
              <div className="d-flex align-items-center justify-content-end gap-4">
                <div className="d-flex align-items-center justify-content-end gap-1">
                  <ButtonIcon
                    size="md"
                    icon="assistant"
                    onClick={() => navigate(ROUTE_HOME)}
                  />

                  <ButtonIcon
                    size="md"
                    icon="calendar_today"
                    onClick={() => navigate(ROUTE_HOME)} // NAVEGAR PARA ESCALA
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={3} xxl={2}>
          <DropdownMenu />
        </Col>
      </Row>
    </Container>
  )
}

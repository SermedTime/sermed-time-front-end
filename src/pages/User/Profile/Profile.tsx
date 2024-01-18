import { useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useAuthContext } from '@/contexts/Auth'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'

import { DataDisplay } from '@/components/Core/Data/Display'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { TITLE_USER_PROFILE } from '@/constants/title.browser'

import { WidgetPaycheck } from '@/components/Rules/Users/Widgets/Paycheck'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Wrapper } from './components/Wrapper'

export function UserProfile() {
  const { user } = useAuthContext()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  useEffect(() => {
    document.title = TITLE_USER_PROFILE

    setPageHeading('Perfil do Usuário')

    setPageBreadcrumb([
      {
        text: 'Home',
        route: ROUTE_HOME
      },
      {
        text: 'Perfil do Usuário'
      }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  return (
    <Container>
      <Row>
        <Col lg={10} xxl={10}>
          <Wrapper>
            <Row className="mb-4">
              <Col xs={4}>
                <DataDisplay
                  label="Nome"
                  value={user ? user.userName : ''}
                  loading={!user}
                />
              </Col>

              <Col xs={4}>
                <DataDisplay
                  label="E-mail"
                  value={user ? user.email : ''}
                  loading={!user}
                />
              </Col>

              <Col xs={4}>
                <DataDisplay
                  label="Senha"
                  value="***********"
                  loading={!user}
                />
              </Col>
            </Row>

            {user && (
              <Paragraph size="sm">
                {`Última alteração em ${format(
                  new Date(user.lastUpdateDate),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: ptBR
                  }
                )}`}
              </Paragraph>
            )}
          </Wrapper>
        </Col>
        <Col lg={2} xxl={2}>
          <Row className="mb-4">
            <Col>
              <WidgetPaycheck />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

import { ReactNode } from 'react'

import { useLocation, Link } from 'react-router-dom'

import { Row, Col } from 'react-bootstrap'

import { ROUTE_USER_CHANGE_PASSWORD } from '@/routes/Pages/User/User.paths'

import { Section } from '@/components/Core/Containers/Section'
import { UserAvatar } from '@/components/Core/User/Avatar'

import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

import { Tooltip } from '@/components/Core/Tooltip'
import * as S from './Wrapper.styles'

interface Props {
  children: ReactNode
}

export function Wrapper({ children }: Props) {
  const location = useLocation()

  return (
    <S.Container>
      <S.Header>
        <S.Avatar>
          <UserAvatar size="lg" />
        </S.Avatar>
      </S.Header>

      <Section>
        <S.Body>
          <Row className="justify-content-end align-items-center">
            <Col xs="auto">
              <div className="d-flex">
                <Tooltip title="Editar Senha" place="top">
                  <Link to={ROUTE_USER_CHANGE_PASSWORD}>
                    <ButtonIcon
                      appearance="outlined"
                      size="md"
                      icon="edit"
                      disabled={
                        location.pathname === ROUTE_USER_CHANGE_PASSWORD
                      }
                    />
                  </Link>
                </Tooltip>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center mt-5">
            <Col xxl={11}>{children}</Col>
          </Row>
        </S.Body>
      </Section>
    </S.Container>
  )
}

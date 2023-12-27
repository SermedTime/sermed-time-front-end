import { useFooterContext } from '@/contexts/Layout/Footer'

import { Col, Container, Row } from 'react-bootstrap'

import { ROUTE_TERMS_OF_USE } from '@/routes/Pages/Pages.paths'

import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'

import * as S from './Footer.styles'

export function Footer() {
  const { visible } = useFooterContext()

  if (!visible) return null

  return (
    <S.Wrapper>
      <Container>
        <Row>
          <Col lg={9} xxl={10}>
            <Row className="justify-content-center">
              <Col xs="auto">
                <ButtonLink route={ROUTE_TERMS_OF_USE}>
                  Termos de Uso e Políticas de Privacidade
                </ButtonLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </S.Wrapper>
  )
}

import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'react-bootstrap'

import { Icon } from '@/components/Core/Icons/Icon'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

import { Heading } from '@/components/Core/Typography/Heading'
import * as S from './Card.styles'

interface IRouteToAdd {
  title: string
  disabled: boolean
}

export interface ICard {
  icon: string
  title: string
  routeToList: string
  routeToAdd?: IRouteToAdd
}

export function Card({ icon, title, routeToList, routeToAdd }: ICard) {
  const navigate = useNavigate()

  return (
    <S.Container>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <S.IconWrapper>
            <Icon icon={icon} />
          </S.IconWrapper>
        </Col>

        <Col xs="auto">
          <div className="d-flex justify-content-end">
            <ButtonIcon
              size="md"
              icon="widgets"
              onClick={() => navigate(routeToList)}
            />

            {routeToAdd && (
              <ButtonIcon
                size="md"
                icon="add"
                disabled={!routeToAdd || routeToAdd.disabled}
                onClick={() => navigate(routeToAdd.title)}
              />
            )}
          </div>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <S.Title>
            <Heading size="xs">{title}</Heading>
          </S.Title>
        </Col>
      </Row>
    </S.Container>
  )
}

Card.defaultProps = {
  routeToAdd: undefined
}

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Row, Col } from 'react-bootstrap'

import { ROUTE_TIME_SHEET_OVERVIEW } from '@/routes/Pages/TimeSheet/TimeSheet.paths'

import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Heading } from '@/components/Core/Typography/Heading'
import { Tag } from '@/components/Core/Tag'
import { Caption } from '@/components/Core/Typography/Caption'
import { Icon } from '@/components/Core/Icons/Icon'
import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Skeleton } from '@/components/Core/Skeleton'

import * as S from './User.styles'

interface IUser {
  userUuid: string
  name: string
  socialName: string
  cpf: string
  status: 'active' | 'inactive'
  employeeCode: string
}

interface UserDisplayProps {
  displayMode: string
  data?: IUser
}

interface DisplayProps {
  data: IUser | undefined
  onDetails: () => void
}

function DisplayAsCard({ data, onDetails }: DisplayProps) {
  const navigate = useNavigate()

  return (
    <S.Card>
      <Row className="justify-content-between mb-3">
        <Col>
          <Row className="align-items-center">
            <Col xs={data ? 'auto' : 2}>
              {data ? (
                <S.Avatar status={data.status}>
                  <Icon size="sm" icon="person_outline" />
                </S.Avatar>
              ) : (
                <Skeleton size="lg" />
              )}
            </Col>

            <Col xs={data ? 'auto' : 6}>
              <Row>
                <Col xs={data ? undefined : 8}>
                  {data ? (
                    <Paragraph size="sm">{data.socialName}</Paragraph>
                  ) : (
                    <Skeleton size="sm" />
                  )}
                </Col>
              </Row>

              <Row>
                <Col>
                  {data ? (
                    <Caption size="lg">{data.name}</Caption>
                  ) : (
                    <Skeleton size="sm" />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={8}>
          <Col xs={data ? undefined : 6}>
            {data ? (
              <Caption size="lg">{`CPF: ${data.cpf}`}</Caption>
            ) : (
              <Skeleton size="sm" />
            )}
          </Col>
        </Col>

        <Col xs={4}>
          <Row className="justify-content-end">
            <Col xs={data ? 'auto' : 7}>
              {data ? (
                <div className="d-flex align-items-center">
                  <S.Insured status={data.status}>
                    {data.employeeCode}
                  </S.Insured>
                </div>
              ) : (
                <Skeleton size="sm" />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={data ? 'auto' : 2}>
          {data ? (
            <ButtonLink
              size="sm"
              onClick={() =>
                navigate(`${ROUTE_TIME_SHEET_OVERVIEW}/${data.userUuid}`)
              }
            >
              Relatório de Ponto
            </ButtonLink>
          ) : (
            <Skeleton size="sm" />
          )}
        </Col>
      </Row>
    </S.Card>
  )
}

function DisplayAsList({ data, onDetails }: DisplayProps) {}

import { useNavigate } from 'react-router-dom'

import { Row, Col } from 'react-bootstrap'

import { ROUTE_TIME_SHEET_OVERVIEW } from '@/routes/Pages/TimeSheet/TimeSheet.paths'

import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { Caption } from '@/components/Core/Typography/Caption'
import { Icon } from '@/components/Core/Icons/Icon'
import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Skeleton } from '@/components/Core/Skeleton'

import { cpfMask } from '@/utils/masks'
import * as S from './User.styles'

interface IUser {
  uuid: string
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
}

function DisplayAsCard({ data }: DisplayProps) {
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
        <Col xs={6}>
          <Col xs={data ? undefined : 6}>
            {data ? (
              <Caption size="lg">{`CPF: ${cpfMask(data.cpf)}`}</Caption>
            ) : (
              <Skeleton size="sm" />
            )}
          </Col>
        </Col>

        <Col xs={6}>
          <Row className="justify-content-end">
            <Col xs={data ? 'auto' : 6}>
              {data ? (
                <div className="d-flex align-items-center">
                  <S.Insured status={data.status}>
                    {`Matrícula: ${data.employeeCode}`}
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
                navigate(`${ROUTE_TIME_SHEET_OVERVIEW}/${data.uuid}`)
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

function DisplayAsList({ data }: DisplayProps) {
  const navigate = useNavigate()

  return (
    <S.List>
      <Row className="align-items-center">
        <Col lg={1} xxl={data ? 'auto' : 1}>
          {data ? (
            <S.Avatar status={data.status}>
              <Icon size="sm" icon="person_outline" />
            </S.Avatar>
          ) : (
            <Skeleton size="lg" />
          )}
        </Col>

        <Col lg={3} xxl={5}>
          <Row>
            <Col xs={data ? undefined : 5}>
              {data ? (
                <Paragraph size="sm" className="text-truncate">
                  {data.socialName}
                </Paragraph>
              ) : (
                <Skeleton size="sm" />
              )}
            </Col>
          </Row>

          <Row>
            <Col xs={data ? undefined : 6}>
              {data ? (
                <Caption size="lg" className="text-truncate">
                  {data.name}
                </Caption>
              ) : (
                <Skeleton size="sm" />
              )}
            </Col>
          </Row>
        </Col>

        <Col lg={7} xxl={6}>
          <Row className="justify-content-end align-items-center">
            <Col xs={data ? 5 : 6}>
              {data ? (
                <Caption size="lg">{`CPF: ${cpfMask(data.cpf)}`}</Caption>
              ) : (
                <Skeleton size="sm" />
              )}
            </Col>

            <Col xs={data ? 5 : 6}>
              {data ? (
                <div className="d-flex align-items-center ">
                  <S.Insured status={data.status}>
                    {`Matrícula: ${data.employeeCode}`}
                  </S.Insured>
                </div>
              ) : (
                <Skeleton size="sm" />
              )}
            </Col>

            <Col xs={data ? 2 : 1}>
              {data ? (
                <div className="d-flex gap-1">
                  <ButtonIcon
                    size="sm"
                    icon="open_in_new"
                    onClick={() =>
                      navigate(`${ROUTE_TIME_SHEET_OVERVIEW}/${data.uuid}`)
                    }
                  />
                </div>
              ) : (
                <Skeleton size="sm" />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </S.List>
  )
}

export function Customer({ displayMode, data }: UserDisplayProps) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {displayMode === 'cards' ? (
        <DisplayAsCard data={data} />
      ) : (
        <DisplayAsList data={data} />
      )}
    </>
  )
}

Customer.defaultProps = {
  data: undefined
}

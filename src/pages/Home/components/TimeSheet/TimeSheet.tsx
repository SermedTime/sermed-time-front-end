import { useEffect } from 'react'

import { useTimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { useAuthContext } from '@/contexts/Auth'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { Col, Row } from 'react-bootstrap'

import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Skeleton } from '@/components/Core/Skeleton'
import { Caption } from '@/components/Core/Typography/Caption'
import { Heading } from '@/components/Core/Typography/Heading'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { Empty } from '@/components/Core/Table/Empty'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'

import {
  ROUTE_TIME_SHEET_OVERVIEW,
  ROUTE_TIME_SHEET_USER_SEARCH
} from '@/routes/Pages/TimeSheet/TimeSheet.paths'

import { TableTime } from './components/Table'

export function TimeSheet() {
  const { user } = useAuthContext()

  const { hasMultiviewPoint, hasTeamPoint } = useAuthRoles()

  const { result, setParams } = useTimeSheet(user?.userUuid)

  useEffect(() => {
    const today = new Date()

    const params = {
      page: 1,
      records: 10,
      order: 'desc',
      month: today.getMonth() + 1,
      year: today.getFullYear()
    }

    setParams(params)
  }, [setParams])

  return (
    <Section>
      <Row className="mb-3">
        <Col>
          <div className="d-flex gap-1">
            <Icon appearance="outlined" size="lg" icon="poll" />

            <div className="mt-1">
              <Heading size="xs">Resumo das Horas</Heading>

              <Caption size="lg">Dados deste mês</Caption>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table isLoading={result === null} hover={!!result?.data.length}>
            <Thead>
              <Tr>
                <Th>
                  <Heading size="xs">Data</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Ent. 1</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Saí. 1</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Ent. 2</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Saí. 2</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Ent. 3</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Saí. 3</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Saldo</Heading>
                </Th>

                <Th>
                  <div style={{ height: '2.5rem', width: '2.5rem' }} />
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {result ? (
                result.data.length > 0 ? (
                  result.data.map((item, idx) => (
                    <TableTime key={idx} data={item} />
                  ))
                ) : (
                  <Empty columns={8} />
                )
              ) : (
                <LoadingLines lines={10} columns={8} />
              )}
            </Tbody>
          </Table>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        {result ? (
          <Col xs="auto">
            <ButtonLink
              route={
                hasMultiviewPoint() || (hasTeamPoint() && user?.teamId)
                  ? ROUTE_TIME_SHEET_USER_SEARCH
                  : `${ROUTE_TIME_SHEET_OVERVIEW}/${user?.userUuid}`
              }
            >
              Exibir mais
            </ButtonLink>{' '}
            {/* Rota para tela de Horas */}
          </Col>
        ) : (
          <Col xs={2}>
            <Skeleton />
          </Col>
        )}
      </Row>
    </Section>
  )
}

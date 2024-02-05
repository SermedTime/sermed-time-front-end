import { useEffect } from 'react'

import { useSchedules } from '@/hooks/services/Schedules/useSchedules'

import { Section } from '@/components/Core/Containers/Section'
import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Heading } from '@/components/Core/Typography/Heading'
import { Caption } from '@/components/Core/Typography/Caption'
import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { Skeleton } from '@/components/Core/Skeleton'
import { ROUTE_SCHEDULE } from '@/routes/Pages/Schedule/Schedules.paths'

import { useAuthContext } from '@/contexts/Auth'
import { TableWorkTime } from './components/TableWorkTime'

export function WorkTime() {
  const { result, setParams } = useSchedules()

  const { user } = useAuthContext()

  useEffect(() => {
    if (result === null) {
      setParams({
        is_home: 'active',
        user_id: user?.userUuid
      })
    }
  })

  return (
    <Section>
      <Row className="mb-3">
        <Col>
          <div className="d-flex gap-1">
            <Icon appearance="outlined" size="lg" icon="work_history" />

            <div className="mt-1">
              <Heading size="xs">Horário de Trabalho</Heading>

              <Caption size="lg">Resumo dos próximos 7 dias</Caption>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <TableWorkTime result={result || []} />
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        {result ? (
          <Col xs="auto">
            <ButtonLink route={ROUTE_SCHEDULE}>Exibir mais</ButtonLink>{' '}
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

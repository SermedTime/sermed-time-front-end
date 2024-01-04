import { useCallback, useEffect, useState } from 'react'

import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Skeleton } from '@/components/Core/Skeleton'
import { Caption } from '@/components/Core/Typography/Caption'
import { Heading } from '@/components/Core/Typography/Heading'

import { Col, Row } from 'react-bootstrap'

import { ROUTE_TIME_SHEET_USER_SEARCH } from '@/routes/Pages/TimeSheet/TimeSheet.paths'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { fakeRequest } from '@/services/api/sermed-api/sermed-api'
import { TableTime } from './components/Table'

import { ITimeSheet, fakeTimeSheet } from './TimeSheet.inteface'

const res: IApiResponse<ITimeSheet> = {
  data: fakeTimeSheet,
  total: 10,
  page: 1
}

export function TimeSheet() {
  const [result, setResult] = useState<ITimeSheet[] | null>(null)

  const fetchData = useCallback(async () => {
    try {
      await fakeRequest(2000)

      setResult(res.data)
    } catch {
      setResult(null)
    }
  }, [])

  useEffect(() => {
    if (result === null) {
      fetchData()
    }
  }, [result, fetchData])

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
          <TableTime result={result} />
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        {result ? (
          <Col xs="auto">
            <ButtonLink route={ROUTE_TIME_SHEET_USER_SEARCH}>
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

import { useCallback, useEffect, useState } from 'react'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { fakeRequest } from '@/services/api/sermed-api/sermed-api'
import { Section } from '@/components/Core/Containers/Section'
import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Heading } from '@/components/Core/Typography/Heading'
import { Caption } from '@/components/Core/Typography/Caption'
import { IWorkTime, fakeWorkTime } from './WorkTime.interface'
import { TableWorkTime } from './components/TableWorkTime'

const res: IApiResponse<IWorkTime> = {
  data: fakeWorkTime,
  total: 10,
  page: 1
}

export function WorkTime() {
  const [result, setResult] = useState<IWorkTime[] | null>(null)

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
            <Icon appearance="outlined" size="lg" icon="work_history" />

            <div className="mt-1">
              <Heading size="xs">Horário de Trabalho</Heading>

              <Caption size="lg">Escala Semanal</Caption>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <TableWorkTime result={result} />
        </Col>
      </Row>
    </Section>
  )
}

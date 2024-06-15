import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { InfoCard } from '@/components/Core/Data/InfoCard'

import { Col, Row } from 'react-bootstrap'

import { ISummary } from './Summary.interface'

interface Props {
  user_id?: string
}

export function Summary({ user_id }: Props) {
  const [result, setResult] = useState<ISummary | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const { data } = await get('/home/overtime-absence-summary')

      if (data) {
        setResult(data.data.summary)
      } else {
        setResult({
          absencesInMonth: 0,
          annualLeave: '00:00',
          overtimeInMonth: '00:00'
        })
      }
    } catch {
      setResult({
        absencesInMonth: 0,
        annualLeave: '00:00',
        overtimeInMonth: '00:00'
      })
    }
  }, [])

  useEffect(() => {
    if (result === null && user_id) {
      fetchData()
    }
  }, [result, fetchData, user_id])

  return (
    <Row>
      <Col>
        <InfoCard
          icon="warning"
          value={result?.absencesInMonth}
          suffix="Falta(s)"
          caption="Faltas no mês"
          indicator={true}
          valueColor={result?.absencesInMonth ? 'warning' : 'success'}
        />
      </Col>

      <Col>
        <InfoCard
          icon="add_alarm"
          value={result?.overtimeInMonth}
          caption="Total Horas Extras no mês"
          indicator={true}
        />
      </Col>

      <Col>
        <InfoCard
          icon="punch_clock"
          value={result?.annualLeave}
          caption="Total Banco de Horas no mês"
          indicator={true}
        />
      </Col>
    </Row>
  )
}

Summary.defaultProps = {
  user_id: undefined
}

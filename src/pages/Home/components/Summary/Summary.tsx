import { useCallback, useEffect, useState } from 'react'

import { fakeRequest } from '@/services/api/sermed-api/sermed-api'

import { IApiResponse } from '@/services/api/sermed-api/sermed-api.interface'
import { InfoCard } from '@/components/Core/Data/InfoCard'

import { Col, Row } from 'react-bootstrap'

import { convertIntToTime } from '@/utils/date'
import { ISummary } from './Summary.interface'

interface Props {
  user_id: string
}

const res: IApiResponse<ISummary> = {
  data: [
    {
      absencesInMonth: 2,
      overtimeInMonth: 4.3,
      annualLeave: 7.5
    }
  ],
  total: 1,
  page: 1
}

export function Summary({ user_id }: Props) {
  console.log(user_id)
  const [result, setResult] = useState<ISummary | null>(null)

  const fetchData = useCallback(async () => {
    try {
      await fakeRequest(2000)

      setResult(res.data[0])
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
    <Row>
      <Col>
        <InfoCard
          icon="warning"
          value={result?.absencesInMonth ? result?.absencesInMonth : 0}
          suffix="Falta(s)"
          caption="Faltas no mês"
          indicator={true}
          valueColor={result?.absencesInMonth ? 'warning' : 'success'}
        />
      </Col>

      <Col>
        <InfoCard
          icon="add_alarm"
          value={convertIntToTime(result?.overtimeInMonth)}
          caption="Total Horas Extras no mês"
          indicator={true}
        />
      </Col>

      <Col>
        <InfoCard
          icon="punch_clock"
          value={convertIntToTime(result?.annualLeave)}
          caption="Total Banco de Horas no mês"
          indicator={true}
        />
      </Col>
    </Row>
  )
}

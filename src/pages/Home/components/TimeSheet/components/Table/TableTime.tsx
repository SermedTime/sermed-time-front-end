import { Td, Tr } from '@/components/Core/Table'

import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { Col } from 'react-bootstrap'
import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { convertIsoDateToPtBr, convertIsoDateToTime } from '@/utils/date'

interface Props {
  data: ITimeSheet
}

export function TableTime({ data }: Props) {
  return (
    <Tr>
      <Td>
        <Col xs="auto">
          <Paragraph size="sm">{`${convertIsoDateToPtBr(data.date)} - ${
            data.day
          }`}</Paragraph>
        </Col>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.firstEntry)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.firstExit)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">
          {convertIsoDateToTime(data.secondEntry)}
        </Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.secondExit)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.thirdEntry)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.thirdExit)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.overtime)}</Paragraph>
      </Td>
    </Tr>
  )
}

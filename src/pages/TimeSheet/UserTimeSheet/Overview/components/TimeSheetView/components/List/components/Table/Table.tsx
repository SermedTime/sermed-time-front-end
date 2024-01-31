import { Col } from 'react-bootstrap'

import { Td, Tr } from '@/components/Core/Table'

import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'

interface Props {
  data: ITimeSheet
}

export function TableTimeSheet({ data }: Props) {
  return (
    <Tr>
      <Td>
        <Col xs="auto">
          <Paragraph size="sm">{data.date}</Paragraph>
        </Col>
      </Td>

      <Td>
        <Paragraph size="sm">{data.firstEntry}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.firstExit}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.secondEntry}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.secondExit}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.thirdEntry}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.thirdExit}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.overtime}</Paragraph>
      </Td>
    </Tr>
  )
}

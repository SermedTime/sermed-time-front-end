import { v4 } from 'uuid'

import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'

import { Col } from 'react-bootstrap'
import {
  convertDateToString,
  convertDateToWeekDay,
  convertIsoDateToTime
} from '@/utils/date'
import { IScheduleShift } from '@/hooks/services/Schedules/useSchedules'

interface Props {
  result: IScheduleShift[]
}

export function TableWorkTime({ result }: Props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>
            <Heading size="xs">Data</Heading>
          </Th>

          <Th>
            <Heading size="xs">Dia</Heading>
          </Th>

          <Th>
            <Heading size="xs">Turno</Heading>
          </Th>

          <Th>
            <Heading size="xs">Entrada</Heading>
          </Th>

          <Th>
            <Heading size="xs">Saída</Heading>
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {result ? (
          result.map(item => (
            <Tr key={v4()}>
              <Td>
                <Col xs="auto">
                  <Paragraph size="sm">
                    {convertDateToString(item.start)}
                  </Paragraph>
                </Col>
              </Td>

              <Td>
                <Paragraph size="sm">
                  {convertDateToWeekDay(item.start)}
                </Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">{item.shift_name}</Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">
                  {convertIsoDateToTime(item.start.toISOString())}
                </Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">
                  {convertIsoDateToTime(item.end.toISOString())}
                </Paragraph>
              </Td>
            </Tr>
          ))
        ) : (
          <LoadingLines lines={5} columns={5} />
        )}
      </Tbody>
    </Table>
  )
}

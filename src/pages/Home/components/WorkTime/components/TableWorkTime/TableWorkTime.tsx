import { v4 } from 'uuid'

import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'

import { Col } from 'react-bootstrap'
import { IWorkTime } from '../../WorkTime.interface'

interface Props {
  result: IWorkTime[] | null
}

export function TableWorkTime({ result }: Props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>
            <Heading size="xs">Dia</Heading>
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
        </Tr>
      </Thead>

      <Tbody>
        {result ? (
          result.map(item => (
            <Tr key={v4()}>
              <Td>
                <Col xs="auto">
                  <Paragraph size="sm">{item.day}</Paragraph>
                </Col>
              </Td>

              <Td>
                <Paragraph size="sm">{item.firstEntry}</Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">{item.firstExit}</Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">{item.secondEntry}</Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">{item.secondExit}</Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">{item.thirdEntry}</Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">{item.thirdExit}</Paragraph>
              </Td>
            </Tr>
          ))
        ) : (
          <LoadingLines lines={5} columns={7} />
        )}
      </Tbody>
    </Table>
  )
}

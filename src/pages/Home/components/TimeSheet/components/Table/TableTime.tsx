import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'

import { Col } from 'react-bootstrap'

import { ITimeSheet } from '../../TimeSheet.inteface'

interface Props {
  result: ITimeSheet[] | null
}

export function TableTime({ result }: Props) {
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

          <Th>
            <Heading size="xs">Extra</Heading>
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {result ? (
          result.map(item => (
            <Tr key={item.id}>
              <Td>
                <Col xs="auto">
                  <Paragraph size="sm">{item.date}</Paragraph>
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

              <Td>
                <Paragraph size="sm">{item.overtime}</Paragraph>
              </Td>
            </Tr>
          ))
        ) : (
          <LoadingLines lines={5} columns={8} />
        )}
      </Tbody>
    </Table>
  )
}

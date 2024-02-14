import { useExtraHour } from '@/hooks/services/Reports/useExtraHour'

import { convertDateToString } from '@/utils/date'

import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@/components/Core/Table'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Totals } from '@/components/Core/Table/Totals'
import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Col, Container, Row } from 'react-bootstrap'
import { Tooltip } from '@/components/Core/Tooltip'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

interface Props {
  params: {
    user_id: string
    initial_date: string
    final_date: string
  }
}

export function ExtraHour({ params }: Props) {
  const { user_id, initial_date, final_date } = params

  const { result } = useExtraHour({ user_id, initial_date, final_date })

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-start">
          <Tooltip title="Exportar Excel" place="top-start">
            <ButtonIcon
              size="sm"
              icon="border_all"
              onClick={() => console.log(`cliquei`)}
            />
          </Tooltip>

          <Tooltip title="Exportar PDF" place="top-start">
            <ButtonIcon
              size="sm"
              icon="picture_as_pdf"
              onClick={() => console.log(`cliquei`)}
            />
          </Tooltip>
        </Col>
      </Row>

      <Row>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Heading size="xs">Data</Heading>
              </Th>

              <Th>
                <Heading size="xs">Turno</Heading>
              </Th>

              <Th>
                <Heading size="xs">Aprovado por</Heading>
              </Th>

              <Th>
                <Heading size="xs">Data aprovação</Heading>
              </Th>

              <Th>
                <Heading size="xs">Horas</Heading>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {result ? (
              result.data.map((item, idx) => (
                <Tr key={idx}>
                  <Td>
                    <Paragraph size="sm">
                      {convertDateToString(item.date)}
                    </Paragraph>
                  </Td>

                  <Td>
                    <Paragraph size="sm">
                      <Paragraph size="sm">{item.shift_name}</Paragraph>
                    </Paragraph>
                  </Td>

                  <Td>
                    <Paragraph size="sm">
                      <Paragraph size="sm">{item.approved_by}</Paragraph>
                    </Paragraph>
                  </Td>

                  <Td>
                    <Paragraph size="sm">
                      {convertDateToString(item.approval_date)}
                    </Paragraph>
                  </Td>

                  <Td>
                    <Paragraph size="sm">
                      <Paragraph size="sm">{item.hours}</Paragraph>
                    </Paragraph>
                  </Td>
                </Tr>
              ))
            ) : (
              <LoadingLines lines={5} columns={5} />
            )}
          </Tbody>

          {result && (
            <Tfoot size="lg">
              <Tr>
                <Td colSpan={4}>
                  <Totals>
                    <Heading size="xs">Total</Heading>
                  </Totals>
                </Td>

                <Td colSpan={1}>
                  <Totals>
                    <Heading size="xs">{`${result.total} horas`}</Heading>
                  </Totals>
                </Td>
              </Tr>
            </Tfoot>
          )}
        </Table>
      </Row>
    </Container>
  )
}

import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@/components/Core/Table'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Totals } from '@/components/Core/Table/Totals'
import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { useAbsenses } from '@/hooks/services/Reports/useAbsenses'

interface Props {
  params: {
    user_id: string
    initial_date: string
    final_date: string
  }
}

export function Absenses({ params }: Props) {
  const { user_id, initial_date, final_date } = params

  const { result } = useAbsenses({ user_id, initial_date, final_date })

  return (
    <Table isLoading={result === null}>
      <Thead>
        <Tr>
          <Th>
            <Heading size="xs">Data</Heading>
          </Th>

          <Th>
            <Heading size="xs">Turno</Heading>
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {result ? (
          result.data.map((item, idx) => (
            <Tr key={idx}>
              <Td>
                <Paragraph size="sm">{item.date}</Paragraph>
              </Td>

              <Td>
                <Paragraph size="sm">{item.shift_name}</Paragraph>
              </Td>
            </Tr>
          ))
        ) : (
          <LoadingLines lines={5} columns={2} />
        )}
      </Tbody>

      {result && (
        <Tfoot size="lg">
          <Tr>
            <Td colSpan={2}>
              <Totals>
                <Heading size="xs">Total</Heading>
              </Totals>
            </Td>

            <Td colSpan={1}>
              <Totals>
                <Heading size="xs">{`${result.total} ${
                  result.total > 1 ? 'Faltas' : 'Falta'
                }`}</Heading>
              </Totals>
            </Td>
          </Tr>
        </Tfoot>
      )}
    </Table>
  )
}

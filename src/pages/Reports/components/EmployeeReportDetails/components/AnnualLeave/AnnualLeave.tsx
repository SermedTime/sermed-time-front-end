import { Table, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'

interface Props {
  params: {
    user_id: string
    initial_date: string
    final_date: string
  }
}

export function AnnualLeave({ params }: Props) {
  const { user_id, initial_date, final_date } = params

  return (
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
            <Heading size="xs">Horas</Heading>
          </Th>

          <Th>
            <Heading size="xs">Aprovado por</Heading>
          </Th>

          <Th>
            <Heading size="xs">Data aprovação</Heading>
          </Th>
        </Tr>
      </Thead>
    </Table>
  )
}

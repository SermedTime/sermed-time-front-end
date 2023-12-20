import { Tr, Td } from 'components/Core/Table'
import { EmptyResult } from 'components/Core/EmptyResult'

interface Props {
  columns: number
}

export function Empty({ columns }: Props) {
  return (
    <Tr>
      <Td colSpan={columns}>
        <EmptyResult />
      </Td>
    </Tr>
  )
}

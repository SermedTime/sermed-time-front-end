import { v4 } from 'uuid'

import { Tr, Td } from 'components/Core/Table'
import { Skeleton } from 'components/Core/Skeleton'

interface Props {
  lines: number
  columns: number
}

export function LoadingLines({ lines, columns }: Props) {
  return (
    <>
      {Array.from({ length: lines }).map(() => (
        <Tr key={v4()}>
          {Array.from({ length: columns }).map(() => (
            <Td key={v4()}>
              <Skeleton />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  )
}

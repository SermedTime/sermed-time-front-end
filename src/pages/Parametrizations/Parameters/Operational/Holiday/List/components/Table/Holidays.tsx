import { convertIsoDateToPtBr } from '@/utils/date'

import { Td, Tr } from '@/components/Core/Table'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Tooltip } from '@/components/Core/Tooltip'

import { IHolidays } from '@/hooks/services/Parameters/useHolidays'

interface Props {
  data: IHolidays
  onEdit: () => void
}

export function HolidaysTable({ data, onEdit }: Props) {
  return (
    <Tr>
      <Td>
        <Paragraph size="sm">{data.name}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToPtBr(data.date)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.state || 'Todos'}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.city || 'Todos'}</Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center">
          <Tooltip title="Detalhes" place="top">
            <ButtonIcon size="sm" icon="open_in_new" onClick={() => onEdit()} />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

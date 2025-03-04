import { Td, Tr } from '@/components/Core/Table'

import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Tooltip } from '@/components/Core/Tooltip'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { IPayslips } from '@/hooks/services/TimeSheet/usePayslips'

interface Props {
  data: IPayslips
}

export function TablePayslips({ data }: Props) {
  return (
    <Tr>
      <Td>
        <Paragraph size="sm">{data.month}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.year}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.type}</Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center">
          <Tooltip title="Visualizar" place="top-start">
            <ButtonIcon size="sm" icon="visibility" />
          </Tooltip>

          <Tooltip title="Download" place="top-start">
            <ButtonIcon size="sm" icon="file_download" />
          </Tooltip>

          <Tooltip title="Enviar por e-mail" place="top-start">
            <ButtonIcon size="sm" icon="send" />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

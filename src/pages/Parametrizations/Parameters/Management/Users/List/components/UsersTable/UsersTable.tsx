import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Td, Tr } from '@/components/Core/Table'
import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { convertIsoDateToPtBr } from '@/utils/date'

import { IUsers } from '@/hooks/services/Parameters/useUsers'
import { Tooltip } from '@/components/Core/Tooltip'

interface Props {
  data: IUsers
  onEdit: () => void
  onAddTeam: () => void
  onAddPermission: () => void
}

export function UsersTable({
  data,
  onEdit,
  onAddTeam,
  onAddPermission
}: Props) {
  return (
    <Tr>
      <Td>
        <Paragraph size="sm">{data.name}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToPtBr(data.created_at)}</Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center">
          <Tooltip title="Detalhes" place="top">
            <ButtonIcon size="sm" icon="open_in_new" onClick={() => onEdit()} />
          </Tooltip>

          <Tooltip title="Atribuir Equipe" place="top-start">
            <ButtonIcon
              disabled={data.resignation_date !== null}
              size="sm"
              icon="group_add"
              onClick={() => onAddTeam()}
            />
          </Tooltip>

          <Tooltip title="Atribuir Permissões" place="top-start">
            <ButtonIcon
              disabled={data.resignation_date !== null}
              size="sm"
              icon="admin_panel_settings"
              onClick={() => onAddPermission()}
            />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

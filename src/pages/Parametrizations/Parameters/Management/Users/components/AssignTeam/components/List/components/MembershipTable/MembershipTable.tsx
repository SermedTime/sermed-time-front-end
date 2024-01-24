import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useRefreshKeyContext } from '@/contexts/Refresh'
import { usePermissionContext } from '@/contexts/Permissions'

import { convertIsoDateToPtBr } from '@/utils/date'
import { put, del } from '@/services/api/sermed-api/sermed-api'

import { Tooltip } from '@/components/Core/Tooltip'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Td, Tr } from '@/components/Core/Table'

import { IMembership } from '@/hooks/services/Parameters/useMembership'

interface Props {
  data: IMembership
  onRefetch: () => void
}

export function MembershipTable({ data, onRefetch }: Props) {
  const { hasParametrizationsWriter } = usePermissionContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const { onRefresh } = useRefreshKeyContext()

  async function handleOnBecomeSupervisor(uuid: string) {
    try {
      showLoader()

      const { data } = await put(`/parametrizations/assign-teams/${uuid}`, {
        is_supervisor: 'active'
      })

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'O usuário agora é um supervisor desta equipe!'
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  async function handleOnUndoSupervisor(uuid: string) {
    try {
      showLoader()

      const { data } = await put(`/parametrizations/assign-teams/${uuid}`, {
        is_supervisor: 'inactive'
      })

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'O usuário não é mais supervisor desta equipe!'
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  async function handleOnDeleteTeam(uuid: string) {
    try {
      showLoader()

      const { data } = await del(`/parametrizations/assign-teams/${uuid}`)

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Equipe removida com sucesso!'
        })
      }

      onRefresh()
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    <Tr>
      <Td>
        <Paragraph size="sm">{data.team_name}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToPtBr(data.created_at)}</Paragraph>
      </Td>

      <Td>
        <div className="d-flex justify-content-center">
          <Tooltip
            title={
              data.is_supervisor === 'active'
                ? 'Revogar Supervisão'
                : 'Tornar Supervisor'
            }
            place="top"
          >
            <ButtonIcon
              appearance={`${
                data.is_supervisor === 'active' ? 'filled' : 'outlined'
              }`}
              size="sm"
              icon={`${
                data.is_supervisor === 'active' ? 'toggle_on' : 'toggle_off'
              }`}
              disabled={!hasParametrizationsWriter()}
              onClick={() => {
                data.is_supervisor === 'active'
                  ? handleOnUndoSupervisor(data.uuid)
                  : handleOnBecomeSupervisor(data.uuid)
              }}
            />
          </Tooltip>

          <Tooltip title="Remover Equipe" place="top">
            <ButtonIcon
              size="sm"
              icon="group_remove"
              disabled={!hasParametrizationsWriter()}
              onClick={() => handleOnDeleteTeam(data.uuid)}
            />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

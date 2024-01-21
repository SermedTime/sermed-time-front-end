import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { convertIsoDateToPtBr } from '@/utils/date'
import { put, del } from '@/services/api/sermed-api/sermed-api'

import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Td, Tr } from '@/components/Core/Table'

import { IMembership } from '@/hooks/services/Parameters/useMembership'
import { Tooltip } from '@/components/Core/Tooltip'

interface Props {
  data: IMembership
  onRefetch: () => void
}

export function MembershipTable({ data, onRefetch }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  async function handleOnBecomeSupervisor(uuid: string) {
    try {
      showLoader()

      const { data } = await put(`/parametrizations/users/team/${uuid}`, {
        isSupervisor: 'active'
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

      const { data } = await put(`/parametrizations/users/team/${uuid}`, {
        isSupervisor: 'inactive'
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

      const { data } = await del(`/parametrizations/users/team/${uuid}`)

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Equipe removida com sucesso!'
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    <Tr>
      <Td>
        <Paragraph size="sm">{data.team}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToPtBr(data.created_at)}</Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center">
          <Tooltip
            title={
              data.isSupervisor === 'active'
                ? 'Revogar Supervisão'
                : 'Tornar Supervisor'
            }
            place="top"
          >
            <ButtonIcon
              appearance={`${
                data.isSupervisor === 'active' ? 'filled' : 'outlined'
              }`}
              size="sm"
              icon={`${
                data.isSupervisor === 'active' ? 'toggle_on' : 'toggle_off'
              }`}
              onClick={() => {
                data.isSupervisor === 'active'
                  ? handleOnUndoSupervisor(data.uuid)
                  : handleOnBecomeSupervisor(data.uuid)
              }}
            />
          </Tooltip>

          <Tooltip title="Remover Equipe" place="top">
            <ButtonIcon
              size="sm"
              icon="group_remove"
              onClick={() => handleOnDeleteTeam(data.uuid)}
            />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

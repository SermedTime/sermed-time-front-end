import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useRefreshKeyContext } from '@/contexts/Refresh'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { convertIsoDateToPtBr } from '@/utils/date'
import { put, del } from '@/services/api/sermed-api/sermed-api'

import { Tooltip } from '@/components/Core/Tooltip'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Td, Tr } from '@/components/Core/Table'

import { IUserPermissions } from '@/hooks/services/Parameters/useUserPermissions'

interface Props {
  data: IUserPermissions
  onRefetch: () => void
}

export function PesmissionsTable({ data, onRefetch }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const { onRefresh } = useRefreshKeyContext()

  async function handleOnBecomeWriter(uuid: string) {
    try {
      showLoader()

      const { data } = await put(
        `/parametrizations/assign-permissions/${uuid}`,
        {
          is_writer: 'active'
        }
      )

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'O usuário agora tem permissão de escrita!'
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  async function handleOnUndoWriter(uuid: string) {
    try {
      showLoader()

      const { data } = await put(
        `/parametrizations/assign-permissions/${uuid}`,
        {
          is_writer: 'inactive'
        }
      )

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'O usuário não tem mais permissão de escrita!'
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  async function handleOnDeletePermission(uuid: string) {
    try {
      showLoader()

      const { data } = await del(`/parametrizations/assign-permissions/${uuid}`)

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Permissão removida!'
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
        <Paragraph size="sm">{data.permission_name}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToPtBr(data.created_at)}</Paragraph>
      </Td>

      <Td>
        <div className="d-flex justify-content-center">
          <Tooltip
            title={
              data.is_writer === 'active'
                ? 'Revogar permissão de escrita'
                : 'Incluir permissão de escrita'
            }
            place="top"
          >
            <ButtonIcon
              appearance={`${
                data.is_writer === 'active' ? 'filled' : 'outlined'
              }`}
              size="sm"
              icon={`${
                data.is_writer === 'active' ? 'toggle_on' : 'toggle_off'
              }`}
              disabled={!hasParametrizationsWriter()}
              onClick={() => {
                data.is_writer === 'active'
                  ? handleOnUndoWriter(data.uuid)
                  : handleOnBecomeWriter(data.uuid)
              }}
            />
          </Tooltip>

          <Tooltip title="Remover Equipe" place="top">
            <ButtonIcon
              size="sm"
              icon="group_remove"
              disabled={!hasParametrizationsWriter()}
              onClick={() => handleOnDeletePermission(data.uuid)}
            />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

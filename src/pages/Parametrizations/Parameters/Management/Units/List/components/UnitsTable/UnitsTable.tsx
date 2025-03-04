import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { convertIsoDateToPtBr } from '@/utils/date'

import { Col, Row } from 'react-bootstrap'
import { Td, Tr } from '@/components/Core/Table'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Tooltip } from '@/components/Core/Tooltip'

import { IUnit } from '@/hooks/services/Parameters/useUnits'
import { put } from '@/services/api/sermed-api/sermed-api'

interface Props {
  data: IUnit
  onEdit: () => void
  onListMembers: () => void
  onListTeams: () => void
  onRefetch: () => void
}

export function UnitsTable({
  data,
  onEdit,
  onListMembers,
  onListTeams,
  onRefetch
}: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  async function handleOnActivate(uuid: string) {
    try {
      showLoader()

      const { data } = await put(`/parametrizations/units/${uuid}`, {
        status: 'active'
      })

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Unidade ativada com sucesso!'
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  async function handleOnInactivate(uuid: string) {
    try {
      showLoader()

      const { data } = await put(`/parametrizations/units/${uuid}`, {
        status: 'inactive'
      })

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Unidade inativada com sucesso!'
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
        <Row className="justify-content-center">
          <Col xs="auto">
            <ButtonIcon
              appearance={`${data.status === 'active' ? 'filled' : 'outlined'}`}
              size="md"
              icon={`${data.status === 'active' ? 'toggle_on' : 'toggle_off'}`}
              disabled={!hasParametrizationsWriter()}
              onClick={() => {
                data.status === 'active'
                  ? handleOnInactivate(data.uuid)
                  : handleOnActivate(data.uuid)
              }}
            />
          </Col>
        </Row>
      </Td>

      <Td>
        <Paragraph size="sm">{data.unitName}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToPtBr(data.createdAt)}</Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center">
          <Tooltip title="Detalhes" place="top">
            <ButtonIcon size="sm" icon="open_in_new" onClick={() => onEdit()} />
          </Tooltip>
          <Tooltip title="Equipes" place="top">
            <ButtonIcon
              size="sm"
              icon="diversity_2"
              onClick={() => onListTeams()}
            />
          </Tooltip>
          <Tooltip title="Funcionários" place="top">
            <ButtonIcon
              size="sm"
              icon="groups_2"
              onClick={() => onListMembers()}
            />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { convertIsoDateToPtBr } from '@/utils/date'
import { get, put } from '@/services/api/sermed-api/sermed-api'

import { Col, Row } from 'react-bootstrap'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Td, Tr } from '@/components/Core/Table'
import { Tooltip } from '@/components/Core/Tooltip'
import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { ITimeClock } from '@/hooks/services/Parameters/useTimeClock'

interface Props {
  data: ITimeClock
  onEdit: () => void
  onRefetch: () => void
}

export function TimeClock({ data, onEdit, onRefetch }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  async function handleOnActivate(uuid: string) {
    try {
      showLoader()

      const { data } = await put(`parametrizations/time-clock/${uuid}`, {
        status: 'active'
      })

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Relógio de Ponto ativado com sucesso!'
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

      const { data } = await put(`parametrizations/time-clock/${uuid}`, {
        status: 'inactive'
      })

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Relógio de Ponto inativado com sucesso!'
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  async function handleOnUpdateTimeClock(uuid: string) {
    try {
      showLoader()

      const { data } = await get(
        `parametrizations/time-clock/update-time-sheet/${uuid}`
      )

      if (data) {
        onRefetch()

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Dados atualizados com sucesso!'
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
        <Paragraph size="sm">{data.name}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToPtBr(data.created_at)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">
          {convertIsoDateToPtBr(data.lastUpdate, true)}
        </Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center align-items-center">
          <Tooltip title="Detalhes" place="top">
            <ButtonIcon size="sm" icon="open_in_new" onClick={() => onEdit()} />
          </Tooltip>

          <Tooltip title="Atualizar" place="top">
            <ButtonIcon
              size="sm"
              icon="autorenew"
              onClick={() => handleOnUpdateTimeClock(data.uuid)}
            />
          </Tooltip>

          <Tooltip title="Upload Folha" place="top">
            <ButtonIcon size="sm" icon="upload_file" onClick={() => onEdit()} />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

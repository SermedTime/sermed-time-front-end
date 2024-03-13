import { useState } from 'react'

import { Col } from 'react-bootstrap'

import { Td, Tr } from '@/components/Core/Table'

import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Tooltip } from '@/components/Core/Tooltip'
import { convertIsoDateToPtBr, convertIsoDateToTime } from '@/utils/date'

interface Props {
  data: ITimeSheet
  onApprove: () => void
}

export function TableTimeSheet({ data, onApprove }: Props) {
  const [edit, setEdit] = useState(false)

  return (
    <Tr>
      <Td>
        <Col xs="auto">
          <Paragraph size="sm">{`${convertIsoDateToPtBr(data.date)} - ${
            data.day
          }`}</Paragraph>
        </Col>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.firstEntry)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.firstExit)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">
          {convertIsoDateToTime(data.secondEntry)}
        </Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.secondExit)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.thirdEntry)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.thirdExit)}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{convertIsoDateToTime(data.overtime)}</Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center">
          {edit ? (
            <Tooltip title="Salvar" place="top-start">
              <ButtonIcon
                size="sm"
                icon="save"
                onClick={() => setEdit(false)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Editar Ponto" place="top-start">
              <ButtonIcon size="sm" icon="edit" onClick={() => setEdit(true)} />
            </Tooltip>
          )}
          <Tooltip title="Aprovar Horas" place="top-start">
            <ButtonIcon size="sm" icon="alarm_on" onClick={() => onApprove()} />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

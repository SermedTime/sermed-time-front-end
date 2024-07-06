import { Col } from 'react-bootstrap'

import { Td, Tr } from '@/components/Core/Table'

import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Tooltip } from '@/components/Core/Tooltip'
import {
  convertDataUTCToGMTMore3,
  convertIsoDateToPtBr,
  convertIsoDateToTime
} from '@/utils/date'

interface Props {
  data: ITimeSheet
  onEdit: () => void
  onApprove: () => void
  onReprove: () => void
}

export function TableTimeSheet({ data, onEdit, onApprove, onReprove }: Props) {
  return (
    <Tr>
      <Td>
        <Col xs="auto">
          <Paragraph size="sm">{` ${data.day}, ${convertIsoDateToPtBr(
            convertDataUTCToGMTMore3(data.date)
          )}`}</Paragraph>
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
        <Paragraph
          size="sm"
          color={data.overtime?.includes('-') ? 'warning' : 'success'}
        >
          {data.overtime}
        </Paragraph>
      </Td>

      <Td showOnHover={true}>
        <div className="d-flex justify-content-center">
          <Tooltip title="Detalhes" place="top-start">
            <ButtonIcon size="sm" icon="open_in_new" onClick={() => onEdit()} />
          </Tooltip>

          {data.overtime && !data.overtime.includes('-') && (
            <>
              <Tooltip title="Aprovar Horas" place="top-start">
                <ButtonIcon
                  size="sm"
                  icon="alarm_on"
                  onClick={() => onApprove()}
                />
              </Tooltip>

              <Tooltip title="Reprovar Horas" place="top-start">
                <ButtonIcon
                  size="sm"
                  icon="alarm_off"
                  onClick={() => onReprove()}
                />
              </Tooltip>
            </>
          )}
        </div>
      </Td>
    </Tr>
  )
}

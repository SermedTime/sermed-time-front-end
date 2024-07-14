import { useEditTimeSheetHelper } from '@/pages/TimeSheet/UserTimeSheet/Overview/components/TimeSheetView/components/Edit/useEditTimeSheetHelper'

import { isMissed } from '@/utils/validations'
import { convertIsoDateToPtBr, convertIsoDateToTime } from '@/utils/date'

import { Col } from 'react-bootstrap'
import { Tag } from '@/components/Core/Tag'
import { Td, Tr } from '@/components/Core/Table'
import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'

interface Props {
  data: ITimeSheet
}

export function TableTime({ data }: Props) {
  const { typeOvertime } = useEditTimeSheetHelper()

  return (
    <Tr>
      <Td>
        <Col xs="auto">
          <Paragraph size="sm">
            {`${data.day}, ${convertIsoDateToPtBr(data.date, false, false)}`}
          </Paragraph>
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

      <Td className="d-flex justify-content-center my-2">
        {isMissed(data.firstEntry, data.overtime) ? (
          <Tag size="lg" highlight>
            Falta
          </Tag>
        ) : (
          <Tag size="lg" status={typeOvertime(data.overtime)}>{`${
            data.overtime || '00:00'
          }`}</Tag>
        )}
      </Td>
    </Tr>
  )
}

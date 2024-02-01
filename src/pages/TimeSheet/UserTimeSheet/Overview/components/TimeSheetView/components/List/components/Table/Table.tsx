import { useState } from 'react'

import { Col } from 'react-bootstrap'

import { Td, Tr } from '@/components/Core/Table'

import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Tooltip } from '@/components/Core/Tooltip'

interface Props {
  data: ITimeSheet
  onRefetch: () => void
}

export function TableTimeSheet({ data, onRefetch }: Props) {
  const [edit, setEdit] = useState(false)

  return (
    <Tr>
      <Td>
        <Col xs="auto">
          <Paragraph size="sm">{data.date}</Paragraph>
        </Col>
      </Td>

      <Td>
        <Paragraph size="sm">{data.firstEntry}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.firstExit}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.secondEntry}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.secondExit}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.thirdEntry}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.thirdExit}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.overtime}</Paragraph>
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
            <ButtonIcon size="sm" icon="alarm_on" onClick={onRefetch} />
          </Tooltip>
        </div>
      </Td>
    </Tr>
  )
}

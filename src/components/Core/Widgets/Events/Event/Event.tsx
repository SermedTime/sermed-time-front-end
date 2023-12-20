import { format } from 'date-fns'

import { Caption } from 'components/Core/Typography/Caption'
import { Heading } from 'components/Core/Typography/Heading'

import { IEvent } from './Event.interface'
import { Container, Identifier } from './Event.styles'

interface Props {
  data: IEvent
  onClick?: (uuid: string) => void
}

export function Event({ data, onClick }: Props) {
  return (
    <Container onClick={() => onClick && onClick(data.uuid)}>
      <Identifier type={data.type} />

      <div>
        <Heading size="xs">{data.title}</Heading>

        <Caption size="lg" className="mt-1">
          {data.allDay
            ? 'O dia inteiro'
            : `${format(data.start, 'HH:mm')} - ${format(data.end, 'HH:mm')}`}
        </Caption>
      </div>
    </Container>
  )
}

Event.defaultProps = {
  onClick: undefined
}

import { Paragraph } from 'components/Core/Typography/Paragraph'

import { IEvent } from '../Event/Event.interface'

import { Container, Stack, Identifier } from './ShowMore.styles'

interface Props {
  events: IEvent[]
  onClick: () => void
}

export function ShowMore({ events, onClick }: Props) {
  const minimizedEvents = events.slice(1, 3)

  return (
    <Container type="button" onClick={onClick}>
      <Stack>
        {minimizedEvents.map((event, idx) => (
          <Identifier key={idx} type={event.type} />
        ))}
      </Stack>

      <Paragraph size="sm">+{events.length - 1} eventos</Paragraph>
    </Container>
  )
}

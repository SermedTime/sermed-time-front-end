import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { IScheduleShift } from '../Schedule/Schedule.interface'

import { Container, Stack, Identifier } from './ShowMore.styles'

interface Props {
  events: IScheduleShift[]
  onClick: () => void
}

export function ShowMore({ events, onClick }: Props) {
  const minimizedEvents = events.slice(1, 3)

  return (
    <Container type="button" onClick={onClick}>
      <Stack>
        {minimizedEvents.map((event, idx) => (
          <Identifier key={idx} type={event.shift} />
        ))}
      </Stack>

      <Paragraph size="sm">+{events.length - 1} eventos</Paragraph>
    </Container>
  )
}

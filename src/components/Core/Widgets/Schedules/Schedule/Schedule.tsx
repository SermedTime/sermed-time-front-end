import { Heading } from '@/components/Core/Typography/Heading'
import { Caption } from '@/components/Core/Typography/Caption'
import { IScheduleShift } from './Schedule.interface'
import { Container, Identifier } from './Schedule.styles'

interface Props {
  data: IScheduleShift
  onClick?: (uuid: string) => void
}

export function Schedule({ data, onClick }: Props) {
  return (
    <Container onClick={() => onClick && onClick(data.schedule_id)}>
      <Identifier shift_initials={data.shift_initials} />

      <div>
        <Heading size="xxs">{data.user_name}</Heading>

        <Caption size="lg" className="mt-1">
          {data.shift_name}
        </Caption>
      </div>
    </Container>
  )
}

Schedule.defaultProps = {
  onClick: undefined
}

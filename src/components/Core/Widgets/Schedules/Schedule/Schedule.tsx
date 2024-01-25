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
    <Container onClick={() => onClick && onClick(data.id)}>
      <Identifier type={data.shift} />

      <div>
        <Heading size="xs">{data.user_name}</Heading>

        <Caption size="lg" className="mt-1">
          {data.shift}
        </Caption>
      </div>
    </Container>
  )
}

Schedule.defaultProps = {
  onClick: undefined
}

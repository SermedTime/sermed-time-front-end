import { Container, Progress } from './ProgressBar.styles'

interface Props {
  now: number
}

export function ProgressBar({ now }: Props) {
  return (
    <Container>
      <Progress now={now} />
    </Container>
  )
}

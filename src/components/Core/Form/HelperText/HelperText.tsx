import { Container } from './HelperText.styles'

interface Props {
  className?: string
  text: string
}

export function HelperText({ className, text }: Props) {
  return <Container className={className}>{text}</Container>
}

HelperText.defaultProps = {
  className: undefined
}

import { Button } from './SubmitButton.styles'

interface Props {
  text: string
  disabled?: boolean
}

export function SubmitButton({ text, disabled }: Props) {
  return (
    <Button type="submit" disabled={disabled}>
      {text}
    </Button>
  )
}

SubmitButton.defaultProps = {
  disabled: undefined
}

import { Icon } from 'components/Core/Icons/Icon'

import { Button } from './FloatButton.styles'

interface Props {
  styles: 'primary' | 'secondary'
  icon: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function FloatButton({ styles, icon, onClick }: Props) {
  return (
    <Button type="button" styles={styles} onClick={onClick}>
      <Icon size="lg" icon={icon} />
    </Button>
  )
}

FloatButton.defaultProps = {
  onClick: undefined
}

import { Wrapper, Button } from './ButtonIcon.styles'
import { Icon } from '../../Icons/Icon'
import { IconAppearence } from '../../Icons/Icon/Icon.interface'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  appearance?: IconAppearence
  size: 'sm' | 'md' | 'lg'
  icon: string
  disabled?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function ButtonIcon({
  type,
  appearance,
  size,
  icon,
  disabled,
  className,
  onClick
}: Props) {
  return (
    <Wrapper size={size}>
      <Button type={type || 'button'} disabled={disabled} onClick={onClick}>
        <Icon
          appearance={appearance}
          size={size}
          icon={icon}
          className={className}
        />
      </Button>
    </Wrapper>
  )
}

ButtonIcon.defaultProps = {
  type: undefined,
  appearance: undefined,
  disabled: undefined,
  className: undefined,
  onClick: undefined
}

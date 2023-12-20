import { IconAppearence } from 'components/Core/Icons/Icon/Icon.interface'

import { Wrapper, Container } from './Button.styles'
import { Icon } from '../../Icons/Icon'

interface Props extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  styles: 'primary' | 'secondary' | 'tertiary'
  mode?: 'success' | 'helper' | 'warning'
  display?: 'block'
  appearance?: IconAppearence
  icon?: string
  disabled?: boolean
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function Button({
  type,
  styles,
  mode,
  appearance,
  icon,
  display,
  disabled,
  children,
  className,
  onClick
}: Props) {
  return (
    <Wrapper styles={styles} mode={mode} display={display}>
      <Container
        type={type || 'button'}
        styles={styles}
        mode={mode}
        display={display}
        disabled={disabled}
        className={className}
        onClick={onClick}
      >
        {icon && <Icon appearance={appearance} icon={icon} />}

        <div>{children}</div>
      </Container>
    </Wrapper>
  )
}

Button.defaultProps = {
  type: undefined,
  mode: undefined,
  display: undefined,
  appearance: undefined,
  icon: undefined,
  disabled: undefined,
  onClick: undefined
}

import { useNavigate } from 'react-router-dom'

import { Button, LinkButton } from './ButtonLink.styles'
import { Icon } from '../../Icons/Icon'

interface Props {
  size?: 'sm' | 'md'
  route?: string
  children: string
  disabled?: boolean
  icon?: string
  externalLink?: boolean
  onClick?: () => void
}

export function ButtonLink({
  size,
  route,
  children,
  disabled,
  icon,
  onClick,
  externalLink = false
}: Props) {
  const navigate = useNavigate()

  function handleOnClick() {
    route && navigate(route)

    onClick && onClick()
  }

  return !externalLink ? (
    <Button
      type="button"
      size={size}
      disabled={disabled}
      icon={icon}
      onClick={() => handleOnClick()}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </Button>
  ) : (
    <LinkButton href={route} className="LinkButton" target="blank" size={size}>
      {children}
    </LinkButton>
  )
}

ButtonLink.defaultProps = {
  size: undefined,
  route: undefined,
  disabled: undefined,
  icon: undefined,
  onClick: undefined,
  externalLink: undefined
}

import { ButtonIcon } from '../../Buttons/ButtonIcon'
import { Icon } from '../../Icons/Icon'
import { Caption } from '../../Typography/Caption'
import { Heading } from '../../Typography/Heading'
import { Section } from '../Section'
import { IWidget } from './Widget.interface'

export function Widget({
  icon,
  iconAppearence,
  heading,
  caption,
  actionIcon,
  actionDisabled,
  onClick,
  children
}: IWidget) {
  return (
    <Section size="sm">
      <div className="d-flex justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center gap-1">
          <Icon appearance={iconAppearence} icon={icon} size="lg" />

          <div>
            <Heading size="xs" className="mt-1">
              {heading}
            </Heading>

            {caption && <Caption size="lg">{caption}</Caption>}
          </div>
        </div>

        {actionIcon && (
          <ButtonIcon
            size="sm"
            icon={actionIcon}
            disabled={actionDisabled}
            onClick={onClick}
          />
        )}
      </div>

      {children}
    </Section>
  )
}

Widget.defaultProps = {
  iconAppearence: undefined,
  caption: undefined,
  actionIcon: undefined,
  actionDisabled: undefined,
  onClick: undefined
}

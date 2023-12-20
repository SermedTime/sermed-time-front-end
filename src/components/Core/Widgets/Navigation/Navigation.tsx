import { useNavigate, useLocation } from 'react-router-dom'

import { Widget } from 'components/Core/Containers/Widget'
import { IconShape } from 'components/Core/Icons/IconShape'
import { Icon } from 'components/Core/Icons/Icon'

import { INavigation } from './Navigation.interface'
import { Item, Label } from './Navigation.styles'

interface Props {
  heading: string
  caption: string
  nav: INavigation[]
}

export function WidgetNavigation({ heading, caption, nav }: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Widget
      icon="library_books"
      iconAppearence="outlined"
      heading={heading}
      caption={caption}
    >
      <div className="pt-3">
        {nav.map((item, idx) => (
          <Item
            key={idx}
            active={item.route === location.pathname}
            onClick={() => navigate(item.route)}
          >
            <IconShape>
              <Icon size="sm" appearance={item.appearance} icon={item.icon} />
            </IconShape>

            <Label>{item.label}</Label>
          </Item>
        ))}
      </div>
    </Widget>
  )
}

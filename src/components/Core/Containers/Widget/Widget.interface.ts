import { ReactNode } from 'react'

import { IconAppearence } from 'components/Core/Icons/Icon/Icon.interface'

export interface IWidget {
  icon: string
  iconAppearence?: IconAppearence
  heading: string
  caption?: string
  actionIcon?: string
  actionDisabled?: boolean
  onClick?: () => void
  children: ReactNode
}

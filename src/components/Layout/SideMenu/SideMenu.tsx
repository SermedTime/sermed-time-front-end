import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useSideMenuContext } from '@/contexts/Layout/SideMenu'

import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { Icon } from '@/components/Core/Icons/Icon'
import * as S from './SideMenu.styles'
import { useSideMenuNavigation } from './SideMenu.navigation'

export function SideMenu() {
  const location = useLocation()

  const { nav } = useSideMenuNavigation()

  const { visible } = useSideMenuContext()

  const { checkIfUserHasRole } = useAuthRoles()

  const [hover, setHover] = useState(false)

  if (!visible) return null

  return (
    <S.Container
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <S.Brand className={`${hover && 'open'}`} />

      <S.List className={`${hover && 'open'}`}>
        {nav.map((item, idx) => {
          if (item.allowedRoles) {
            const hasPermission = item.allowedRoles.some((role: string) =>
              checkIfUserHasRole({ role, is_writer: false })
            )

            if (!hasPermission) return null
          }

          if (item.route) {
            return (
              <S.Item
                key={idx}
                active={location.pathname.indexOf(item.route) >= 0}
              >
                <Link to={item.route}>
                  <Icon
                    appearance={
                      location.pathname === item.route ? undefined : 'outlined'
                    }
                    icon={item.icon}
                  />

                  <span>{item.label}</span>
                </Link>
              </S.Item>
            )
          }

          return (
            <S.Item key={idx}>
              <div>
                <div>
                  <Icon appearance="outlined" icon={item.icon} />

                  <span>{item.label}</span>
                </div>

                <S.SubList>
                  {item.list?.map((subitem, subidx) => (
                    <S.SubItem key={subidx}>
                      <Link to={subitem.route}>
                        <span>{subitem.label}</span>
                      </Link>
                    </S.SubItem>
                  ))}
                </S.SubList>
              </div>
            </S.Item>
          )
        })}
      </S.List>
    </S.Container>
  )
}

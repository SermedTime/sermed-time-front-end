import { ReactNode } from 'react'

import { ToastContext } from './Toast'
import { LoaderContext } from './Loader'
import { AuthContext } from './Auth'
import { HeaderContext } from './Layout/Header'
import { BreadcrumbContext } from './Layout/Breadcrumb'
import { FooterContext } from './Layout/Footer'
import { ModalContext } from './Layout/Modal'
import { SideMenuContext } from './Layout/SideMenu'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <LoaderContext>
      <AuthContext>
        <ModalContext>
          <HeaderContext>
            <BreadcrumbContext>
              <SideMenuContext>
                <FooterContext>
                  <ToastContext>{children}</ToastContext>
                </FooterContext>
              </SideMenuContext>
            </BreadcrumbContext>
          </HeaderContext>
        </ModalContext>
      </AuthContext>
    </LoaderContext>
  )
}

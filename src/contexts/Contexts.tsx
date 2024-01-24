import { ReactNode } from 'react'

import { ToastContext } from './Toast'
import { LoaderContext } from './Loader'
import { AuthContext } from './Auth'
import { HeaderContext } from './Layout/Header'
import { BreadcrumbContext } from './Layout/Breadcrumb'
import { FooterContext } from './Layout/Footer'
import { ModalContext } from './Layout/Modal'
import { SideMenuContext } from './Layout/SideMenu'
import { AlertContext } from './Alert'
import { NotificationContext } from './Notification'
import { RefreshKeyContext } from './Refresh'
import { PermissionsContext } from './Permissions'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <RefreshKeyContext>
      <LoaderContext>
        <AuthContext>
          <PermissionsContext>
            <ModalContext>
              <HeaderContext>
                <BreadcrumbContext>
                  <SideMenuContext>
                    <FooterContext>
                      <ToastContext>
                        <AlertContext>
                          <NotificationContext>{children}</NotificationContext>
                        </AlertContext>
                      </ToastContext>
                    </FooterContext>
                  </SideMenuContext>
                </BreadcrumbContext>
              </HeaderContext>
            </ModalContext>
          </PermissionsContext>
        </AuthContext>
      </LoaderContext>
    </RefreshKeyContext>
  )
}

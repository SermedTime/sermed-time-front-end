import { ReactNode } from 'react'
import { ToastContext } from './Toast'
import { LoaderContext } from './Loader'
import { AuthContext } from './Auth'
import { HeaderContext } from './Layout/Header'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <LoaderContext>
      <AuthContext>
        <HeaderContext>
          <ToastContext>{children}</ToastContext>
        </HeaderContext>
      </AuthContext>
    </LoaderContext>
  )
}

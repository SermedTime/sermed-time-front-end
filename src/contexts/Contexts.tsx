import { ReactNode } from 'react'
import { ToastContext } from './Toast'
import { LoaderContext } from './Loader'
import { AuthContext } from './Auth'

interface Props {
  children: ReactNode
}

export function Contexts({ children }: Props) {
  return (
    <LoaderContext>
      <AuthContext>
        <ToastContext>{children}</ToastContext>
      </AuthContext>
    </LoaderContext>
  )
}

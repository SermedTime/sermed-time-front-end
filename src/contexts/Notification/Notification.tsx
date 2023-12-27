import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import { v4 } from 'uuid'

import { Notification } from '@/components/Core/Notification'
import { INotificationMessage } from './Notification.interface'

interface NotificationContextData {
  messages: INotificationMessage[]
  addNotification: (message: Omit<INotificationMessage, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const Context = createContext<NotificationContextData>(
  {} as NotificationContextData
)

interface Props {
  children: ReactNode
}

function NotificationContext({ children }: Props) {
  const [messages, setMessages] = useState<INotificationMessage[]>([])

  const addNotification = useCallback(
    async (message: Omit<INotificationMessage, 'id'>) => {
      window.scrollTo({ top: 0 })

      const notification = {
        id: v4(),
        title: message.title,
        description: message.description,
        cancelTxt: message.cancelTxt,
        confirmTxt: message.confirmTxt,
        onCancel: message.onCancel,
        onConfirm: message.onConfirm
      }

      setMessages(state => [...state, notification])
    },
    []
  )

  const removeNotification = useCallback((id: string) => {
    setMessages(state => state.filter(s => s.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setMessages([])
  }, [])

  const providerValue = useMemo(
    () => ({
      messages,
      addNotification,
      removeNotification,
      clearNotifications
    }),
    [messages, addNotification, removeNotification, clearNotifications]
  )

  return (
    <Context.Provider value={providerValue}>
      <Notification messages={messages} />

      {children}
    </Context.Provider>
  )
}

function useNotificationContext(): NotificationContextData {
  return useContext(Context)
}

export { NotificationContext, useNotificationContext }

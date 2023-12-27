export interface INotificationMessage {
  id: string
  title: string
  description: string
  cancelTxt: string
  confirmTxt: string
  onCancel?: () => void
  onConfirm?: () => void
}

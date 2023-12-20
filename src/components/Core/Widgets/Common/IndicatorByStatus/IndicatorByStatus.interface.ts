export interface IIndicatorByStatus {
  status: 'success' | 'helper' | 'warning' | 'neutral'
  description: string
  amount: number
  suffix?: string
}

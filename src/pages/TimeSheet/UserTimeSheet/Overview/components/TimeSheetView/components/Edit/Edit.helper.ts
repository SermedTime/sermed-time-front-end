export function statusOvertime(
  overtime: string | null
): 'neutral' | 'warning' | 'success' {
  if (!overtime) return 'neutral'

  let status: 'neutral' | 'warning' | 'success'

  switch (true) {
    case overtime.includes('-'):
      status = 'warning'
      break
    case overtime !== '00:00':
      status = 'success'
      break
    default:
      status = 'neutral'
      break
  }

  return status
}

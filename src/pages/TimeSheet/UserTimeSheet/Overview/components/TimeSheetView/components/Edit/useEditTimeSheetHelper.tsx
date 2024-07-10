import { Tag } from '@/components/Core/Tag'

export function useEditTimeSheetHelper() {
  function typeOvertime(
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

  function statusOvertime(status: string | null): JSX.Element {
    if (!status) {
      return <Tag size="sm">Aguardando validação</Tag>
    }

    return (
      <Tag size="sm" highlight={status === 'R'} status="success">
        {status === 'R' ? 'Reprovado' : 'Aprovado'}
      </Tag>
    )
  }

  return { typeOvertime, statusOvertime }
}

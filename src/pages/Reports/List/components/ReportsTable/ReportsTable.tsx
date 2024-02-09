import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Td, Tr } from '@/components/Core/Table'
import { Tooltip } from '@/components/Core/Tooltip'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { ISummaryReports } from '@/hooks/services/Reports/useSummaryReports'

interface Props {
  groupByTeam: boolean
  data: ISummaryReports
  onOpenDetails?: () => void
}

export function ReportsTable({ groupByTeam, data, onOpenDetails }: Props) {
  return (
    <Tr>
      <Td>
        <Paragraph size="sm">
          {!groupByTeam ? data.employee_name : data.team_name}
        </Paragraph>
      </Td>

      {!groupByTeam && (
        <Td>
          <Paragraph size="sm">{data.team_name}</Paragraph>
        </Td>
      )}

      <Td>
        <Paragraph size="sm">{data.absence}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.extra_hour}</Paragraph>
      </Td>

      <Td>
        <Paragraph size="sm">{data.annual_leave}</Paragraph>
      </Td>

      {!groupByTeam && (
        <Td showOnHover={true}>
          <div className="d-flex justify-content-center">
            <Tooltip title="Detalhes" place="top">
              <ButtonIcon
                size="sm"
                icon="open_in_new"
                onClick={() => onOpenDetails && onOpenDetails()}
              />
            </Tooltip>
          </div>
        </Td>
      )}
    </Tr>
  )
}

ReportsTable.defaultProps = {
  onOpenDetails: undefined
}

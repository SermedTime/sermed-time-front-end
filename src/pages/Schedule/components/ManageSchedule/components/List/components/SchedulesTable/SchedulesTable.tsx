import { useState } from 'react'

import { useLoaderContext } from '@/contexts/Loader'
import { useRefreshKeyContext } from '@/contexts/Refresh'
import { useToastContext } from '@/contexts/Toast'

import { del, put } from '@/services/api/sermed-api/sermed-api'
import { convertIsoDateToTime } from '@/utils/date'

import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Td, Tr } from '@/components/Core/Table'
import { Tooltip } from '@/components/Core/Tooltip'
import { Paragraph } from '@/components/Core/Typography/Paragraph'

import { IScheduleShift } from '@/hooks/services/Schedules/useSchedules'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

interface Props {
  data: IScheduleShift[]
  shifts: IOption[] | null
}

export function SchedulesTable({ data, shifts }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()
  const [edit, setEdit] = useState<string>('')
  const [shiftId, setShiftId] = useState<string | number>()

  const { onRefresh } = useRefreshKeyContext()

  async function handleOnUpdateSchedule(schedule_id: string, shift_id: string) {
    try {
      showLoader()

      const { data } = await put(`/schedule/update/${schedule_id}`, {
        shift_id
      })

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Escala alterada com sucesso!'
        })
      }

      onRefresh()
    } catch {
      handleApiRejection()
    } finally {
      setShiftId('')
      setEdit('')
      hideLoader()
    }
  }

  async function handleOnDeleteSchedule(schedule_id: string) {
    try {
      showLoader()

      const { data } = await del(`/schedule/delete/${schedule_id}`)

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Escala removida!'
        })
      }

      onRefresh()
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    <>
      {data.map(item => (
        <Tr>
          <Td>
            <Paragraph size="sm">{item.user_name}</Paragraph>
          </Td>

          <Td>
            {edit !== item.schedule_id ? (
              <Paragraph size="sm">
                {item.shift_name} -{' '}
                {convertIsoDateToTime(item.start?.toISOString())} -{' '}
                {convertIsoDateToTime(item.end?.toISOString())}
              </Paragraph>
            ) : (
              <Select
                initialValue={item.shift_id}
                placeholder="Selecione um turno"
                options={shifts}
                onChange={(e: IOption) => {
                  setShiftId(e.value)
                }}
              />
            )}
          </Td>

          <Td>
            <div className="d-flex justify-content-center">
              {edit !== item.schedule_id ? (
                <Tooltip title="Editar" place="top">
                  <ButtonIcon
                    size="sm"
                    icon="edit"
                    onClick={() => setEdit(item.schedule_id)}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Gravar" place="top">
                  <ButtonIcon
                    size="sm"
                    icon="save"
                    onClick={() =>
                      handleOnUpdateSchedule(
                        item.schedule_id,
                        shiftId as string
                      )
                    }
                  />
                </Tooltip>
              )}

              <Tooltip title="Remover Equipe" place="top">
                <ButtonIcon
                  size="sm"
                  icon="delete"
                  // disabled={!hasParametrizationsWriter()}
                  onClick={() => handleOnDeleteSchedule(item.schedule_id)}
                />
              </Tooltip>
            </div>
          </Td>
        </Tr>
      ))}
    </>
  )
}

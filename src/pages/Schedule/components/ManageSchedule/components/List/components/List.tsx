import { Section } from '@/components/Core/Containers/Section'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { Empty } from '@/components/Core/Table/Empty'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Heading } from '@/components/Core/Typography/Heading'
import { useToastContext } from '@/contexts/Toast'
import { IScheduleShift } from '@/hooks/services/Schedules/useSchedules'
import { get } from '@/services/api/sermed-api/sermed-api'
import { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

interface Props {
  team_id: string
  date: Date | undefined
}

export function ListDaySchedules({ team_id, date }: Props) {
  const { addToast, handleApiRejection } = useToastContext()
  const { initialValues, setInitialValues } = useState<IScheduleShift[] | null>(
    null
  )

  const fetchData = useCallback(
    async (team_id: string, date: Date) => {
      try {
        const params = {
          team_id,
          date
        }

        const { data } = await get(`/schedule/list`, params)

        const values = data.map((item: IScheduleShift) => ({
          uuid: item.schedule_id,
          user_name: item.user_name,
          shift_name: item.shift_name
        }))

        setInitialValues(values)
      } catch {
        setInitialValues([])
        handleApiRejection()
      }
    },
    [handleApiRejection, setInitialValues]
  )

  useEffect(() => {
    if (initialValues === null && team_id && date) {
      fetchData(team_id, date)
    }
  }, [initialValues, team_id, date, fetchData])

  return (
    <Container>
      <Row>
        <Col>
          <Section>
            <Row>
              <Col>
                <Table
                  isLoading={initialValues === null}
                  hover={!!initialValues?.length}
                >
                  <Thead>
                    <Tr>
                      <Th>
                        <div style={{ width: '14rem' }}>
                          <Heading size="xs">Funcionário</Heading>
                        </div>
                      </Th>

                      <Th>
                        <Heading size="xs">Turno</Heading>
                      </Th>

                      <Th>
                        <div style={{ height: '2.5rem', width: '2.5rem' }} />
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {initialValues ? (
                      initialValues.length > 0 ? (
                        initialValues.map((item: IScheduleShift) => (
                          // <PesmissionsTable
                          //   key={item.uuid}
                          //   data={item}
                          //   onRefetch={() => refetch()}
                          // />
                          <h1>{item.user_name}</h1>
                        ))
                      ) : (
                        <Empty columns={3} />
                      )
                    ) : (
                      <LoadingLines lines={5} columns={3} />
                    )}
                  </Tbody>
                </Table>
              </Col>
            </Row>
          </Section>
        </Col>
      </Row>
    </Container>
  )
}

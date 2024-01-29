import { useState, useEffect, useCallback } from 'react'

import { Row, Col } from 'react-bootstrap'

import { isSameDay } from 'date-fns'

import { Section } from '@/components/Core/Containers/Section'
import { Caption } from '@/components/Core/Typography/Caption'
import { Heading } from '@/components/Core/Typography/Heading'
import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { Skeleton } from '@/components/Core/Skeleton'

import { fillWithLeadingZero } from '@/utils/masks'

import { get } from '@/services/api/sermed-api/sermed-api'
import Image from '@/assets/images/icon-chat.png'

import { IScheduleShift } from './Schedule/Schedule.interface'
import { handleWeekDay, handleMonth } from './Events.helpers'

import { Schedule } from './Schedule'
import { ShowMore } from './ShowMore'

interface Props {
  date?: Date
  events?: IScheduleShift[] | null
  expanded?: boolean
  shouldLoadEvents?: boolean
  onCreateEvent?: () => void
}

export function WidgetSchedules({
  date,
  events,
  expanded,
  shouldLoadEvents,
  onCreateEvent
}: Props) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [dayEvents, setDayEvents] = useState<IScheduleShift[] | null>(null)

  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    if (date && events) {
      setCurrentDate(date)

      const newDayEvents = events.filter(event => isSameDay(date, event.start))

      setDayEvents(newDayEvents)
    }
  }, [date, events, currentDate])

  const fetchData = useCallback(async (date: Date) => {
    try {
      const params = { date }

      const { data } = await get('/schedules', params)
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].start = new Date(data.data[i].start)
        data.data[i].end = new Date(data.data[i].end)
      }
      setDayEvents(data.data)
    } catch {
      setDayEvents([])
    }
  }, [])

  useEffect(() => {
    if (shouldLoadEvents && dayEvents === null) {
      setCurrentDate(new Date())

      fetchData(new Date())
    }
  }, [shouldLoadEvents, dayEvents, fetchData])

  return (
    <Section size="sm">
      <Row>
        <Col className="mb-3">
          {currentDate ? (
            <div className="d-flex gap-2">
              <Heading size="md">
                {fillWithLeadingZero(currentDate.getDate(), 2)}
              </Heading>

              <div className="mt-1">
                <Heading size="xs">
                  {handleWeekDay(currentDate.getDay())}
                </Heading>

                <Caption size="lg">
                  {`${handleMonth(
                    currentDate.getMonth()
                  )} ${currentDate.getFullYear()}`}
                </Caption>
              </div>
            </div>
          ) : (
            <Skeleton size="lg" />
          )}
        </Col>
      </Row>

      {dayEvents ? (
        <div>
          {dayEvents.length > 0 ? (
            dayEvents.map((event, idx) => {
              if (expanded || showMore) {
                return (
                  <Row key={idx} className="my-2">
                    <Col>
                      <Schedule data={event} />
                    </Col>
                  </Row>
                )
              }

              if (idx === 0) {
                return (
                  <Row key={idx}>
                    <Col>
                      <Row className="my-2">
                        <Col>
                          <Schedule data={event} />
                        </Col>
                      </Row>

                      <ShowMore
                        events={dayEvents}
                        onClick={() => setShowMore(true)}
                      />
                    </Col>
                  </Row>
                )
              }

              return undefined
            })
          ) : (
            <Row className="mt-2 mb-3">
              <Col>
                <Row className="justify-content-center">
                  <Col xs="auto">
                    <img src={Image} alt=">Não há eventos para exibir" />
                  </Col>
                </Row>

                <Row className="justify-content-center text-center mt-3">
                  <Col xs={8}>
                    <Caption size="lg">Não há escalas para exibir</Caption>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <>
          <Row className="my-2">
            <Col>
              <Skeleton size="lg" />
              <Skeleton size="lg" />
            </Col>
          </Row>

          <Row className="my-2">
            <Col>
              <Skeleton size="sm" />
            </Col>
          </Row>
        </>
      )}

      {onCreateEvent && (
        <Row className="justify-content-center">
          <Col xs="auto" className="my-2">
            <ButtonLink onClick={onCreateEvent}>Nova Escala</ButtonLink>
          </Col>
        </Row>
      )}
    </Section>
  )
}

WidgetSchedules.defaultProps = {
  date: undefined,
  events: undefined,
  expanded: undefined,
  shouldLoadEvents: undefined,
  onCreateEvent: undefined
}

import { useCallback, useEffect, useState } from 'react'

import {
  Calendar,
  dateFnsLocalizer,
  NavigateAction,
  SlotInfo,
  View
} from 'react-big-calendar'

import {
  format,
  parse,
  startOfWeek,
  getDay,
  isSameDay,
  isSameMonth
} from 'date-fns'

import ptBR from 'date-fns/locale/pt-BR'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'

import { TITLE_SCHEDULE } from '@/constants/title.browser'
import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'

import { useSchedules } from '@/hooks/services/Schedules/useSchedules'
import { useSearchParams } from 'react-router-dom'

import { WidgetSchedules } from '@/components/Core/Widgets/Schedules'
import { ManageSchedule } from '../components/ManageSchedule'

import { IScheduleShift } from './List.interface'
import { handleDayPropGetter, handleEventPropGetter } from './List.helpers'
import { Toolbar } from './components/Toolbar'
import { TeamsAndUsersSearchForm } from './components/TeamsAndUsers'
import { ITeamsAndUsersSearchForm } from './components/TeamsAndUsers/TeamsAndUsers.form'

const locales = {
  'pt-BR': ptBR
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export function ListScheduleCalendar() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()

  const { result, params, refetch, setParams } = useSchedules()

  const [loaded, setLoaded] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())
  const [showModalCreate, setShowModalCreate] = useState(false)

  useEffect(() => {
    document.title = TITLE_SCHEDULE

    setPageHeading('Escalas')

    setPageBreadcrumb([
      { text: 'Home', route: ROUTE_HOME },
      { text: 'Escalas' }
    ])

    setLoaded(true)
  }, [setPageHeading, setPageBreadcrumb])

  useEffect(() => {
    result ? hideLoader() : showLoader()
  }, [result, showLoader, hideLoader])

  const handleSearchParams = useCallback(
    (params: Record<string, any>) => {
      setSearchParams({
        q: window.btoa(JSON.stringify(params))
      })

      setParams(params)
    },
    [setSearchParams, setParams]
  )

  useEffect(() => {
    if (params === null && loaded) {
      let params

      if (searchParams.get('q')) {
        params = JSON.parse(window.atob(String(searchParams.get('q'))))

        params = { date: new Date(params.date || '') }
      } else {
        params = { date: new Date(), team_id: 'aaa' }
      }

      handleSearchParams(params)
    }
  }, [params, loaded, searchParams, handleSearchParams])

  function handleOnSearch(data: ITeamsAndUsersSearchForm) {
    if (params) {
      const { team_id, user_id } = data

      const newParams = {
        ...params,
        team_id,
        user_id
      }

      handleSearchParams(newParams)
    }
  }

  function handleOnSelectEvent(event: IScheduleShift) {
    setSelectedDay(event.schedule_date)
  }

  function handleOnSelectSlot({ start }: SlotInfo) {
    if (!selectedDay) {
      setSelectedDay(start)
      return
    }

    if (isSameMonth(selectedDay, start)) {
      setSelectedDay(start)
    }
  }

  function handleOnShowMore(_events: IScheduleShift[], date: Date) {
    if (!selectedDay) {
      setSelectedDay(date)
      return
    }

    if (!isSameDay(selectedDay, date)) {
      setSelectedDay(date)
    }
  }

  function handleOnNavigate(
    newDate: Date,
    _view: View,
    action: NavigateAction
  ) {
    if (!selectedDay) {
      setSelectedDay(newDate)
      return
    }

    if (!isSameDay(selectedDay, newDate) && action !== 'DATE') {
      setSelectedDay(newDate)

      handleSearchParams({
        date: newDate,
        team_id: params?.team_id,
        user_id: params?.user_id
      })
    }
  }

  return (
    <AnimatedPage>
      <Container>
        <Row>
          <Col lg={9} xxl={10}>
            <Section>
              <Row className="mb-2">
                <Col>
                  <TeamsAndUsersSearchForm
                    defaultValues={
                      params
                        ? { team_id: params.team_id, user_id: params.user_id }
                        : null
                    }
                    onChange={search => handleOnSearch(search)}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Calendar
                  culture="pt-BR"
                  localizer={localizer}
                  views={['month']}
                  selectable={true}
                  defaultDate={selectedDay}
                  date={selectedDay}
                  events={result || undefined}
                  dayPropGetter={date => {
                    return handleDayPropGetter(date, selectedDay)
                  }}
                  eventPropGetter={event => {
                    return handleEventPropGetter(event, selectedDay)
                  }}
                  messages={{
                    date: 'Data',
                    time: 'Tempo',
                    event: 'Evento',
                    allDay: 'Dia Inteiro',
                    week: 'Semana',
                    work_week: 'Semana de Trabalho',
                    day: 'Dia',
                    month: 'Mês',
                    previous: 'Voltar',
                    next: 'Avançar',
                    yesterday: 'Ontem',
                    tomorrow: 'Amanhã',
                    today: 'Hoje',
                    agenda: 'Agenda',

                    noEventsInRange:
                      'Não existem eventos nesse range de datas.',

                    showMore: total => `+${total} Eventos`
                  }}
                  components={{
                    toolbar: Toolbar
                  }}
                  onSelectEvent={event => handleOnSelectEvent(event)}
                  onSelectSlot={slot => handleOnSelectSlot(slot)}
                  onShowMore={(events, date) => handleOnShowMore(events, date)}
                  onNavigate={(newDate, view, action) => {
                    handleOnNavigate(newDate, view, action)
                  }}
                />
              </Row>
            </Section>
          </Col>

          <Col lg={3} xxl={2}>
            <WidgetSchedules
              date={selectedDay}
              events={result}
              expanded={true}
              onCreateEvent={
                params?.team_id ? () => setShowModalCreate(true) : undefined
              }
              onRefetch={() => {
                selectedDay && handleSearchParams({ date: selectedDay })
              }}
            />
          </Col>
        </Row>
      </Container>

      <ManageSchedule
        team_id={params?.team_id}
        date={selectedDay}
        show={showModalCreate}
        onClose={hasChanges => {
          hasChanges && refetch()
          setShowModalCreate(false)
        }}
      />
    </AnimatedPage>
  )
}

import { useCallback, useEffect, useState } from 'react'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useSummaryReports } from '@/hooks/services/Reports/useSummaryReports'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { TITLE_REPORTS } from '@/constants/title.browser'

import { Col, Container, Row } from 'react-bootstrap'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Section } from '@/components/Core/Containers/Section'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { Tooltip } from '@/components/Core/Tooltip'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

import { Empty } from '@/components/Core/Table/Empty'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Pagination } from '@/components/Core/Pagination'
import { Skeleton } from '@/components/Core/Skeleton'
import { useSearchParams } from 'react-router-dom'
import { ReportsSearchForm } from '../components/SearchForm'
import { ReportsFilterForm } from '../components/FilterForm'
import { ReportsTable } from './components/ReportsTable'

import {
  IReportsSearchForm,
  initialSearchValues
} from '../components/SearchForm/SearchForm.form'
import {
  IReportsFilterForm,
  initialFilterValues
} from '../components/FilterForm/FilterForm.form'
import { EmployeeReportDetails } from '../components/EmployeeReportDetails'

export function ListReports() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [groupByTeam, setGroupByTeam] = useState(false)

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  const { result, params, setParams } = useSummaryReports()

  const [loaded, setLoaded] = useState(false)
  const [viewDetail, setViewDetails] = useState({
    user_name: '',
    params: {
      user_id: '',
      initial_date: '',
      final_date: ''
    }
  })

  useEffect(() => {
    document.title = TITLE_REPORTS

    setPageHeading('Equipes')

    setPageBreadcrumb([
      { text: 'Home', route: ROUTE_HOME },
      { text: 'Relatórios' }
    ])

    setLoaded(true)
  }, [setPageHeading, setPageBreadcrumb])

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
      } else {
        params = {
          ...initialSearchValues,
          ...initialFilterValues,
          order: undefined,
          orderBy: '',
          page: 1
        }
      }

      handleSearchParams(params)
    }
  }, [params, loaded, searchParams, handleSearchParams])

  function handleOnSearch(data: IReportsSearchForm) {
    if (params) {
      const { team_id, user_id, groupByTeam } = data

      const newParams = {
        ...params,
        page: 1,
        team_id,
        user_id,
        groupByTeam
      }

      handleSearchParams(newParams)
    }
  }

  function handleOnFilter(data: IReportsFilterForm) {
    if (params) {
      const {
        records,
        final_date,
        initial_date,
        max_absense,
        max_annual_leave,
        max_extra_time,
        min_absense,
        min_annual_leave,
        min_extra_time
      } = data

      const newParams = {
        ...params,
        page: 1,
        records,
        final_date,
        initial_date,
        max_absense,
        max_annual_leave,
        max_extra_time,
        min_absense,
        min_annual_leave,
        min_extra_time
      }

      handleSearchParams(newParams)
    }
  }

  function handleOnChangePage(page: number) {
    if (params) {
      if (params.page !== page) {
        const newParams = {
          ...params,
          page
        }

        handleSearchParams(newParams)
      }
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
                  <ReportsSearchForm
                    defaultValues={{
                      team_id: '',
                      user_id: '',
                      groupByTeam: false
                    }}
                    onAgroup={agroup => {
                      setGroupByTeam(agroup)
                    }}
                    onChange={search => handleOnSearch(search)}
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col className="d-flex justify-content-end">
                  <Tooltip title="Exportar Excel" place="top-start">
                    <ButtonIcon
                      size="sm"
                      icon="border_all"
                      onClick={() => console.log(`cliquei`)}
                    />
                  </Tooltip>

                  <Tooltip title="Exportar PDF" place="top-start">
                    <ButtonIcon
                      size="sm"
                      icon="picture_as_pdf"
                      onClick={() => console.log(`cliquei`)}
                    />
                  </Tooltip>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table
                    isLoading={result === null}
                    hover={!!result?.data.length}
                  >
                    <Thead>
                      <Tr>
                        <Th>
                          <Heading size="xs">
                            {!groupByTeam ? 'Funcionário' : 'Equipe'}
                          </Heading>
                        </Th>

                        {!groupByTeam && (
                          <Th>
                            <Heading size="xs">Equipe</Heading>
                          </Th>
                        )}

                        <Th>
                          <Heading size="xs">Faltas</Heading>
                        </Th>

                        <Th>
                          <Heading size="xs">Horas Extras</Heading>
                        </Th>

                        <Th>
                          <Heading size="xs">Banco de Horas</Heading>
                        </Th>

                        {!groupByTeam && (
                          <Th>
                            <div
                              style={{ height: '2.5rem', width: '2.5rem' }}
                            />
                          </Th>
                        )}
                      </Tr>
                    </Thead>

                    <Tbody>
                      {result ? (
                        result.data.length > 0 ? (
                          result.data.map((item, idx) => (
                            <ReportsTable
                              key={idx}
                              data={item}
                              groupByTeam={groupByTeam}
                              onOpenDetails={() => {
                                if (item.employee_id && item.employee_name) {
                                  setViewDetails({
                                    user_name: item.employee_name,
                                    params: {
                                      user_id: item.employee_id,
                                      initial_date: params?.initial_date,
                                      final_date: params?.final_date
                                    }
                                  })
                                }
                              }}
                            />
                          ))
                        ) : (
                          <Empty columns={groupByTeam ? 4 : 6} />
                        )
                      ) : (
                        <LoadingLines
                          lines={params ? Number(params.records) : 5}
                          columns={groupByTeam ? 4 : 6}
                        />
                      )}
                    </Tbody>
                  </Table>
                </Col>
              </Row>

              <Row className="justify-content-center">
                {params && result ? (
                  <Col xs="auto">
                    <Pagination
                      key={params.page}
                      defaultCurrent={params.page}
                      pageSize={Number(params.records)}
                      total={result.total}
                      onChange={page => handleOnChangePage(page)}
                    />
                  </Col>
                ) : (
                  <Col xs={4} className="mt-5">
                    <Skeleton />
                  </Col>
                )}
              </Row>
            </Section>
          </Col>

          <Col lg={3} xxl={2}>
            <Row>
              <Col>
                <ReportsFilterForm
                  defaultValues={{
                    records: 25,
                    initial_date: null,
                    final_date: null,
                    min_absense: null,
                    max_absense: null,
                    min_extra_time: null,
                    max_extra_time: null,
                    min_annual_leave: null,
                    max_annual_leave: null
                  }}
                  onChange={filter => handleOnFilter(filter)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <EmployeeReportDetails
        params={viewDetail.params}
        user_name={viewDetail.user_name}
        onClose={() => {
          setViewDetails({
            params: {
              user_id: '',
              initial_date: '',
              final_date: ''
            },
            user_name: ''
          })
        }}
      />
    </AnimatedPage>
  )
}

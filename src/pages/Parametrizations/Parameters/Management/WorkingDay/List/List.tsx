import { useCallback, useEffect, useState } from 'react'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useWorkingDay } from '@/hooks/services/Parameters/Management/useWorkingDay'

import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Section } from '@/components/Core/Containers/Section'
import { Tooltip } from '@/components/Core/Tooltip'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { Table, Tbody, Th, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Empty } from '@/components/Core/Table/Empty'
import { Skeleton } from '@/components/Core/Skeleton'

import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { ROUTE_MANAGEMENT_WORKING_DAY_CREATE } from '@/routes/Pages/Parametrizations/Management/Management.paths'
import { TITLE_WORKING_DAY_PARAMETERIZATIONS } from '@/constants/title.browser'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

import { IOrder } from '@/components/Core/Table/Order/Order.interface'
import { Pagination } from '@/components/Core/Pagination'
import { Icon } from '@/components/Core/Icons/Icon'
import {
  IParametersSearchForm,
  initialSearchValues
} from '../../../components/SearchForm/SearchForm.form'
import {
  IParametersFilterForm,
  initialFilterValues
} from '../../../components/FilterForm/FilterForm.Form'
import { ParametersSearchForm } from '../../../components/SearchForm'
import { ParametersFilterForm } from '../../../components/FilterForm'
import { WorkingDayTable } from './components/WorkingDayTable'
import { EditWorkingDay } from '../Edit'

export function ListWorkingDay() {
  const { hasParametrizationsWriter } = useAuthRoles()

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  const { result, params, refetch, setParams } = useWorkingDay()

  const [loaded, setLoaded] = useState(false)
  const [editingRecord, setEditingRecord] = useState('')

  const SEARCH_OPTIONS: IOption[] = [
    {
      value: 'description',
      label: 'Nome da jornada'
    }
  ]

  useEffect(() => {
    document.title = TITLE_WORKING_DAY_PARAMETERIZATIONS

    setPageHeading('Jornadas de Trabalho')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Jornadas de Trabalho' }
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

  function handleOnSearch(data: IParametersSearchForm) {
    if (params) {
      const { search, searchingBy } = data

      const newParams = {
        ...params,
        page: 1,
        search,
        searchingBy
      }

      handleSearchParams(newParams)
    }
  }

  function handleOnFilter(data: IParametersFilterForm) {
    if (params) {
      const { records, status } = data

      const newParams = {
        ...params,
        page: 1,
        records,
        status
      }

      handleSearchParams(newParams)
    }
  }

  function handleOnChangeOrder(order: IOrder, orderBy: string) {
    if (params && (params.order !== order || params.orderBy !== orderBy)) {
      const newParams = {
        ...params,
        page: 1,
        order,
        orderBy
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
                  <ParametersSearchForm
                    options={SEARCH_OPTIONS}
                    defaultValues={
                      params
                        ? {
                            search: params.search,
                            searchingBy: params.searchingBy
                          }
                        : null
                    }
                    onChange={search => handleOnSearch(search)}
                  />
                </Col>
              </Row>

              <Row className="justify-content-end align-items-center mb-3">
                <Col xs="auto">
                  <Tooltip title="Adcionar um Relógio de Ponto">
                    <ButtonIcon
                      size="lg"
                      icon="add"
                      disabled={!hasParametrizationsWriter()}
                      onClick={() =>
                        navigate(ROUTE_MANAGEMENT_WORKING_DAY_CREATE)
                      }
                    />
                  </Tooltip>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table>
                    <Tr>
                      <Th>
                        <Row className="justify-content-center">
                          <Col xs="auto">
                            <Icon size="md" icon="power_settings_new" />
                          </Col>
                        </Row>
                      </Th>

                      <Th>
                        <Heading size="xs">Descrição</Heading>
                      </Th>

                      <Th
                        order={
                          params?.orderBy === 'creationDate'
                            ? params?.order
                            : undefined
                        }
                        orderBy="date"
                        onChange={(order, orderBy) => {
                          handleOnChangeOrder(order, orderBy)
                        }}
                      >
                        <Heading size="xs">Data da criação</Heading>
                      </Th>

                      <Th>
                        <div style={{ height: '2.5rem', width: '2.5rem' }} />
                      </Th>
                    </Tr>

                    <Tbody>
                      {result ? (
                        result.data.length > 0 ? (
                          result.data.map(item => (
                            <WorkingDayTable
                              key={item.uuid}
                              data={item}
                              onEdit={() => setEditingRecord(item.uuid)}
                              onRefetch={() => refetch()}
                            />
                          ))
                        ) : (
                          <Empty columns={4} />
                        )
                      ) : (
                        <LoadingLines lines={5} columns={4} />
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
            <ParametersFilterForm
              defaultValues={
                params
                  ? {
                      records: Number(params.records),
                      status: params.status
                    }
                  : null
              }
              onChange={filter => handleOnFilter(filter)}
            />
          </Col>
        </Row>
      </Container>

      <EditWorkingDay
        uuid={editingRecord}
        onClose={hasChanges => {
          setEditingRecord('')

          hasChanges && refetch()
        }}
      />
    </AnimatedPage>
  )
}

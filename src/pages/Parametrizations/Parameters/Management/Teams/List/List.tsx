import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { useTeams } from '@/hooks/services/Parameters/useTeams'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { TITLE_TEAMS_PARAMETERIZATIONS } from '@/constants/title.browser'

import { IOrder } from '@/components/Core/Table/Order/Order.interface'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { Tooltip } from '@/components/Core/Tooltip'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { ROUTE_MANAGEMENT_TEAMS_CREATE } from '@/routes/Pages/Parametrizations/Management/Management.paths'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { Icon } from '@/components/Core/Icons/Icon'
import { Heading } from '@/components/Core/Typography/Heading'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Empty } from '@/components/Core/Table/Empty'
import { Pagination } from '@/components/Core/Pagination'
import { Skeleton } from '@/components/Core/Skeleton'

import { ParametersSearchForm } from '../../../components/SearchForm'
import {
  IParametersSearchForm,
  initialSearchValues
} from '../../../components/SearchForm/SearchForm.form'
import { IParametersFilterForm } from '../../../components/FilterForm/FilterForm.Form'
import { initialFilterValues } from '../../../components/FilterForm/FilterForm.Form'
import { ParametersFilterForm } from '../../../components/FilterForm/FilterForm'
import { EditTeam } from '../Edit'
import { Teams } from './components'

export function ListTeams() {
  const { hasParametrizationsWriter } = useAuthRoles()

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  const { result, params, refetch, setParams } = useTeams()

  const [loaded, setLoaded] = useState(false)
  const [editingRecord, setEditingRecord] = useState('')

  const SEARCH_OPTIONS: IOption[] = [
    {
      value: 'name',
      label: 'Nome da Equipe'
    }
  ]

  useEffect(() => {
    document.title = TITLE_TEAMS_PARAMETERIZATIONS

    setPageHeading('Equipes')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Equipes' }
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
                  <Tooltip title="Adcionar uma Equipe">
                    <ButtonIcon
                      size="lg"
                      icon="add"
                      disabled={!hasParametrizationsWriter()}
                      onClick={() => navigate(ROUTE_MANAGEMENT_TEAMS_CREATE)}
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
                          orderBy="creationDate"
                          onChange={(order, orderBy) => {
                            handleOnChangeOrder(order, orderBy)
                          }}
                        >
                          <Heading size="xs">Data de criação</Heading>
                        </Th>

                        <Th>
                          <div style={{ height: '2.5rem', width: '2.5rem' }} />
                        </Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {result ? (
                        result.data.length > 0 ? (
                          result.data.map(item => (
                            <Teams
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
                        <LoadingLines
                          lines={params ? Number(params.records) : 5}
                          columns={4}
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

      <EditTeam
        uuid={editingRecord}
        onClose={hasChanges => {
          setEditingRecord('')

          hasChanges && refetch()
        }}
      />
    </AnimatedPage>
  )
}

import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import { v4 } from 'uuid'

import { TITLE_USER_SEARCH } from '@/constants/title.browser'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'

import { useUserSearch } from '@/hooks/services/TimeSheet/useSearch.query'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Section } from '@/components/Core/Containers/Section'
import { Button } from '@/components/Core/Buttons/Button'
import { Pagination } from '@/components/Core/Pagination'
import { Skeleton } from '@/components/Core/Skeleton'

import {
  IUserSearchForm,
  initialSearchValues
} from './components/SearchForm/SearchForm.form'

import {
  IUserFilterForm,
  initialFilterValues
} from './components/FilterForm/FilterForm.form'
import { UserSearchForm } from './components/SearchForm'
import { Customer } from './components/User/User'
import { UserFilterForm } from './components/FilterForm'

export function UserSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  const [displayMode, setDisplayMode] = useState('cards')

  function handleInitialParams() {
    let params

    if (searchParams.get('q')) {
      params = JSON.parse(window.atob(String(searchParams.get('q'))))
    } else {
      params = {
        ...initialSearchValues,
        ...initialFilterValues,
        hash: v4(),
        page: 1
      }
    }

    return params
  }

  const [params, setParams] = useState<Record<string, any>>(handleInitialParams)

  const { isLoading, data } = useUserSearch({ params })

  useEffect(() => {
    document.title = TITLE_USER_SEARCH

    setPageHeading('Pesquisa de Funcionários')

    setPageBreadcrumb([
      { text: 'Home', route: ROUTE_HOME },
      { text: 'Folha de Ponto' },
      { text: 'Pesquisa de Funcionários' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  function handleSearchParams(params: Record<string, any>) {
    setSearchParams({
      q: window.btoa(JSON.stringify(params))
    })

    setParams({ ...params, hash: v4() })
  }

  function handleOnSearch(data: IUserSearchForm) {
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

  function handleOnFilter(data: IUserFilterForm) {
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
                  <UserSearchForm
                    defaultValues={
                      params
                        ? {
                            search: params.search,
                            searchingBy: params.searchingBy
                          }
                        : null
                    }
                    onChange={search => handleOnSearch(search)}
                  >
                    <Row className="justify-content-end align-items-center">
                      <Col xs="auto">
                        <Button
                          type="button"
                          styles="tertiary"
                          icon="list"
                          onClick={() =>
                            setDisplayMode(mode =>
                              mode === 'cards' ? 'list' : 'cards'
                            )
                          }
                        >
                          {displayMode === 'cards'
                            ? 'Exibir em lista'
                            : 'Exibir em cards'}
                        </Button>
                      </Col>
                    </Row>
                  </UserSearchForm>
                </Col>
              </Row>

              <Row>
                <Col>
                  {!isLoading && data ? (
                    <Row>
                      {data.data.map((item, idx) => (
                        <Col key={idx} xs={displayMode === 'cards' ? 6 : 12}>
                          <Customer displayMode={displayMode} data={item} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Row>
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <Col key={idx} xs={displayMode === 'cards' ? 6 : 12}>
                          <Customer displayMode={displayMode} />
                        </Col>
                      ))}
                    </Row>
                  )}
                </Col>
              </Row>

              <Row className="justify-content-center">
                {params && data ? (
                  <Col xs="auto">
                    <Pagination
                      defaultCurrent={params.page}
                      pageSize={Number(params.records)}
                      total={data.total}
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
                <UserFilterForm
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
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import { useUserPermissions } from '@/hooks/services/Parameters/useUserPermissions'

import { Section } from '@/components/Core/Containers/Section'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { Empty } from '@/components/Core/Table/Empty'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Heading } from '@/components/Core/Typography/Heading'
import { Pagination } from '@/components/Core/Pagination'
import { Skeleton } from '@/components/Core/Skeleton'

import { IOrder } from '@/components/Core/Table/Order/Order.interface'
import { PesmissionsTable } from './Components/PermissionsTable'

interface props {
  user_id: string
}

export function ListPermissions({ user_id }: props) {
  const [searchParams, setSearchParams] = useSearchParams()

  const { result, params, refetch, setParams } = useUserPermissions({ user_id })

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

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
      const params = {
        records: 5,
        order: undefined,
        orderBy: '',
        page: 1
      }

      handleSearchParams(params)
    }
  }, [params, loaded, searchParams, handleSearchParams])

  function handleOnChangeOrder(order: IOrder, orderBy: string) {
    if (params && (params.order !== order || params.orderBy !== orderBy)) {
      const newParams = {
        ...params,
        records: 5,
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
    <Container>
      <Row>
        <Col>
          <Section>
            <Row>
              <Col>
                <Table
                  isLoading={result === null}
                  hover={!!result?.data.length}
                >
                  <Thead>
                    <Tr>
                      <Th>
                        <div style={{ width: '14rem' }}>
                          <Heading size="xs">Permissão</Heading>
                        </div>
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
                          <PesmissionsTable
                            key={item.uuid}
                            data={item}
                            onRefetch={() => refetch()}
                          />
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
      </Row>
    </Container>
  )
}

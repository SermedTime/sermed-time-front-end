import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Caption } from '@/components/Core/Typography/Caption'
import { Heading } from '@/components/Core/Typography/Heading'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { usePayslips } from '@/hooks/services/TimeSheet/usePayslips'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Empty } from '@/components/Core/Table/Empty'
import { Pagination } from '@/components/Core/Pagination'
import { Skeleton } from '@/components/Core/Skeleton'
import { TablePayslips } from './components/Table'

export function ListPayslips() {
  const { uuid } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  const [loaded, setLoaded] = useState(false)

  const { params, setParams, result } = usePayslips(uuid)

  console.log(result)

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
      let params

      if (searchParams.get('q')) {
        params = JSON.parse(window.atob(String(searchParams.get('q'))))
      } else {
        params = {
          records: 10,
          page: 1
        }
      }

      handleSearchParams(params)
    }
  }, [params, loaded, searchParams, handleSearchParams])

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
    <Section>
      <Row className="mb-3">
        <Col xl={8}>
          <div className="d-flex gap-1">
            <Icon appearance="outlined" size="lg" icon="receipt" />

            <div className="mt-1">
              <Heading size="xs">Lista de Holerites</Heading>

              <Caption size="lg">Últimos 12 meses</Caption>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table isLoading={result === null} hover={!!result?.data.length}>
            <Thead>
              <Tr>
                <Th>
                  <Heading size="xs">Mês</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Ano</Heading>
                </Th>

                <Th>
                  <Heading size="xs">Tipo</Heading>
                </Th>

                <Th>
                  <div style={{ height: '2.5rem', width: '2.5rem' }} />
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {result ? (
                result.data.length > 0 ? (
                  result.data.map((item, index) => (
                    <TablePayslips key={index} data={item} />
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
  )
}

import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { Col, Row } from 'react-bootstrap'

import { Section } from '@/components/Core/Containers/Section'
import { Heading } from '@/components/Core/Typography/Heading'
import { Caption } from '@/components/Core/Typography/Caption'
import { Icon } from '@/components/Core/Icons/Icon'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'

import { useTimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { Empty } from '@/components/Core/Table/Empty'
import { Skeleton } from '@/components/Core/Skeleton'
import { Pagination } from '@/components/Core/Pagination'
import { TimeSheetFilterForm } from './FilterForm'
import {
  ITimeSheetFilterForm,
  initialFilterValues
} from './FilterForm/FilterForm.form'
import { TableTimeSheet } from './components/Table'

export function ListTimeSheet() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [loaded, setLoaded] = useState(false)

  const { uuid } = useParams()

  const defaultMonth = new Date().getMonth() + 1

  const defaultYear = new Date().getFullYear()

  const { params, refetch, result, setParams } = useTimeSheet(uuid)

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
          ...initialFilterValues,
          records: 10,
          page: 1
        }
      }

      handleSearchParams(params)
    }
  }, [params, loaded, searchParams, handleSearchParams])

  function handleOnFilter(data: ITimeSheetFilterForm) {
    if (params) {
      const { month, year } = data

      const newParams = {
        month,
        year,
        records: 10,
        page: 1
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
    <Section>
      <Row className="mb-3">
        <Col xl={8}>
          <div className="d-flex gap-1">
            <Icon appearance="outlined" size="lg" icon="poll" />

            <div className="mt-1">
              <Heading size="xs">Resumo das Horas</Heading>

              <Caption size="lg">Dados do mês</Caption>
            </div>
          </div>
        </Col>

        <Col xl={4}>
          <TimeSheetFilterForm
            defaultValues={
              params
                ? {
                    year: defaultYear,
                    month: defaultMonth
                  }
                : null
            }
            onChange={filter => handleOnFilter(filter)}
          />
        </Col>
      </Row>

      <Row>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Heading size="xs">Dia</Heading>
              </Th>

              <Th>
                <Heading size="xs">Ent. 1</Heading>
              </Th>

              <Th>
                <Heading size="xs">Saí. 1</Heading>
              </Th>

              <Th>
                <Heading size="xs">Ent. 2</Heading>
              </Th>

              <Th>
                <Heading size="xs">Saí. 2</Heading>
              </Th>

              <Th>
                <Heading size="xs">Ent. 3</Heading>
              </Th>

              <Th>
                <Heading size="xs">Saí. 3</Heading>
              </Th>

              <Th>
                <Heading size="xs">Extra</Heading>
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
                  <TableTimeSheet
                    key={item.id}
                    data={item}
                    onRefetch={() => refetch()}
                  />
                ))
              ) : (
                <Empty columns={9} />
              )
            ) : (
              <LoadingLines lines={5} columns={9} />
            )}
          </Tbody>
        </Table>
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
  )
}

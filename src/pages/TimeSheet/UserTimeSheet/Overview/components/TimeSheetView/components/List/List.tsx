import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useSystemParams } from '@/hooks/utils/useParams'

import { Col, Row } from 'react-bootstrap'

import { selectYears } from '@/utils/selectYears'

import { Section } from '@/components/Core/Containers/Section'
import { Heading } from '@/components/Core/Typography/Heading'
import { Caption } from '@/components/Core/Typography/Caption'
import { Select } from '@/components/Core/Form/Fields/Select'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { Icon } from '@/components/Core/Icons/Icon'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'

export function ListTimeSheet() {
  const { uuid } = useParams()
  console.log(uuid)

  const { months } = useSystemParams()

  const defaultMonth = new Date().getMonth() + 1
  const months_year = months.filter(month => {
    return month.value <= defaultMonth
  })
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth)

  const years_options = selectYears(5)
  const defaultYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(defaultYear)

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

        <Col>
          <Select
            size="sm"
            placeholder="Selecione"
            value={selectedYear}
            options={years_options}
            onChange={({ value }: IOption) => {
              setSelectedYear(current =>
                Number(value) > 0 ? Number(value) : current
              )
              setSelectedMonth(defaultMonth)
            }}
          />
        </Col>

        <Col>
          <Select
            size="sm"
            placeholder="Selecione"
            value={selectedMonth}
            options={selectedYear === defaultYear ? months_year : months}
            onChange={({ value }: IOption) => {
              setSelectedMonth(current =>
                Number(value) > 0 ? Number(value) : current
              )
            }}
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
            </Tr>
          </Thead>

          <Tbody>
            <LoadingLines lines={5} columns={8} />
          </Tbody>
        </Table>
      </Row>
    </Section>
  )
}

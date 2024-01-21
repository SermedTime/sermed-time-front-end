import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Table, Tbody, Th, Thead, Tr } from '@/components/Core/Table'
import { Empty } from '@/components/Core/Table/Empty'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Heading } from '@/components/Core/Typography/Heading'
import { Col, Container, Row } from 'react-bootstrap'

interface props {
  uuid: string
}

export function ListTeams({ uuid }: props) {
  return (
    <Container>
      <Row>
        <Col>
          <Section>
            <Row>
              <Col>
                <Table
                // isLoading={result === null}
                // hover={!!result?.data.length}
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
                        <Heading size="xs">Nome</Heading>
                      </Th>

                      <Th
                      // order={
                      //   params?.orderBy === 'creationDate'
                      //     ? params?.order
                      //     : undefined
                      // }
                      // orderBy="creationDate"
                      // onChange={(order, orderBy) => {
                      //   handleOnChangeOrder(order, orderBy)
                      // }}
                      >
                        <Heading size="xs">Data de criação</Heading>
                      </Th>

                      <Th>
                        <div style={{ height: '2.5rem', width: '2.5rem' }} />
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {/* {result ? (
                      result.data.length > 0 ? (
                        result.data.map(item => (
                          <UsersTable
                            key={item.uuid}
                            data={item}
                            onEdit={() => setEditingRecord(item.uuid)}
                            onAddTeam={() => setAddTeamRecord(item.uuid)}
                            onRefetch={() => refetch()}
                          />
                        ))
                      ) : (
                        <Empty columns={4} />
                      )
                    ) : (
                      <LoadingLines lines={5} columns={4} />
                    )} */}
                    <LoadingLines lines={5} columns={4} />
                  </Tbody>
                </Table>
              </Col>
            </Row>
          </Section>
        </Col>
      </Row>
    </Container>
  )
}

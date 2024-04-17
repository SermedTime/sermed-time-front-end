import { useEffect, useState } from 'react'

import { Col, Row } from 'react-bootstrap'

import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useTeams } from '@/hooks/services/Parameters/useTeams'
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Empty } from '@/components/Core/Table/Empty'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'

interface Props {
  unit: string
  onClose: () => void
}

export function UnitTeams({ unit, onClose }: Props) {
  const [showModal, setShowModal] = useState(false)

  const { result, setParams } = useTeams()

  function handleOnClose() {
    setShowModal(false)
    onClose()
  }

  useEffect(() => {
    if (unit) {
      setShowModal(true)

      setParams({
        unit
      })
    }
  }, [unit, setParams])

  return (
    <Modal visible={showModal} onClose={() => handleOnClose()}>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="diversity_2" />

            <Subtitle size="sm">Equipes da unidade</Subtitle>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table isLoading={result === null}>
            <Thead>
              <Tr>
                <Th>
                  <Heading size="xs">Nome</Heading>
                </Th>

                <Th>
                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <Heading size="xs">Membros</Heading>
                    </Col>
                  </Row>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {result ? (
                result.data.length > 0 ? (
                  result.data.map(item => (
                    <Tr>
                      <Td>
                        <Paragraph size="sm">{item.name}</Paragraph>
                      </Td>

                      <Td>
                        <Row className="justify-content-center">
                          <Col xs="auto">
                            <Paragraph size="sm">
                              {item.total_members}
                            </Paragraph>
                          </Col>
                        </Row>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Empty columns={2} />
                )
              ) : (
                <LoadingLines lines={5} columns={2} />
              )}
            </Tbody>
          </Table>
        </Col>
      </Row>
    </Modal>
  )
}

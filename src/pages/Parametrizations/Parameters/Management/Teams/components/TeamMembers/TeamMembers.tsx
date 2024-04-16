import { useEffect, useState } from 'react'

import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useUsers } from '@/hooks/services/Parameters/useUsers'
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Empty } from '@/components/Core/Table/Empty'
import { Paragraph } from '@/components/Core/Typography/Paragraph'

interface Props {
  uuid: string
  onClose: () => void
}

export function TeamMembers({ uuid, onClose }: Props) {
  const [showModal, setShowModal] = useState(false)

  const { result, setParams } = useUsers()

  function handleOnCancel() {
    setShowModal(false)
    onClose()
  }

  useEffect(() => {
    if (uuid) {
      setShowModal(true)

      setParams({
        team: uuid
      })
    }
  }, [uuid, setParams])

  return (
    <Modal visible={showModal} onClose={() => handleOnCancel()}>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="groups_2" />

            <Subtitle size="sm">Membros da equipe</Subtitle>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table isLoading={result === null}>
            <Thead>
              <Tr>
                <Th>
                  <Heading size="xs">Membro</Heading>
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
                    </Tr>
                  ))
                ) : (
                  <Empty columns={1} />
                )
              ) : (
                <LoadingLines lines={5} columns={4} />
              )}
            </Tbody>
          </Table>
        </Col>
      </Row>
    </Modal>
  )
}

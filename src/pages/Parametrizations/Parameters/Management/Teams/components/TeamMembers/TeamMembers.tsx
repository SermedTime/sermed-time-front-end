import { useEffect, useState } from 'react'

import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/Core/Table'
import { Heading } from '@/components/Core/Typography/Heading'
import { LoadingLines } from '@/components/Core/Table/LoadingLines'
import { Empty } from '@/components/Core/Table/Empty'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { useMembership } from '@/hooks/services/Parameters/useMembership'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'

interface Props {
  uuid: string
  onClose: () => void
}

export function TeamMembers({ uuid, onClose }: Props) {
  const [showModal, setShowModal] = useState(false)

  const { result, setParams } = useMembership()

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

                <Th>
                  <Heading size="xs">Supervisor</Heading>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {result ? (
                result.data.length > 0 ? (
                  result.data.map(item => (
                    <Tr>
                      <Td>
                        <Paragraph size="sm">{item.user_name}</Paragraph>
                      </Td>

                      <Td>
                        <ButtonIcon
                          appearance={`${
                            item.is_supervisor === 'active'
                              ? 'filled'
                              : 'outlined'
                          }`}
                          size="md"
                          icon={`${
                            item.is_supervisor === 'active'
                              ? 'toggle_on'
                              : 'toggle_off'
                          }`}
                          disabled={true}
                        />
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

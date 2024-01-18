import { Widget } from '@/components/Core/Containers/Widget'
import { Heading } from '@/components/Core/Typography/Heading'

import { Col, Row } from 'react-bootstrap'

import { Caption } from '@/components/Core/Typography/Caption'
import { cnpjMask } from '@/utils/masks'
import { Skeleton } from '@/components/Core/Skeleton'
import { useAuthContext } from '@/contexts/Auth'
import { convertIsoDateToPtBr } from '@/utils/date'

export function WidgetPaycheck() {
  const { user } = useAuthContext()

  return (
    <Widget icon="folder_shared" heading="Ficha" caption="Dados Cadastrais">
      <Col className="mt-4">
        <Row>
          <Heading size="xs">Empresa</Heading>
        </Row>
        <Row className="mt-1">
          {user ? (
            <Caption size="lg">{user.companyName}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">CNPJ</Heading>
        </Row>
        <Row className="mt-1">
          {user ? (
            <Caption size="lg">{cnpjMask(user.companyCnpj)}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">Funcão</Heading>
        </Row>
        <Row className="mt-1">
          {user ? <Caption size="lg">{user.position}</Caption> : <Skeleton />}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">Data de Admissão</Heading>
        </Row>
        <Row className="mt-1">
          {user ? (
            <Caption size="lg">
              {convertIsoDateToPtBr(user.admissionDate)}
            </Caption>
          ) : (
            <Skeleton />
          )}
        </Row>
      </Col>
    </Widget>
  )
}

import { useCallback, useEffect, useState } from 'react'

import { Widget } from '@/components/Core/Containers/Widget'
import { Heading } from '@/components/Core/Typography/Heading'

import { Col, Row } from 'react-bootstrap'

import { fakeRequest } from '@/services/api/sermed-api/sermed-api'

import { Caption } from '@/components/Core/Typography/Caption'
import { cnpjMask } from '@/utils/masks'
import { Skeleton } from '@/components/Core/Skeleton'
import { IUserProfile, fakeUserProfile } from './Paycheck.interface'

export function WidgetPaycheck() {
  const [result, setResult] = useState<IUserProfile | null>(null)

  const fetchData = useCallback(async () => {
    try {
      await fakeRequest(2000)

      setResult(fakeUserProfile.data[0])
    } catch {
      setResult(null)
    }
  }, [])

  useEffect(() => {
    if (result === null) {
      fetchData()
    }
  }, [result, fetchData])

  return (
    <Widget icon="folder_shared" heading="Ficha" caption="Dados Cadastrais">
      <Col className="mt-4">
        <Row>
          <Heading size="xs">Relógio de Ponto</Heading>
        </Row>
        <Row className="mt-1">
          {result ? (
            <Caption size="lg">{result.company}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">CNPJ</Heading>
        </Row>
        <Row className="mt-1">
          {result ? (
            <Caption size="lg">{cnpjMask(result.cnpj)}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">Inscrição Estadual</Heading>
        </Row>
        <Row className="mt-1">
          {result ? (
            <Caption size="lg">{result.stateRegistration}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">Funcão</Heading>
        </Row>
        <Row className="mt-1">
          {result ? (
            <Caption size="lg">{result.position}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">Departamento</Heading>
        </Row>
        <Row className="mt-1">
          {result ? (
            <Caption size="lg">{result.department}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>

        <Row className="mt-2">
          <Heading size="xs">Responsável Direto</Heading>
        </Row>
        <Row className="mt-1">
          {result ? (
            <Caption size="lg">{result.responsible}</Caption>
          ) : (
            <Skeleton />
          )}
        </Row>
      </Col>
    </Widget>
  )
}

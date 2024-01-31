import { DataDisplay } from '@/components/Core/Data/Display'
import { Skeleton } from '@/components/Core/Skeleton'
import { Tag } from '@/components/Core/Tag'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useUserDetails } from '@/hooks/services/TimeSheet/useUserDetails'
import { cnpjMask, cpfMask } from '@/utils/masks'

import { Col, Row } from 'react-bootstrap'
import { Accordion } from '@/components/Core/Accordion'

interface Props {
  user_id: string
}

export function UserData({ user_id }: Props) {
  const { result } = useUserDetails(user_id)

  return (
    <Accordion
      heading={
        <Row className="justify-content-between align-items-center mb-1">
          <Col xs={result ? 'auto' : 5}>
            <Row>
              <Col xs={result ? 'auto' : 4}>
                {result ? (
                  <div className="d-flex align-items-center gap-2">
                    <Subtitle size="sm">{result.name}</Subtitle>

                    <Tag>{`#${result.employeeCode}`}</Tag>
                  </div>
                ) : (
                  <Skeleton />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      }
    >
      <Row className="align-items-center mb-2">
        <Col xs={4}>
          <DataDisplay
            label="Empresa"
            value={result ? result.companyName : ''}
            loading={!result}
          />
        </Col>

        <Col xs={4}>
          <DataDisplay
            label="CNPJ da Empresa"
            value={result ? cnpjMask(result.companyCnpj) : 'Não encontrado'}
            loading={!result}
          />
        </Col>

        <Col xs={4}>
          <DataDisplay
            label="Função"
            value={result ? result.position : 'Não encontrado'}
            loading={!result}
          />
        </Col>
      </Row>

      <Row className="align-items-center mb-2">
        <Col xs={4}>
          <DataDisplay
            label="CPF"
            value={result ? cpfMask(result.cpf) : ''}
            loading={!result}
          />
        </Col>

        <Col xs={4}>
          <DataDisplay
            label="PIS"
            value={result ? result.pis : 'Não encontrado'}
            loading={!result}
          />
        </Col>

        <Col xs={4}>
          <DataDisplay
            label="Carteira de Trabalho"
            value={result ? result.ctps : 'Não encontrado'}
            loading={!result}
          />
        </Col>
      </Row>

      <Row className="align-items-center ">
        <Col xs={4}>
          <DataDisplay
            label="N° Folha de Pagamento"
            value={result ? result.payrollNumber : ''}
            loading={!result}
          />
        </Col>

        <Col xs={4}>
          <DataDisplay
            label="Admissão"
            value={
              result?.admissionDate
                ? format(
                    new Date(
                      new Date(result.admissionDate.replace('Z', '-0300'))
                    ),
                    "dd 'de' MMMM 'de' yyyy",
                    {
                      locale: ptBR
                    }
                  )
                : ''
            }
            loading={!result}
          />
        </Col>

        {result?.resignationDate && (
          <Col xs={4}>
            <DataDisplay
              label="Demissão"
              value={format(
                new Date(
                  new Date(result.resignationDate.replace('Z', '-0300'))
                ),
                "dd 'de' MMMM 'de' yyyy",
                {
                  locale: ptBR
                }
              )}
              loading={!result}
            />
          </Col>
        )}
      </Row>
    </Accordion>
  )
}

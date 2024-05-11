import { useCallback, useEffect, useState } from 'react'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { get } from '@/services/api/sermed-api/sermed-api'

import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Button } from '@/components/Core/Buttons/Button'

import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { RegisterWorkingTime } from '../../../components/WorkingTime/RegisterForm'

import { IWorkingTimeRegisterForm } from '../../../components/WorkingTime/RegisterForm/RegisterForm.form'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function EditWorkingTime({ uuid, onClose }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [readOnly, setReadOnly] = useState(true)
  const [initialValues, setInitialValues] =
    useState<IWorkingTimeRegisterForm | null>(null)

  const fetchData = useCallback(
    async (uuid: string) => {
      try {
        const {
          data: { data }
        } = await get(`/parametrizations/management/working-time/${uuid}`)

        setInitialValues({
          workingTime: data
        })
      } catch {
        handleApiRejection()
        onClose(false)
      }
    },
    [handleApiRejection, onClose]
  )

  useEffect(() => {
    if (initialValues === null && uuid) {
      setReadOnly(true)

      fetchData(uuid)
    }
  }, [initialValues, uuid, fetchData])

  function handleOnCancel() {
    setReadOnly(true)
    setInitialValues(null)

    onClose(false)
  }

  async function handleOnSubmit(formValues: IWorkingTimeRegisterForm) {
    showLoader()
    console.log(formValues)
    addToast({
      type: 'warning',
      title: 'Ooops',
      description: `Hello`
    })
    hideLoader()
  }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="edit" />

            <Subtitle size="sm">Editar Horas da Jornada de Trabalho</Subtitle>
          </div>
        </Col>

        <Col>
          <Button
            type="button"
            styles="tertiary"
            icon="edit"
            onClick={() => setReadOnly(readOnly => !readOnly)}
            disabled={
              !initialValues || !readOnly || !hasParametrizationsWriter()
            }
          >
            {`${readOnly ? 'Alterar' : 'Alterando...'}`}
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={2} />
        <Col className="d-flex justify-content-center">
          <Paragraph size="sm">Entrada 1</Paragraph>
        </Col>
        <Col className="d-flex justify-content-center">
          <Paragraph size="sm">Saída 1</Paragraph>
        </Col>
        <Col className="d-flex justify-content-center">
          <Paragraph size="sm">Entrada 2</Paragraph>
        </Col>
        <Col className="d-flex justify-content-center">
          <Paragraph size="sm">Saída 2</Paragraph>
        </Col>
        <Col className="d-flex justify-content-center">
          <Paragraph size="sm">Entrada 3</Paragraph>
        </Col>
        <Col className="d-flex justify-content-center">
          <Paragraph size="sm">Saída 3</Paragraph>
        </Col>
      </Row>

      <Row>
        <Col>
          <RegisterWorkingTime
            initialValues={initialValues}
            readOnly={readOnly}
            onCancel={() => handleOnCancel()}
            onSubmit={values => handleOnSubmit(values)}
          />
        </Col>
      </Row>
    </>
  )
}

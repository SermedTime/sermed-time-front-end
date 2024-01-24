import { useCallback, useEffect, useState } from 'react'

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { usePermissionContext } from '@/contexts/Permissions'

import { get, put } from '@/services/api/sermed-api/sermed-api'
import { Modal } from '@/components/Core/Modal'
import { Col, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { Button } from '@/components/Core/Buttons/Button'
import { IClockTimeRegisterForm } from '../components/RegisterForm/RegisterForm.form'
import { ClockTimeRegisterForm } from '../components/RegisterForm/RegisterForm'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function EditTimeClock({ uuid, onClose }: Props) {
  const { hasParametrizationsWriter } = usePermissionContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [showModal, setShowModal] = useState(false)
  const [readOnly, setReadOnly] = useState(true)

  const [initialValues, setInitialValues] =
    useState<IClockTimeRegisterForm | null>(null)

  const fetchData = useCallback(
    async (uuid: string) => {
      try {
        const {
          data: { data }
        } = await get(`/parametrizations/time-clock/${uuid}`)

        const {
          city,
          clock_ip,
          manufacturer,
          model,
          name,
          sector,
          state,
          status,
          unit
        } = data

        setInitialValues({
          city,
          clock_ip,
          manufacturer,
          model,
          name,
          sector,
          state,
          status,
          unit,
          uuid
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
      setShowModal(true)
      setReadOnly(true)

      fetchData(uuid)
    }
  }, [initialValues, uuid, fetchData])

  function handleOnCancel() {
    setShowModal(false)
    setReadOnly(true)
    setInitialValues(null)

    onClose(false)
  }

  async function handleOnSubmit(formValues: IClockTimeRegisterForm) {
    try {
      showLoader()

      const { data, message } = await put(
        `/parametrizations/time-clock/${formValues.uuid}`,
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'O cadastro do Relógio foi editado.'
        })

        setShowModal(false)
        setReadOnly(true)
        setInitialValues(null)

        onClose(true)
      }

      if (message) {
        addToast({
          type: 'warning',
          title: 'Ooops',
          description: message
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    <Modal visible={showModal} onClose={() => handleOnCancel()}>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="edit" />

            <Subtitle size="sm">Editar Relógio de Ponto</Subtitle>
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

      <Row>
        <Col>
          <ClockTimeRegisterForm
            mode="edit"
            initialValues={initialValues}
            readOnly={readOnly}
            onCancel={() => handleOnCancel()}
            onSubmit={values => handleOnSubmit(values)}
          />
        </Col>
      </Row>
    </Modal>
  )
}

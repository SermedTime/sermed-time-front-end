import { useCallback, useEffect, useState } from 'react'
import { useToastContext } from '@/contexts/Toast'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'
import { useLoaderContext } from '@/contexts/Loader'

import { get, put } from '@/services/api/sermed-api/sermed-api'

import { Col, Row } from 'react-bootstrap'
import { Modal } from '@/components/Core/Modal'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Button } from '@/components/Core/Buttons/Button'

import { cpfMask } from '@/utils/masks'

import { IUserRegisterForm } from '../components/RegisterForm/RegisterForm.form'
import { UserRegisterForm } from '../components/RegisterForm/RegisterForm'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function DetailsUser({ uuid, onClose }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [showModal, setShowModal] = useState(false)
  const [readOnly, setReadOnly] = useState(true)

  const [initialValues, setInitialValues] = useState<IUserRegisterForm | null>(
    null
  )

  const fetchData = useCallback(
    async (uuid: string) => {
      try {
        const {
          data: { data }
        } = await get(`parametrizations/users/${uuid}`)

        const {
          cpf,
          name,
          socialName,
          companyUuid,
          position,
          email,
          payrollNumber,
          employeeCode,
          pis,
          ctps,
          admissionDate,
          resignationDate,
          status,
          workingDayId
        } = data

        setInitialValues({
          cpf: cpfMask(cpf),
          name,
          socialName,
          companyUuid,
          position,
          email,
          payrollNumber,
          employeeCode,
          pis,
          ctps,
          admissionDate: admissionDate?.split('T')[0],
          resignationDate,
          status,
          uuid,
          workingDayId
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

  async function handleOnSubmit({ workingDayId, uuid }: IUserRegisterForm) {
    try {
      showLoader()

      const { data, message } = await put(
        `/parametrizations/users/working-day/${uuid}`,
        { workingDayId }
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Jornada de trabalho salva com sucesso.'
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

            <Subtitle size="sm">Detalhes do Usuário</Subtitle>
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
          <UserRegisterForm
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

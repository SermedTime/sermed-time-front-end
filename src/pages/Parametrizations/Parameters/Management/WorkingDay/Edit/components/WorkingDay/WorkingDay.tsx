import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'
import { Col, Row } from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react'
import { get, put } from '@/services/api/sermed-api/sermed-api'
import { Button } from '@/components/Core/Buttons/Button'
import { WorkingDayRegisterForm } from '../../../components/RegisterForm'
import { IWorkingDayRegisterForm } from '../../../components/RegisterForm/RegisterForm.form'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function WorkingDay({ uuid, onClose }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [readOnly, setReadOnly] = useState(true)
  const [initialValues, setInitialValues] =
    useState<IWorkingDayRegisterForm | null>(null)

  const fetchData = useCallback(
    async (uuid: string) => {
      try {
        const {
          data: { data }
        } = await get(`/parametrizations/management/working-day/${uuid}`)

        const { workingDayName, status } = data

        setInitialValues({
          uuid,
          workingDayName,
          status
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

  async function handleOnSubmit(formValues: IWorkingDayRegisterForm) {
    try {
      showLoader()

      const { data, message } = await put(
        `/parametrizations/management/working-day/${uuid}`,
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'O cadastro da jornada de trabalho foi editado.'
        })

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
    <>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="edit" />

            <Subtitle size="sm">Editar Jornada de Trabalho</Subtitle>
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
          <WorkingDayRegisterForm
            mode="edit"
            initialValues={initialValues}
            onCancel={() => handleOnCancel()}
            onSubmit={values => handleOnSubmit(values)}
          />
        </Col>
      </Row>
    </>
  )
}

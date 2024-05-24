import { useEffect, useState } from 'react'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { Col, Row } from 'react-bootstrap'
import { Modal } from '@/components/Core/Modal'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { post } from '@/services/api/sermed-api/sermed-api'
import { convertToBase64 } from '@/utils/generic'
import { IUploadTimeSheet } from './components/UploadForm.form'
import { UploadTimeSheetForm } from './components'

interface Props {
  uuid: string
  onClose: (hasChanges: boolean) => void
}

export function UploadTimeSheet({ uuid, onClose }: Props) {
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (uuid) {
      setShowModal(true)
    }
  }, [uuid])

  function handleOnCancel() {
    setShowModal(false)

    onClose(false)
  }

  async function onSubmit(formValues: IUploadTimeSheet) {
    try {
      showLoader()

      const params = {
        timeSheetFile: formValues.timeSheetFile
          ? await convertToBase64(formValues.timeSheetFile)
          : ''
      }

      const { data } = await post(
        `parametrizations/time-clock/upload-time-sheet/${uuid}`,
        params
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Dados atualizados com sucesso!'
        })

        setShowModal(false)

        onClose(true)
      }
    } catch {
      handleApiRejection()
      onClose(false)
    } finally {
      hideLoader()
    }
  }

  return (
    <Modal visible={showModal} onClose={() => handleOnCancel()}>
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="upload_file" />

            <Subtitle size="sm">Carregar Folha de Ponto</Subtitle>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <UploadTimeSheetForm onSubmit={values => onSubmit(values)} />
        </Col>
      </Row>
    </Modal>
  )
}

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import {
  convertDataUTCToGMTMore3,
  convertIsoDateToPtBr,
  convertIsoDateToTime
} from '@/utils/date'
import { isMissed } from '@/utils/validations'

import { Col, Row } from 'react-bootstrap'
import { Button } from '@/components/Core/Buttons/Button'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Tag } from '@/components/Core/Tag'

import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import { post } from '@/services/api/sermed-api/sermed-api'
import { ITimeSheetForm } from './components/RegisterForm/RegisterForm.form'

import { useEditTimeSheetHelper } from './useEditTimeSheetHelper'
import { RegisterTimeSheet } from './components/RegisterForm'

interface Props {
  data: ITimeSheet
  onClose: (hasChanges: boolean) => void
}

export function EditTimeSheet({ data, onClose }: Props) {
  const { uuid: userId } = useParams()
  const { hasMultiviewPointWriter, hasTeamPointWriter } = useAuthRoles()
  const { statusOvertime, typeOvertime } = useEditTimeSheetHelper()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [showModal, setShowModal] = useState(false)
  const [readOnly, setReadOnly] = useState(true)

  const [initialValues, setInitialValues] = useState<ITimeSheetForm | null>(
    null
  )

  useEffect(() => {
    if (data.date) {
      setInitialValues({
        timeSheetId: data.hoursSummaryId,
        date: new Date(data.date),
        firstEntry: convertIsoDateToTime(data.firstEntry),
        firstExit: convertIsoDateToTime(data.firstExit),
        secondEntry: convertIsoDateToTime(data.secondEntry),
        secondExit: convertIsoDateToTime(data.secondExit),
        thirdEntry: convertIsoDateToTime(data.thirdEntry),
        thirdExit: convertIsoDateToTime(data.thirdExit),
        overtimeStatus: data.overtimeStatus,
        reasonForRejection: data.reasonForRejection
      })
      setShowModal(true)
      setReadOnly(true)
    }
  }, [data])

  function handleOnCancel() {
    setInitialValues(null)
    setShowModal(false)
    setReadOnly(true)

    onClose(false)
  }

  async function handleOnSubmit(formValues: ITimeSheetForm) {
    try {
      showLoader()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { reasonForRejection, overtimeStatus, ...payload } = formValues

      const { data, message } = await post(
        `/overview/time-sheet/update/${userId}`,
        payload
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'As horas foram salvas com sucesso!'
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
    <Modal visible={showModal} onClose={() => handleOnCancel()} mw="xl">
      <Row className="d-flex align-items-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Icon icon="edit" />

            <Subtitle size="sm">
              Registro de {data.day},{' '}
              {convertIsoDateToPtBr(convertDataUTCToGMTMore3(data.date))}
            </Subtitle>
          </div>
        </Col>

        {(hasMultiviewPointWriter() || hasTeamPointWriter()) && (
          <Col>
            <Button
              type="button"
              styles="tertiary"
              icon="edit"
              onClick={() => setReadOnly(readOnly => !readOnly)}
              disabled={!readOnly || !!data.overtimeStatus}
            >
              {`${readOnly ? 'Alterar' : 'Alterando...'}`}
            </Button>
          </Col>
        )}

        <Col className="d-flex justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <Subtitle size="sm">Saldo: </Subtitle>

            {isMissed(data.firstEntry, data.overtime) ? (
              <Tag size="lg" highlight>
                Falta
              </Tag>
            ) : (
              <Tag size="lg" status={typeOvertime(data.overtime)}>{`${
                data.overtime || '00:00'
              }`}</Tag>
            )}

            {data.overtime &&
              !data.overtime.includes('-') &&
              data.overtime !== '00:00' && (
                <>
                  {statusOvertime(data.overtimeStatus)}
                  {data.overtimeStatus === 'A' && (
                    <Tag size="sm" status="neutral">
                      {data.overtimeAcceptType}
                    </Tag>
                  )}
                </>
              )}
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <RegisterTimeSheet
            initialValues={initialValues}
            readonly={readOnly}
            onCancel={() => handleOnCancel()}
            onSubmit={values => handleOnSubmit(values)}
          />
        </Col>
      </Row>
    </Modal>
  )
}

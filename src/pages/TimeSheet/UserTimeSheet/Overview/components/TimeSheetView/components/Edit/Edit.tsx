import { Button } from '@/components/Core/Buttons/Button'
import { Icon } from '@/components/Core/Icons/Icon'
import { Modal } from '@/components/Core/Modal'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'
import { ITimeSheet } from '@/hooks/services/TimeSheet/useTimeSheet'
import {
  convertDataUTCToGMTMore3,
  convertIsoDateToPtBr,
  convertIsoDateToTime
} from '@/utils/date'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Tag } from '@/components/Core/Tag'
import { isMissed } from '@/utils/validations'
import { RegisterTimeSheet } from './components/RegisterForm'
import { ITimeSheetForm } from './components/RegisterForm/RegisterForm.form'
import { useEditTimeSheetHelper } from './useEditTimeSheetHelper'

interface Props {
  data: ITimeSheet
  onClose: (hasChanges: boolean) => void
}

export function EditTimeSheet({ data, onClose }: Props) {
  const { hasParametrizationsWriter } = useAuthRoles()

  const { statusOvertime, typeOvertime } = useEditTimeSheetHelper()

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
    console.log(formValues)
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

        {hasParametrizationsWriter() && (
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

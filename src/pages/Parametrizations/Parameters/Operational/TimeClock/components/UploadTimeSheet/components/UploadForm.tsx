import { Col, Row } from 'react-bootstrap'
import { Form, Formik } from 'formik'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Tooltip } from '@/components/Core/Tooltip'
import { ButtonIcon } from '@/components/Core/Buttons/ButtonIcon'
import { InputFile } from '@/components/Core/Form/Fields/InputFile'

import { Button } from '@/components/Core/Buttons/Button'
import {
  IUploadTimeSheet,
  initialValues,
  validationSchema
} from './UploadForm.form'

interface Props {
  onSubmit: (formValues: IUploadTimeSheet) => void
}

export function UploadTimeSheetForm({ onSubmit }: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldTouched, setFieldValue, values, isValid }) => (
        <Form>
          {values.timeSheetFile && (
            <Row className="justify-content-between align-items-center mb-2">
              <Col
                xs="auto"
                className="d-flex flex-row justify-content-between align-items-center"
              >
                <Tooltip title="Apagar" place="top">
                  <ButtonIcon
                    appearance="outlined"
                    size="sm"
                    icon="delete"
                    onClick={() => setFieldValue('timeSheetFile', null)}
                  />
                </Tooltip>
                <Paragraph size="sm">{values.timeSheetFile.name}</Paragraph>
              </Col>

              <Col xs="auto">
                <Button type="submit" styles="primary" disabled={!isValid}>
                  Salvar
                </Button>
              </Col>
            </Row>
          )}

          <Row className="mt-3">
            <Col xs="auto">
              <InputFile
                accept=".txt"
                label="Escolha o arquivo de Folha de Ponto"
                onChange={event => {
                  const { files } = event.currentTarget

                  if (files && files.length > 0) {
                    setFieldValue('timeSheetFile', null)
                    setFieldTouched('timeSheetFile')
                    setFieldValue('timeSheetFile', files[0])
                  }
                }}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

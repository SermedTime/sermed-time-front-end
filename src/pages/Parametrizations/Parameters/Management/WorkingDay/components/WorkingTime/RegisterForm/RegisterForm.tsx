import { Field, FieldArray, FieldProps, Form, Formik, getIn } from 'formik'

import { Col, Row } from 'react-bootstrap'
import { Skeleton } from '@/components/Core/Skeleton'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { timeMask } from '@/utils/masks'
import { Button } from '@/components/Core/Buttons/Button'

import { handleWeekDayName, weekDays } from './WorkingTime.helpers'
import { IWorkingTimeRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  initialValues: IWorkingTimeRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: IWorkingTimeRegisterForm) => void
}

export function RegisterWorkingTime({
  initialValues,
  onCancel,
  onSubmit,
  readOnly
}: Props) {
  if (!initialValues) {
    return (
      <>
        {weekDays.map(item => (
          <Row className="mb-4" key={item}>
            <Col xs={2}>
              <Paragraph size="sm">{item}</Paragraph>
            </Col>
            <Col>
              <Skeleton />
            </Col>
            <Col>
              <Skeleton />
            </Col>
            <Col>
              <Skeleton />
            </Col>
            <Col>
              <Skeleton />
            </Col>
            <Col>
              <Skeleton />
            </Col>
            <Col>
              <Skeleton />
            </Col>
          </Row>
        ))}
      </>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isValid, dirty }) => (
        <Form>
          <Row className="mb-5">
            <Col>
              <FieldArray
                name="workingTime"
                render={() => (
                  <div>
                    {values.workingTime &&
                      values.workingTime.length > 0 &&
                      values.workingTime.map((_, idx) => (
                        <Row key={idx} className="align-items-center mb-2">
                          <Col xs={2}>
                            <Paragraph size="sm">
                              {handleWeekDayName(idx + 1)}
                            </Paragraph>
                          </Col>

                          <Col>
                            <div className="d-flex align-items-center gap-2">
                              <Field name={`workingTime[${idx}].firstEntry`}>
                                {({ field, form }: FieldProps) => {
                                  const error = getIn(
                                    form.errors,
                                    `workingTime[${idx}].firstEntry`
                                  )

                                  const touched = getIn(
                                    form.touched,
                                    `workingTime[${idx}].firstEntry`
                                  )

                                  return (
                                    <InputText
                                      size="sm"
                                      {...field}
                                      name={`workingTime[${idx}].firstEntry`}
                                      maxLength={5}
                                      error={touched && !!error}
                                      helperText={
                                        touched && !!error ? error : ''
                                      }
                                      readOnly={readOnly}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        e.target.value = timeMask(
                                          e.target.value
                                        )

                                        setFieldValue(
                                          `workingTime[${idx}].firstEntry`,
                                          e.target.value
                                        )
                                      }}
                                    />
                                  )
                                }}
                              </Field>
                            </div>
                          </Col>

                          <Col>
                            <div className="d-flex align-items-center gap-2">
                              <Field name={`workingTime[${idx}].firstExit`}>
                                {({ field, form }: FieldProps) => {
                                  const error = getIn(
                                    form.errors,
                                    `workingTime[${idx}].firstExit`
                                  )

                                  const touched = getIn(
                                    form.touched,
                                    `workingTime[${idx}].firstExit`
                                  )

                                  return (
                                    <InputText
                                      size="sm"
                                      {...field}
                                      name={`workingTime[${idx}].firstExit`}
                                      maxLength={5}
                                      error={touched && !!error}
                                      helperText={
                                        touched && !!error ? error : ''
                                      }
                                      readOnly={readOnly}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        e.target.value = timeMask(
                                          e.target.value
                                        )

                                        setFieldValue(
                                          `workingTime[${idx}].firstExit`,
                                          e.target.value
                                        )
                                      }}
                                    />
                                  )
                                }}
                              </Field>
                            </div>
                          </Col>

                          <Col>
                            <div className="d-flex align-items-center gap-2">
                              <Field name={`workingTime[${idx}].secondEntry`}>
                                {({ field, form }: FieldProps) => {
                                  const error = getIn(
                                    form.errors,
                                    `workingTime[${idx}].secondEntry`
                                  )

                                  const touched = getIn(
                                    form.touched,
                                    `workingTime[${idx}].secondEntry`
                                  )

                                  return (
                                    <InputText
                                      size="sm"
                                      {...field}
                                      name={`workingTime[${idx}].secondEntry`}
                                      maxLength={5}
                                      error={touched && !!error}
                                      helperText={
                                        touched && !!error ? error : ''
                                      }
                                      readOnly={readOnly}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        e.target.value = timeMask(
                                          e.target.value
                                        )

                                        setFieldValue(
                                          `workingTime[${idx}].secondEntry`,
                                          e.target.value
                                        )
                                      }}
                                    />
                                  )
                                }}
                              </Field>
                            </div>
                          </Col>

                          <Col>
                            <div className="d-flex align-items-center gap-2">
                              <Field name={`workingTime[${idx}].secondExit`}>
                                {({ field, form }: FieldProps) => {
                                  const error = getIn(
                                    form.errors,
                                    `workingTime[${idx}].secondExit`
                                  )

                                  const touched = getIn(
                                    form.touched,
                                    `workingTime[${idx}].secondExit`
                                  )

                                  return (
                                    <InputText
                                      size="sm"
                                      {...field}
                                      name={`workingTime[${idx}].secondExit`}
                                      maxLength={5}
                                      error={touched && !!error}
                                      helperText={
                                        touched && !!error ? error : ''
                                      }
                                      readOnly={readOnly}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        e.target.value = timeMask(
                                          e.target.value
                                        )

                                        setFieldValue(
                                          `workingTime[${idx}].secondExit`,
                                          e.target.value
                                        )
                                      }}
                                    />
                                  )
                                }}
                              </Field>
                            </div>
                          </Col>

                          <Col>
                            <div className="d-flex align-items-center gap-2">
                              <Field name={`workingTime[${idx}].thirdEntry`}>
                                {({ field, form }: FieldProps) => {
                                  const error = getIn(
                                    form.errors,
                                    `workingTime[${idx}].thirdEntry`
                                  )

                                  const touched = getIn(
                                    form.touched,
                                    `workingTime[${idx}].thirdEntry`
                                  )

                                  return (
                                    <InputText
                                      size="sm"
                                      {...field}
                                      name={`workingTime[${idx}].thirdEntry`}
                                      maxLength={5}
                                      error={touched && !!error}
                                      helperText={
                                        touched && !!error ? error : ''
                                      }
                                      readOnly={readOnly}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        e.target.value = timeMask(
                                          e.target.value
                                        )

                                        setFieldValue(
                                          `workingTime[${idx}].thirdEntry`,
                                          e.target.value
                                        )
                                      }}
                                    />
                                  )
                                }}
                              </Field>
                            </div>
                          </Col>

                          <Col>
                            <div className="d-flex align-items-center gap-2">
                              <Field name={`workingTime[${idx}].thirdExit`}>
                                {({ field, form }: FieldProps) => {
                                  const error = getIn(
                                    form.errors,
                                    `workingTime[${idx}].thirdExit`
                                  )

                                  const touched = getIn(
                                    form.touched,
                                    `workingTime[${idx}].thirdExit`
                                  )

                                  return (
                                    <InputText
                                      size="sm"
                                      {...field}
                                      name={`workingTime[${idx}].thirdExit`}
                                      maxLength={5}
                                      error={touched && !!error}
                                      helperText={
                                        touched && !!error ? error : ''
                                      }
                                      readOnly={readOnly}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        e.target.value = timeMask(
                                          e.target.value
                                        )

                                        setFieldValue(
                                          `workingTime[${idx}].thirdExit`,
                                          e.target.value
                                        )
                                      }}
                                    />
                                  )
                                }}
                              </Field>
                            </div>
                          </Col>
                        </Row>
                      ))}
                  </div>
                )}
              />
            </Col>
          </Row>

          {!readOnly && (
            <Row className="justify-content-end">
              <Col xs="auto">
                <Row>
                  <Col xs="auto">
                    <Button
                      type="button"
                      styles="tertiary"
                      onClick={() => onCancel(false)}
                    >
                      Cancelar
                    </Button>
                  </Col>

                  <Col xs="auto">
                    <Button
                      type="submit"
                      styles="primary"
                      disabled={!dirty || !isValid}
                    >
                      Salvar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Form>
      )}
    </Formik>
  )
}

RegisterWorkingTime.defaultProps = {
  readOnly: undefined
}

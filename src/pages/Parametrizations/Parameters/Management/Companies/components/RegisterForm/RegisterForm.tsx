import { Col, Row } from 'react-bootstrap'

import { Field, Form, Formik } from 'formik'

import { useAlertContext } from '@/contexts/Alert'

import { cepMask, cnpjMask } from '@/utils/masks'

import { Skeleton } from '@/components/Core/Skeleton'
import { Switch } from '@/components/Core/Form/Fields/Switch'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { Select } from '@/components/Core/Form/Fields/Select'
import { UF_OPTIONS } from '@/constants/options/uf.options'
import { Button } from '@/components/Core/Buttons/Button'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { useState } from 'react'
import { useLoaderContext } from '@/contexts/Loader'
import { ViaCepService } from '@/services/via-cep'
import { useToastContext } from '@/contexts/Toast'
import { ICompanyRegisterForm, validationSchema } from './RegisterForm.form'

interface Props {
  mode: 'create' | 'edit'
  initialValues: ICompanyRegisterForm | null
  readOnly?: boolean
  onCancel: (hasChanges?: boolean) => void
  onSubmit: (formValues: ICompanyRegisterForm) => void
}

export function CompanyRegisterForm({
  mode,
  initialValues,
  readOnly,
  onCancel,
  onSubmit
}: Props) {
  const { addAlertOnCancel } = useAlertContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  const [cepSelected, setCepSelected] = useState(true)

  function handleOnCancel(hasChanges: boolean) {
    if (!hasChanges) {
      onCancel(false)
    } else {
      addAlertOnCancel(() => {
        onCancel(false)
      })
    }
  }

  async function checkZipCode(
    zipCode: string,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) {
    zipCode.replace(/\D/g, '')

    if (zipCode.length < 9) return

    try {
      showLoader()

      const response = await ViaCepService.fetchAddressByCep(zipCode)

      const { bairro, complemento, localidade, logradouro, uf } = response.data

      if (!response.data.localidade) {
        addToast({
          type: 'helper',
          title: 'Opss',
          description: 'Não Encontramos informação do CEP informado!'
        })

        setCepSelected(false)
        setFieldValue('streetName', '')
        setFieldValue('state', '')
        setFieldValue('neighborhood', '')
        setFieldValue('city', '')
        setFieldValue('complement', '')

        return
      }

      setCepSelected(true)
      setFieldValue('streetName', `${logradouro} ${complemento}`)
      setFieldValue('state', uf)
      setFieldValue('city', localidade)
      setFieldValue('neighborhood', bairro)
    } catch (error) {
      addToast({
        type: 'warning',
        title: 'Opss',
        description: 'Não Encontramos informação do CEP informado!'
      })

      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  if (!initialValues) {
    return (
      <>
        <Row className="mb-4">
          <Col xs={2}>
            <Skeleton />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xxl={6}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={6}>
            <Skeleton size="lg" />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={2}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={2}>
            <Skeleton size="lg" />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
          <Col xxl={4}>
            <Skeleton size="lg" />
          </Col>
        </Row>
      </>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        touched,
        errors,
        dirty,
        isValid,
        setFieldValue,
        setFieldTouched
      }) => (
        <Form>
          <Row className="mb-4">
            <Col xs="auto">
              <Field
                as={Switch}
                description="Ativo"
                name="status"
                checked={values.status === 'active'}
                readOnly={readOnly}
                disabled={mode === 'create'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { checked } = e.target

                  setFieldValue('status', checked ? 'active' : 'inactive')
                }}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={6}>
              <Field
                as={InputText}
                label="CNPJ"
                name="companyCnpj"
                placeholder="00.000.000/0000-00"
                type="text"
                error={touched.companyCnpj && !!errors.companyCnpj}
                helperText={
                  touched.companyCnpj && !!errors.companyCnpj
                    ? errors.companyCnpj
                    : ''
                }
                maxLength={18}
                readOnly={readOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = cnpjMask(e.target.value)

                  setFieldValue('companyCnpj', e.target.value)
                }}
              />
            </Col>

            <Col xl={6}>
              <Field
                as={InputText}
                label="Empresa"
                name="companyName"
                placeholder="Digite o nome da Empresa"
                type="text"
                error={touched.companyName && !!errors.companyName}
                helperText={
                  touched.companyName && !!errors.companyName
                    ? errors.companyName
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={2}>
              <Field
                as={InputText}
                label="CEP"
                name="zipCode"
                placeholder="00000-000"
                maxLength={9}
                type="text"
                error={touched.zipCode && !!errors.zipCode}
                helperText={
                  touched.zipCode && !!errors.zipCode ? errors.zipCode : ''
                }
                readOnly={readOnly}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = cepMask(e.target.value)
                  setFieldValue('zipCode', e.target.value)
                  checkZipCode(e.target.value, setFieldValue)
                }}
              />
            </Col>

            <Col xl={5}>
              <Field
                as={InputText}
                label="Endereço"
                name="streetName"
                placeholder="Digite o nome da Rua"
                type="text"
                error={touched.streetName && !!errors.streetName}
                helperText={
                  touched.streetName && !!errors.streetName
                    ? errors.streetName
                    : ''
                }
                readOnly={readOnly || cepSelected}
              />
            </Col>

            <Col xl={2}>
              <Field
                as={InputText}
                label="Número"
                name="streetNumber"
                placeholder="Digite o número"
                type="text"
                error={touched.streetNumber && !!errors.streetNumber}
                helperText={
                  touched.streetNumber && !!errors.streetNumber
                    ? errors.streetNumber
                    : ''
                }
                readOnly={readOnly}
              />
            </Col>

            <Col xl={3}>
              <Field
                as={InputText}
                label="Complemento"
                name="complement"
                placeholder="Apto, Bloco, Casa, etc..."
                type="text"
                error={touched.complement && !!errors.complement}
                helperText={
                  touched.complement && !!errors.complement
                    ? errors.complement
                    : ''
                }
                maxLength={16}
                readOnly={readOnly}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xl={4}>
              <Field
                as={InputText}
                label="Bairro"
                name="neighborhood"
                placeholder="Digite o nome do Bairro"
                type="text"
                error={touched.neighborhood && !!errors.neighborhood}
                helperText={
                  touched.neighborhood && !!errors.neighborhood
                    ? errors.neighborhood
                    : ''
                }
                readOnly={readOnly || cepSelected}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={InputText}
                label="Cidade"
                name="city"
                placeholder="Digite o nome da Cidade"
                type="text"
                error={touched.city && !!errors.city}
                helperText={touched.city && !!errors.city ? errors.city : ''}
                readOnly={readOnly || cepSelected}
              />
            </Col>

            <Col xl={4}>
              <Field
                as={Select}
                label="UF"
                name="state"
                placeholder="Selecione um UF"
                value={values.state}
                options={UF_OPTIONS}
                error={touched.state && !!errors.state}
                helperText={touched.state && !!errors.state ? errors.state : ''}
                onChange={({ value }: IOption) => {
                  setFieldTouched('state')
                  setFieldValue('state', value)
                }}
                readOnly={readOnly || cepSelected}
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
                      onClick={() => handleOnCancel(dirty)}
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
                      {mode === 'create' ? 'Cadastrar' : 'Salvar'}
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

CompanyRegisterForm.defaultProps = {
  readOnly: undefined
}

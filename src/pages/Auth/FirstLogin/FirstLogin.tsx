import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import BackgroundImage from '@/assets/images/login-images/background.png'
import Logo from '@/assets/images/login-images/logo.png'

import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Heading } from '@/components/Core/Typography/Heading'
import { Button } from '@/components/Core/Buttons/Button'

import { ROUTE_LOGIN } from '@/routes/Pages/Auth/Auth.paths'
import { TITLE_RECOVER_PASSWORD } from '@/constants/title.browser'

import { Field, Form, Formik } from 'formik'
import { post } from '@/services/api/sermed-api/sermed-api'
import { InputText } from '@/components/Core/Form/Fields/InputText'
import { useAuthContext } from '@/contexts/Auth'
import { SubmitButton } from '../components/SubmitButton'

import * as S from '../Auth.styles'
import {
  IChangePasswordForm,
  initialValuesSchema,
  validationSchema
} from './FirstLogin.form'

export function FirstLogin() {
  const { signOut } = useAuthContext()
  const navigate = useNavigate()

  const { showLoader, hideLoader } = useLoaderContext()
  const { handleApiRejection, addToast } = useToastContext()

  useEffect(() => {
    document.title = TITLE_RECOVER_PASSWORD
  }, [])

  async function handleOnSubmit(formValues: IChangePasswordForm) {
    try {
      showLoader()

      const params = {
        newPassword: formValues.newPassword,
        currentPassword: formValues.currentPassword
      }

      const { data } = await post(`/password/change`, params)

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Sua senha foi alterada com sucesso!'
        })

        signOut()
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    <AnimatedPage>
      <S.MainContainer>
        <S.Wrapper>
          <img src={BackgroundImage} alt="background img" />
        </S.Wrapper>
        <S.LoginContainer>
          <S.FormBox>
            <Container>
              <Row className="pb-xl-0 pb-xxl-3">
                <Col>
                  <img src={Logo} alt="Logo Sermed" />
                </Col>
              </Row>

              <Row className="my-xl-3 my-xxl-333">
                <Col className="pt-xl-3 pt-xxl-333">
                  <Heading size="xl" className="mb-333">
                    <p>Cadastre sua</p>
                    <p>nova Senha</p>
                  </Heading>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Formik
                    validateOnMount
                    initialValues={initialValuesSchema}
                    validationSchema={validationSchema}
                    onSubmit={values => handleOnSubmit(values)}
                  >
                    {({ touched, errors, dirty, isValid }) => (
                      <Form>
                        <Row className="mb-4">
                          <Col xs={12}>
                            <Field
                              as={InputText}
                              label="Senha Atual"
                              name="currentPassword"
                              placeholder="Insira a sua senha atual"
                              type="password"
                              error={
                                touched.currentPassword &&
                                !!errors.currentPassword
                              }
                              helperText={
                                touched.currentPassword &&
                                !!errors.currentPassword
                                  ? errors.currentPassword
                                  : ''
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-4">
                          <Col xs={12}>
                            <Field
                              as={InputText}
                              label="Nova Senha"
                              name="newPassword"
                              placeholder="Insira a sua nova senha"
                              type="password"
                              error={
                                touched.newPassword && !!errors.newPassword
                              }
                              helperText={
                                touched.newPassword && !!errors.newPassword
                                  ? errors.newPassword
                                  : ''
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mb-4">
                          <Col xs={12}>
                            <Field
                              as={InputText}
                              label="Confirmar Nova Senha"
                              name="newPasswordConfirmation"
                              placeholder="Confirme a sua nova senha"
                              type="password"
                              error={
                                touched.newPasswordConfirmation &&
                                !!errors.newPasswordConfirmation
                              }
                              helperText={
                                touched.newPasswordConfirmation &&
                                !!errors.newPasswordConfirmation
                                  ? errors.newPasswordConfirmation
                                  : ''
                              }
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <SubmitButton
                              text="Enviar"
                              disabled={!dirty || !isValid}
                            />
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>

              <Row className="justify-content-center mt-xl-3 mt-xxl-3">
                <Col xs="auto">
                  <Button
                    styles="secondary"
                    onClick={() => {
                      signOut()
                      navigate(ROUTE_LOGIN)
                    }}
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </Container>
          </S.FormBox>
        </S.LoginContainer>
      </S.MainContainer>
    </AnimatedPage>
  )
}

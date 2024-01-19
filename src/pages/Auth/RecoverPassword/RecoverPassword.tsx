import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import BackgroundImage from '@/assets/images/login-images/background.png'
import Logo from '@/assets/images/login-images/logo.png'

import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Heading } from '@/components/Core/Typography/Heading'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Button } from '@/components/Core/Buttons/Button'

import { ROUTE_LOGIN } from '@/routes/Pages/Auth/Auth.paths'
import { TITLE_RECOVER_PASSWORD } from '@/constants/title.browser'

import { Field, Form, Formik } from 'formik'
import { post } from '@/services/api/sermed-api/sermed-api'
import { SubmitButton } from '../components/SubmitButton'
import { Input } from '../components/Input'

import * as S from '../Auth.styles'

import {
  IRecoverPasswordForm,
  initialValue,
  validationSchema
} from './RecoverPassword.form'

export function RecoverPassword() {
  const navigate = useNavigate()

  const { showLoader, hideLoader } = useLoaderContext()
  const { handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_RECOVER_PASSWORD
  }, [])

  async function handleOnSubmit(formValues: IRecoverPasswordForm) {
    try {
      showLoader()

      const { data } = await post('/password/recover_password', formValues)

      if (data) {
        navigate(ROUTE_LOGIN)
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
              <Row className="pb-xl-0 pb-xxl-5">
                <Col>
                  <img src={Logo} alt="Logo Sermed" />
                </Col>
              </Row>

              <Row className="my-xl-3 my-xxl-5">
                <Col className="pt-xl-3 pt-xxl-5">
                  <Heading size="xl" className="mb-4">
                    <p>Recuperar</p>
                    <p>Senha</p>
                  </Heading>

                  <Paragraph size="lg">
                    Insira o e-mail associado à sua conta e enviaremos um e-mail
                    com instruções para recuperar sua senha.
                  </Paragraph>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Formik
                    validateOnMount
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={values => handleOnSubmit(values)}
                  >
                    {({ touched, errors, dirty, isValid }) => (
                      <Form>
                        <Row className="mb-4">
                          <Col>
                            <Field
                              as={Input}
                              label="E-mail"
                              name="email"
                              type="email"
                              error={touched.email && !!errors.email}
                              helperText={
                                touched.email && !!errors.email
                                  ? errors.email
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

              <Row className="justify-content-center mt-xl-4 mt-xxl-5">
                <Col xs="auto">
                  <Button
                    styles="tertiary"
                    onClick={() => navigate(ROUTE_LOGIN)}
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

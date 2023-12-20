import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { Field, Form, Formik, FormikHelpers } from 'formik'

import { useZoomDetection } from '@/hooks/utils/useZoomDetection'
import { useAuthContext } from '@/contexts/Auth'

import BackgroundImage from '@/assets/images/login-images/background.png'
import Logo from '@/assets/images/login-images/logo.png'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'

import { Heading } from '@/components/Core/Typography/Heading'
import { ButtonLink } from '@/components/Core/Buttons/ButtonLink'
import { Paragraph } from '@/components/Core/Typography/Paragraph'
import { Checkbox } from '@/components/Core/Form/Fields/Checkbox'

import { TITLE_LOGIN } from '@/constants/title.browser'

import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { SubmitButton } from '../components/SubmitButton'
import { Input } from '../components/Input'
import { ILoginForm, initialValuesSchema, validationSchema } from './Login.form'

import * as S from '../Auth.styles'

export function Login() {
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const { signIn } = useAuthContext()

  const { zoomLevel } = useZoomDetection()

  function handleOnZoomDetectionClass() {
    if (zoomLevel === 1.25) return 'pb-xl-0 pb-xxl-1'

    return 'pb-xl-0 pb-xxl-5'
  }

  useEffect(() => {
    document.title = TITLE_LOGIN
  }, [])

  async function handleOnSubmit(
    formValues: ILoginForm,
    formikHelpers: FormikHelpers<ILoginForm>
  ) {
    const authenticated = await signIn({
      username: formValues.email,
      password: formValues.password
    })

    if (authenticated) {
      navigate(
        searchParams.get('redirect')
          ? String(searchParams.get('redirect'))
          : ROUTE_HOME
      )
    } else if (!authenticated) {
      formikHelpers.setFieldError('password', 'Senha incorreta')
      formikHelpers.setFieldError('email', 'E-mail incorreto')
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
              <Row className={handleOnZoomDetectionClass()}>
                <Col>
                  <img src={Logo} alt="Logo Sermed" />
                </Col>
              </Row>

              <Row
                className={handleOnZoomDetectionClass()} /* className="my-xl-4 my-xxl-5" */
              >
                <Col className="pt-xl-2 pt-xxl-4">
                  <Heading size="xl">Login</Heading>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Formik
                    validateOnMount
                    initialValues={initialValuesSchema}
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => {
                      handleOnSubmit(values, helpers)
                    }}
                  >
                    {({ values, touched, errors, isValid }) => (
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

                        <Row className="mb-4">
                          <Col>
                            <Field
                              as={Input}
                              label="Insira sua senha"
                              name="password"
                              type="password"
                              error={touched.password && !!errors.password}
                              helperText={
                                touched.password && !!errors.password
                                  ? errors.password
                                  : ''
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="justify-content-between mb-4">
                          <Col xs="auto">
                            <Field
                              as={Checkbox}
                              description="Manter Conectado"
                              name="keepConnected"
                              checked={values.keepConnected}
                            />
                          </Col>

                          <Col xs="auto">
                            <ButtonLink route="https://www.google.com.br">
                              Recuperar Senha
                            </ButtonLink>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <SubmitButton text="Login" disabled={!isValid} />
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Container>
            <Row className="justify-content-center mt-xxl-4">
              <Col xs="auto">
                <Paragraph size="sm">
                  {'Desenvolvido por '}
                  <ButtonLink
                    externalLink={true}
                    route="https://www.bilgi.com.br"
                  >
                    Bilgi Serviços inteligentes
                  </ButtonLink>
                </Paragraph>
              </Col>
            </Row>
          </S.FormBox>
        </S.LoginContainer>
      </S.MainContainer>
    </AnimatedPage>
  )
}

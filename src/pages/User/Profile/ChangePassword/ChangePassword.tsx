import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import { Formik, Form, Field } from 'formik'

import { useAuthContext } from '@/contexts/Auth'
import { useAlertContext } from '@/contexts/Alert'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { TITLE_USER_CHANGE_PASSWORD } from '@/constants/title.browser'
import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'
import { ROUTE_USER_PROFILE } from '@/routes/Pages/User/User.paths'

import { post } from '@/services/api/sermed-api/sermed-api'

import { InputText } from '@/components/Core/Form/Fields/InputText'
import { Button } from '@/components/Core/Buttons/Button'
import { WidgetPaycheck } from '@/components/Rules/Users/Widgets/Paycheck'
import {
  IChangePasswordForm,
  initialValuesSchema,
  validationSchema
} from './ChangePassword.form'
import { Wrapper } from '../components/Wrapper'

export function UserChangePassword() {
  const navigate = useNavigate()

  const { user } = useAuthContext()
  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()
  const { addAlertOnCancel } = useAlertContext()

  useEffect(() => {
    document.title = TITLE_USER_CHANGE_PASSWORD

    setPageHeading('Alterar Senha')

    setPageBreadcrumb([
      {
        text: 'Home',
        route: ROUTE_HOME
      },
      {
        text: 'Perfil do Usuário',
        route: ROUTE_USER_PROFILE
      },
      {
        text: 'Alterar Senha'
      }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  function handleOnCancel(hasChanges: boolean) {
    if (!hasChanges) {
      navigate(ROUTE_USER_PROFILE)
    } else {
      addAlertOnCancel(() => {
        navigate(ROUTE_USER_PROFILE)
      })
    }
  }

  async function handleOnSubmit(formValues: IChangePasswordForm) {
    try {
      showLoader()

      const params = {
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword
      }

      const { data } = await post('/password/change', params)

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Sua senha foi alterada.'
        })

        navigate(ROUTE_USER_PROFILE)
      } else {
        addToast({
          type: 'helper',
          title: 'Ooops',
          description: data.message
        })
      }
    } catch {
      handleApiRejection()
    } finally {
      hideLoader()
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={user ? 9 : 12} xxl={user ? 10 : 12}>
          <Wrapper>
            <Formik
              validateOnMount
              initialValues={initialValuesSchema}
              validationSchema={validationSchema}
              onSubmit={values => handleOnSubmit(values)}
            >
              {({ touched, errors, dirty, isValid }) => (
                <Form>
                  <Row className="mb-4">
                    <Col xs={4}>
                      <Field
                        as={InputText}
                        label="Senha Atual"
                        name="currentPassword"
                        placeholder="Insira a sua senha atual"
                        type="password"
                        error={
                          touched.currentPassword && !!errors.currentPassword
                        }
                        helperText={
                          touched.currentPassword && !!errors.currentPassword
                            ? errors.currentPassword
                            : ''
                        }
                      />
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={4}>
                      <Field
                        as={InputText}
                        label="Nova Senha"
                        name="newPassword"
                        placeholder="Insira a sua nova senha"
                        type="password"
                        error={touched.newPassword && !!errors.newPassword}
                        helperText={
                          touched.newPassword && !!errors.newPassword
                            ? errors.newPassword
                            : ''
                        }
                      />
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={4}>
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
                            Alterar senha
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </Col>

        {user ? (
          <Col lg={3} xxl={2}>
            <WidgetPaycheck />
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

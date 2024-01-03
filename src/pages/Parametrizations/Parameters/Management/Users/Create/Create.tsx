import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'

import { TITLE_USERS_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { ROUTE_MANAGEMENT_USERS_LIST } from '@/routes/Pages/Parametrizations/Management/Management.paths'

import { post } from '@/services/api/sermed-api/sermed-api'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { IUserRegisterForm } from '../components/RegisterForm/RegisterForm.form'
import { UserRegisterForm } from '../components/RegisterForm'

export function CreateUser() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_USERS_PARAMETERIZATIONS

    setPageHeading('Usuários')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Usuários' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  async function handleOnSubmit(formValues: IUserRegisterForm) {
    try {
      console.log(formValues)

      showLoader()

      const { data, message } = await post('parametrizations/users', formValues)

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `O Usuário ${formValues.socialName} foi cadastrado com sucesso!`
        })

        navigate(ROUTE_MANAGEMENT_USERS_LIST)
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
    <AnimatedPage>
      <Container>
        <Row>
          <Col lg={9} xxl={12}>
            <Section>
              <div className="d-flex align-items-center gap-2 mb-4">
                <Icon icon="post_add" />

                <Subtitle size="sm">Novo Usuário</Subtitle>
              </div>

              <Row className="justify-content-center">
                <Col xs={11}>
                  <UserRegisterForm
                    mode="create"
                    initialValues={{
                      cpf: '',
                      name: '',
                      socialName: '',
                      email: '',
                      payrollNumber: '',
                      employeeCode: '',
                      pis: '',
                      ctps: '',
                      admissionDate: '',
                      resignationDate: '',
                      status: 'active'
                    }}
                    onCancel={() => navigate(-1)}
                    onSubmit={values => handleOnSubmit(values)}
                  />
                </Col>
              </Row>
            </Section>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

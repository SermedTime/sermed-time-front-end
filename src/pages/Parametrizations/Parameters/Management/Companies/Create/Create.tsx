import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { post } from '@/services/api/sermed-api/sermed-api'

import { TITLE_COMPANIES_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { ROUTE_MANAGEMENT_COMPANIES_LIST } from '@/routes/Pages/Parametrizations/Management/Management.paths'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { ICompanyRegisterForm } from '../components/RegisterForm/RegisterForm.form'
import { CompanyRegisterForm } from '../components/RegisterForm'

export function CreateCompany() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_COMPANIES_PARAMETERIZATIONS

    setPageHeading('Empresas')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Empresas' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  async function handleOnSubmit(formValues: ICompanyRegisterForm) {
    try {
      showLoader()

      const { data, message } = await post(
        '/parametrizations/companies',
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'A empresa foi cadastrada com sucesso!'
        })

        navigate(ROUTE_MANAGEMENT_COMPANIES_LIST)
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

                <Subtitle size="sm">Nova Equipe</Subtitle>
              </div>

              <Row className="justify-content-center">
                <Col xs={11}>
                  <CompanyRegisterForm
                    mode="create"
                    initialValues={{
                      companyName: '',
                      companyCnpj: '',
                      streetName: '',
                      streetNumber: '',
                      complement: '',
                      neighborhood: '',
                      city: '',
                      state: '',
                      zipCode: '',
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

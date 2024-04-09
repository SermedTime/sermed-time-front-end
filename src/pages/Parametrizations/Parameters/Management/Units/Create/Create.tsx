import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useHeaderContext } from '@/contexts/Layout/Header'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { post } from '@/services/api/sermed-api/sermed-api'

import { Col, Container, Row } from 'react-bootstrap'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Section } from '@/components/Core/Containers/Section'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Icon } from '@/components/Core/Icons/Icon'

import { TITLE_UNITS_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { ROUTE_MANAGEMENT_UNITS_LIST } from '@/routes/Pages/Parametrizations/Management/Management.paths'

import { IUnitRegisterForm } from '../components/RegisterForm/RegisterForm.form'
import { UnitRegisterForm } from '../components/RegisterForm'

export function CreateUnit() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_UNITS_PARAMETERIZATIONS

    setPageHeading('Unidades')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Unidades' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  async function handleOnSubmit(formValues: IUnitRegisterForm) {
    try {
      showLoader()

      const { data, message } = await post(
        '/parametrizations/units',
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'A unidade foi cadastrada com sucesso!'
        })

        navigate(ROUTE_MANAGEMENT_UNITS_LIST)
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

                <Subtitle size="sm">Nova Unidade</Subtitle>
              </div>

              <Row className="justify-content-center">
                <Col xs={11}>
                  <UnitRegisterForm
                    mode="create"
                    initialValues={{
                      name: '',
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

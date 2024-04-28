import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { post } from '@/services/api/sermed-api/sermed-api'

import { TITLE_WORKING_DAY_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { ROUTE_MANAGEMENT_WORKING_DAY_LIST } from '@/routes/Pages/Parametrizations/Management/Management.paths'

import { IWorkingDayRegisterForm } from '../components/RegisterForm/RegisterForm.form'
import { WorkingDayRegisterForm } from '../components/RegisterForm'

export function CreateWorkingDay() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_WORKING_DAY_PARAMETERIZATIONS

    setPageHeading('Jornadas de Trabalho')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Jornadas de Trabalho' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  async function handleOnSubmit(formValues: IWorkingDayRegisterForm) {
    try {
      showLoader()

      const { data, message } = await post(
        '/parametrizations/management/working-day',
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'A jornada de trabalho foi cadastrada com sucesso!'
        })

        navigate(ROUTE_MANAGEMENT_WORKING_DAY_LIST)
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

                <Subtitle size="sm">Nova Jornada de Trabalho</Subtitle>
              </div>

              <Row className="justify-content-center">
                <Col xs={11}>
                  <WorkingDayRegisterForm
                    mode="create"
                    initialValues={{
                      workingDayName: '',
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

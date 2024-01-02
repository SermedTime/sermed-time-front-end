import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'

import { post } from '@/services/api/sermed-api/sermed-api'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { TITLE_TIME_CLOCK_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_MANAGEMENT_TIME_CLOCK_LIST } from '@/routes/Pages/Parametrizations/Management/Management.paths'

import { ClockTimeRegisterForm } from '../components/RegisterForm/RegisterForm'
import { IClockTimeRegisterForm } from '../components/RegisterForm/RegisterForm.form'

export function CreateCompany() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_TIME_CLOCK_PARAMETERIZATIONS

    setPageHeading('Relógios de Ponto')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Relógios de Ponto' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  async function handleOnSubmit(formValues: IClockTimeRegisterForm) {
    try {
      showLoader()

      const { data, message } = await post(
        'parametrizations/time-clock',
        formValues
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'O Relógio foi cadastrado com sucesso!'
        })

        navigate(ROUTE_MANAGEMENT_TIME_CLOCK_LIST)
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

                <Subtitle size="sm">Novo Relógio de Ponto</Subtitle>
              </div>

              <Row className="justify-content-center">
                <Col xs={11}>
                  <ClockTimeRegisterForm
                    mode="create"
                    initialValues={{
                      city: '', //
                      clock_ip: '', //
                      manufacturer: '',
                      model: '',
                      name: '', //
                      sector: '', //
                      state: '', //
                      status: 'active', //
                      unit: '' //
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

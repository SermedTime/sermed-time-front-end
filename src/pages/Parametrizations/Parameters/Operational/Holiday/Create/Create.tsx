import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { post } from '@/services/api/sermed-api/sermed-api'

import { TITLE_HOLIDAY_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Section } from '@/components/Core/Containers/Section'

import { ROUTE_OPERATIONAL_HOLIDAY_LIST } from '@/routes/Pages/Parametrizations/Operational/Operational.paths'
import { removeEmptyEntries } from '@/utils/generic'
import { HolidayRegisterForm } from '../components/RegisterForm'
import { IHolidayRegisterForm } from '../components/RegisterForm/RegisterForm.form'

export function CreateHoliday() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_HOLIDAY_PARAMETERIZATIONS

    setPageHeading('Feriados')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Operacionais' },
      { text: 'Feriados' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  async function handleOnSubmit(formValues: IHolidayRegisterForm) {
    try {
      showLoader()

      const { data, message } = await post(
        '/parametrizations/operational/holiday',
        removeEmptyEntries(formValues)
      )

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'O feriado foi cadastrado com sucesso!'
        })

        navigate(ROUTE_OPERATIONAL_HOLIDAY_LIST)
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

                <Subtitle size="sm">Novo Feriado</Subtitle>
              </div>

              <Row className="justify-content-center">
                <Col xs={11}>
                  <HolidayRegisterForm
                    mode="create"
                    initialValues={{
                      description: '',
                      date: null,
                      holidayType: 'N',
                      state: '',
                      city: ''
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

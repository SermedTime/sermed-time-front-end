import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useLoaderContext } from '@/contexts/Loader'
import { useToastContext } from '@/contexts/Toast'

import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { ROUTE_MANAGEMENT_TEAMS_LIST } from '@/routes/Pages/Parametrizations/Management/Management.paths'

import { TITLE_TEAMS_PARAMETERIZATIONS } from '@/constants/title.browser'

import { post } from '@/services/api/sermed-api/sermed-api'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

import { ITeamRegisterForm } from '../components/RegisterForm/RegisterForm.form'
import { TeamsRegisterForm } from '../components/RegisterForm'

export function CreateTeam() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()
  const { showLoader, hideLoader } = useLoaderContext()
  const { addToast, handleApiRejection } = useToastContext()

  useEffect(() => {
    document.title = TITLE_TEAMS_PARAMETERIZATIONS

    setPageHeading('Equipes')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Equipes' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  async function handleOnSubmit(formValues: ITeamRegisterForm) {
    try {
      showLoader()

      const { data, message } = await post('/parametrizations/team', formValues)

      if (data) {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'A equipe foi cadastrada com sucesso!'
        })

        navigate(ROUTE_MANAGEMENT_TEAMS_LIST)
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
                  <TeamsRegisterForm
                    mode="create"
                    initialValues={{
                      name: '',
                      status: 'active',
                      unit: ''
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

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'

import { TITLE_WORKING_DAY_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { Icon } from '@/components/Core/Icons/Icon'
import { Subtitle } from '@/components/Core/Typography/Subtitle'

export function CreateWorkingDay() {
  const navigate = useNavigate()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  useEffect(() => {
    document.title = TITLE_WORKING_DAY_PARAMETERIZATIONS

    setPageHeading('Jornadas de Trabalho')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Jornadas de Trabalho' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

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
                  {/* <UnitRegisterForm
                    mode="create"
                    initialValues={{
                      unitName: '',
                      status: 'active'
                    }}
                    onCancel={() => navigate(-1)}
                    onSubmit={values => handleOnSubmit(values)}
                  /> */}
                  <p>Formulário</p>
                </Col>
              </Row>
            </Section>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

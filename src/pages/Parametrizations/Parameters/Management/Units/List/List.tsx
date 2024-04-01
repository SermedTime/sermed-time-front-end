import { useEffect, useState } from 'react'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { TITLE_UNITS_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_PARAMETERIZATIONS } from '@/routes/Pages/Parametrizations/Parametrizations.paths'
import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { ParametersSearchForm } from '../../../components/SearchForm'

export function ListUnits() {
  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  const [loaded, setLoaded] = useState(false)

  const SEARCH_OPTIONS: IOption[] = [
    {
      value: 'name',
      label: 'Nome da Unidade'
    }
  ]

  useEffect(() => {
    document.title = TITLE_UNITS_PARAMETERIZATIONS

    setPageHeading('Unidades')

    setPageBreadcrumb([
      { text: 'Parametrizações', route: ROUTE_PARAMETERIZATIONS },
      { text: 'Gerenciais' },
      { text: 'Unidades' }
    ])

    setLoaded(true)
  }, [setPageHeading, setPageBreadcrumb])

  return (
    <AnimatedPage>
      <Container>
        <Row>
          <Col lg={9} xxl={10}>
            <Section>
              <Row className="mb-2">
                <Col>
                  <ParametersSearchForm options={SEARCH_OPTIONS} />
                </Col>
              </Row>
            </Section>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

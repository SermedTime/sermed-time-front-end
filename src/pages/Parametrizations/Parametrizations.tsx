import { useEffect, useState } from 'react'

import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useAuthRoles } from '@/hooks/services/Rules/Auth/useRoles'

import { TITLE_PARAMETERIZATIONS } from '@/constants/title.browser'
import { ROUTE_HOME } from '@/routes/Pages/Pages.paths'

import { AnimatedPage } from '@/components/Layout/AnimatedPage'
import { Col, Container, Row } from 'react-bootstrap'
import { Section } from '@/components/Core/Containers/Section'
import { v4 } from 'uuid'
import { Accordion } from '@/components/Core/Accordion'
import { Subtitle } from '@/components/Core/Typography/Subtitle'
import { Skeleton } from '@/components/Core/Skeleton'
import { EmptyResult } from '@/components/Core/EmptyResult'

import { IParametrizationsSearchForm } from './components/SearchForm/SearchForm.form'
import { IParameterList } from './Parametrizations.interface'
import { ParametrizationsSearchForm } from './components/SearchForm'
import { Card } from './components/Card'
import { initialParameterList } from './Parametrizations.form'

export function Parametrizations() {
  const { hasParametrizationsWriter } = useAuthRoles()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  const [parameters, setParameters] = useState<IParameterList[] | null>(null)
  const [list, setList] = useState<IParameterList[]>([])

  const [filterExists, setFilterExists] = useState<boolean>(true)

  useEffect(() => {
    document.title = TITLE_PARAMETERIZATIONS

    setPageHeading('Parametrizações')

    setPageBreadcrumb([
      { text: 'Home', route: ROUTE_HOME },
      { text: 'Parametrizações' }
    ])
  }, [setPageHeading, setPageBreadcrumb])

  useEffect(() => {
    setParameters(initialParameterList)
    setList(initialParameterList)
  }, [])

  function handleOnSubmit(formValues: IParametrizationsSearchForm) {
    if (!parameters) return

    if (formValues.search === '' && formValues.parameter === '') {
      setList(parameters)

      return
    }

    const filteredParameters: IParameterList[] = []

    parameters.forEach(parameter => {
      if (formValues.search) {
        if (
          parameter.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              formValues.search
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            )
        ) {
          filteredParameters.push(parameter)

          return
        }

        const filteredItems = parameter.items.filter(item =>
          item.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              formValues.search
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            )
        )

        if (filteredItems.length > 0) {
          filteredParameters.push({ ...parameter, ...filteredItems })
        }

        return
      }

      if (formValues.parameter) {
        const filteredItem = parameter.items.find(
          item => item.title === formValues.parameter
        )

        if (filteredItem) {
          filteredParameters.push({ ...parameter, items: [filteredItem] })
        }
      }
    })

    setList(filteredParameters || [])

    if (parameters && list.length === 0) setFilterExists(false)
  }

  if (!parameters) return null

  return (
    <AnimatedPage>
      <Container>
        <Row>
          <Col lg={9} xxl={12}>
            <Section>
              <Row className="mb-5">
                <Col>
                  <ParametrizationsSearchForm
                    onSubmit={values => handleOnSubmit(values)}
                  />
                </Col>
              </Row>

              <Row className="justify-content-center">
                {filterExists ? (
                  <Col xs={11}>
                    {list.length > 0 ? (
                      list.map(parameter => (
                        <Row key={v4()} className="mb-4">
                          <Col>
                            <Accordion
                              heading={
                                <Subtitle size="sm">{parameter.title}</Subtitle>
                              }
                              description={parameter.description}
                            >
                              <Row className="pt-2">
                                {parameter.items.map(item => (
                                  <Col key={v4()} xs={4} className="mt-3">
                                    <Card
                                      icon={item.icon}
                                      title={item.title}
                                      routeToList={item.routeToList}
                                      routeToAdd={
                                        item.routeToAdd
                                          ? {
                                              title: item.routeToAdd,
                                              disabled:
                                                !hasParametrizationsWriter()
                                            }
                                          : undefined
                                      }
                                    />
                                  </Col>
                                ))}
                              </Row>
                            </Accordion>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <EmptyResult />
                    )}
                  </Col>
                ) : (
                  <Col xs={11}>
                    <Skeleton size="lg" />
                    <Skeleton size="lg" />
                    <Skeleton size="lg" />
                    <Skeleton size="lg" />
                  </Col>
                )}
              </Row>
            </Section>
          </Col>
        </Row>
      </Container>
    </AnimatedPage>
  )
}

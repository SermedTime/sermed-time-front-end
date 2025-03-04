import { Col, Row } from 'react-bootstrap'

import { Section } from '@/components/Core/Containers/Section'

import { Caption } from '@/components/Core/Typography/Caption'
import { IconShape } from '@/components/Core/Icons/IconShape'
import { Icon } from '@/components/Core/Icons/Icon'
import { usePageViewContext } from '@/pages/TimeSheet/UserTimeSheet/context/PageView'
import {
  Wrapper,
  Container,
  Menu,
  Item,
  CircleBox,
  LightCircle,
  BoldCircle
} from './WidgetMenu.styles'

interface NavItem {
  icon: string
  label: string
  view: 'summary' | 'payslips' | 'benefits'
}

const nav: NavItem[] = [
  {
    icon: 'description',
    label: 'Resumo',
    view: 'summary'
  },
  {
    icon: 'payments',
    label: 'Holerites',
    view: 'payslips'
  },
  {
    icon: '360',
    label: 'Anuais',
    view: 'benefits'
  }
]

export function WidgetMenu() {
  const { setView, view } = usePageViewContext()

  return (
    <Section size="sm">
      <Row className="mb-1">
        <Col>
          <Wrapper>
            <Container>
              <CircleBox>
                <Menu>
                  {nav.map((item, idx) => (
                    <Item
                      key={idx}
                      active={!!item.view}
                      onClick={() => setView(item.view)}
                    >
                      <Caption
                        fontWeigth={item.view === view ? 'bold' : undefined}
                        size="lg"
                      >
                        {item.label}
                      </Caption>

                      <IconShape
                        mode={item.view === view ? 'success' : undefined}
                      >
                        <Icon size="sm" icon={item.icon} />
                      </IconShape>
                    </Item>
                  ))}
                </Menu>

                <LightCircle>
                  <BoldCircle />
                </LightCircle>
              </CircleBox>
            </Container>
          </Wrapper>
        </Col>
      </Row>
    </Section>
  )
}

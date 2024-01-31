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
    icon: '360',
    label: 'Resumo',
    view: 'summary'
  },
  {
    icon: 'bar_chart',
    label: 'Holerite',
    view: 'payslips'
  },
  {
    icon: 'attach_money',
    label: 'Benefícios',
    view: 'benefits'
  }
]

export function WidgetMenu() {
  const { setView } = usePageViewContext()

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
                      <Caption size="lg">{item.label}</Caption>

                      <IconShape>
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

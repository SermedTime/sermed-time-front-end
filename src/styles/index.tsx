import GlobalStyle from './global'
import DesignSystem from './design-system'
import Amcharts from './libs/amcharts'
import Bootstrap from './libs/bootstrap'
import MaterialIcons from './libs/material-icons'
import ReactBigCalendar from './libs/react-big-calendar'
import ReactDatepicker from './libs/react-datepicker'
import ReactMultiCarousel from './libs/react-multi-carousel'
import ReactTooltip from './libs/react-tooltip'

export function Styles() {
  return (
    <>
      <GlobalStyle />
      <DesignSystem />
      <Bootstrap />
      <MaterialIcons />
      <Amcharts />
      <ReactBigCalendar />
      <ReactDatepicker />
      <ReactMultiCarousel />
      <ReactTooltip />
    </>
  )
}

import * as Yup from 'yup'

export interface IHolidayRegisterForm {
  uuid?: string
  date: Date | null
  description: string
  holidayType: 'N' | 'E' | 'M'
  state?: string
  city?: string
}

export const validationSchema = Yup.object().shape({
  date: Yup.string().required('Uma data é obrigatória'),
  description: Yup.string().required('Uma descrição é obrigatória'),
  holidayType: Yup.string()
    .required('Um tipo de feriado é obrigatório')
    .oneOf(['N', 'E', 'M']),
  state: Yup.string().when('holidayType', {
    is: (holidayType: string) => holidayType === 'M' || holidayType === 'E',
    then: Yup.string().required('Um estado é obrigatório'),
    otherwise: Yup.string().optional()
  }),
  city: Yup.string().when('holidayType', {
    is: (holidayType: string) => holidayType === 'M',
    then: Yup.string().required('Uma cidade é obrigatória'),
    otherwise: Yup.string().optional()
  })
})

import * as Yup from 'yup'

export interface ISheduleRegisterForm {
  shcedule_id?: string
  team_id: string
  user_id: string
  shift_id: string
  schedule_date: Date | string
}

export const validationSchema = Yup.object().shape({
  team_id: Yup.string().required('Campo obrigatório'),
  user_id: Yup.string().required('Campo obrigatório'),
  shift_id: Yup.string().required('Campo obrigatório'),
  schedule_date: Yup.string().required('Campo obrigatório')
})

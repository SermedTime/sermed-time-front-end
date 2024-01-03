import * as Yup from 'yup'

export interface IAssignTeamForm {
  team: string
  user: string
  isSupervisor: boolean
}

export const validationSchema = Yup.object().shape({
  team: Yup.string().required('Campo é obrigatório'),
  isSupervisor: Yup.boolean().required('Campo é obrigatório'),
  user: Yup.string().required('Campo é obrigatório')
})

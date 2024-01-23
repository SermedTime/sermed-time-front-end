import * as Yup from 'yup'

export interface IAssignTeamForm {
  team_id: string
  is_supervisor: 'active' | 'inactive'
}

export const validationSchema = Yup.object().shape({
  team_id: Yup.string().required('Campo é obrigatório'),
  is_supervisor: Yup.mixed().oneOf(['active', 'inactive']).required()
})

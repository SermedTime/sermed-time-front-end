import * as Yup from 'yup'

export interface ITeamRegisterForm {
  uuid?: string
  name: string
  unit: string
  status: string
}

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Um nome é obrigatório')
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(50, 'Digite no máximo 50 caracteres'),
  unit: Yup.string().required('Uma unidade é obrigatória'),
  status: Yup.string().required('Um status é obrigatório')
})

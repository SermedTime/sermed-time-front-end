import * as Yup from 'yup'

export interface IReproveHours {
  overtimeStatus: 'R'
  description: string
}

export const initialValues: IReproveHours = {
  overtimeStatus: 'R',
  description: ''
}

export const validationSchema = Yup.object().shape({
  overtimeStatus: Yup.string().required('Campo Obrigatório'),
  description: Yup.string()
    .required('Campo Obrigatório')
    .min(14, 'Digite no mínimo 14 caracteres')
    .max(128, 'Digite no máximo 128 caracteres')
})

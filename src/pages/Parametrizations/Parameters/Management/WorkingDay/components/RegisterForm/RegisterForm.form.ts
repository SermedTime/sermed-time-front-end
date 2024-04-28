import * as Yup from 'yup'

export interface IWorkingDayRegisterForm {
  uuid?: string
  workingDayName: string
  status: 'active' | 'inactive'
}

export const validationSchema = Yup.object().shape({
  workingDayName: Yup.string()
    .required('Um nome é obrigatório')
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(128, 'Digite no máximo 128 caracteres'),
  status: Yup.string()
    .required('Um status é obrigatório')
    .oneOf(['active', 'inactive'])
})

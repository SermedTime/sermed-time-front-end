import * as Yup from 'yup'

export interface ICompanyRegisterForm {
  uuid?: string
  status: string
  name: string
  cnpj: string
}

export const validationSchema = Yup.object().shape({
  status: Yup.string().required('Status is required'),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(50, 'Digite no máximo 50 caracteres'),
  cnpj: Yup.string()
    .required('CNPJ is required')
    .min(14, 'Digite no mínimo 14 caracteres')
    .max(50, 'Digite no máximo 14 caracteres')
})

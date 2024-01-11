import * as Yup from 'yup'

export interface ICompanyRegisterForm {
  uuid?: string
  companyName: string
  companyCnpj: string
  streetName: string
  streetNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  status: string
}

export const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Campo Obrigatório'),
  companyCnpj: Yup.string()
    .required('Campo Obrigatório')
    .min(18, 'Digite no mínimo 14 caracteres')
    .max(18, 'Digite no máximo 14 caracteres'),
  streetName: Yup.string().required('Campo Obrigatório'),
  streetNumber: Yup.string().required('Campo Obrigatório'),
  neighborhood: Yup.string().required('Campo Obrigatório'),
  city: Yup.string().required('Campo Obrigatório'),
  state: Yup.string().required('Campo Obrigatório'),
  zipCode: Yup.string()
    .required('Campo Obrigatório')
    .min(9, 'Digite no mínimo 8 caracteres')
    .max(9, 'Digite no máximo 8 caracteres'),
  status: Yup.string().required('Campo Obrigatório')
})

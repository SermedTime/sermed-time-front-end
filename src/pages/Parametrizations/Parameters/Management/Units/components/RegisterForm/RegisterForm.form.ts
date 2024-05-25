import * as Yup from 'yup'

export interface IUnitRegisterForm {
  uuid?: string
  unitName: string
  streetName: string
  streetNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  ibgeCode: string
  status: string
}

export const validationSchema = Yup.object().shape({
  unitName: Yup.string()
    .required('Um nome é obrigatório')
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(50, 'Digite no máximo 50 caracteres'),
  streetName: Yup.string().required('Campo Obrigatório'),
  streetNumber: Yup.string().required('Campo Obrigatório'),
  neighborhood: Yup.string().required('Campo Obrigatório'),
  city: Yup.string().required('Campo Obrigatório'),
  state: Yup.string().required('Campo Obrigatório'),
  ibgeCode: Yup.number().required('Campo Obrigatório'),
  zipCode: Yup.string()
    .required('Campo Obrigatório')
    .min(9, 'Digite no mínimo 8 caracteres')
    .max(9, 'Digite no máximo 8 caracteres'),
  status: Yup.string().required('Um status é obrigatório')
})

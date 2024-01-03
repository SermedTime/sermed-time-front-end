import { isEmailValid } from '@/utils/validations'
import * as Yup from 'yup'

export interface IUserRegisterForm {
  uuid?: string
  cpf: string
  name: string
  socialName: string
  email: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string
  resignationDate?: string
  status: string
}

export const validationSchema = Yup.object().shape({
  cpf: Yup.string()
    .required('Campo Obrigatório')
    .min(14, 'Digite no mínimo 14 caracteres')
    .max(14, 'Digite no máximo 14 caracteres'),
  email: Yup.string()
    .required('Campo Obrigatório')
    .test({
      name: 'isEmailValid',
      exclusive: true,
      message: 'Digite um e-mail válido',
      test: value => {
        return value ? isEmailValid(value) : true
      }
    }),
  name: Yup.string().required('Campo Obrigatório'),
  pis: Yup.string()
    .required('Campo Obrigatório')
    .min(11, 'Digite no mínimo 11 caracteres')
    .max(11, 'Digite no máximo 11 caracteres'),
  socialName: Yup.string().required('Campo Obrigatório'),
  status: Yup.string().required('Campo Obrigatório')
})

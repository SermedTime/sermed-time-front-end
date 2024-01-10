import { isEmailValid } from '@/utils/validations'
import * as Yup from 'yup'

export interface IUserRegisterForm {
  uuid?: string
  cpf: string
  name: string
  socialName: string
  email: string
  companyName: string
  companyCnpj: string
  position: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string | null
  resignationDate?: string | null
  status: string
}

export const validationSchema = Yup.object().shape({
  cpf: Yup.string()
    .required('Campo Obrigatório')
    .min(14, 'Digite no mínimo 14 caracteres')
    .max(14, 'Digite no máximo 14 caracteres'),
  name: Yup.string().required('Campo Obrigatório'),
  socialName: Yup.string().required('Campo Obrigatório'),
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
  companyName: Yup.string().required('Campo Obrigatório'),
  companyCnpj: Yup.string().required('Campo Obrigatório'),
  position: Yup.string().required('Campo Obrigatório'),
  payrollNumber: Yup.string()
    .required('Campo Obrigatório')
    .max(10, 'Digite no máximo 10 caracteres'),
  employeeCode: Yup.string()
    .required('Campo Obrigatório')
    .max(10, 'Digite no máximo 10 caracteres'),
  pis: Yup.string()
    .required('Campo Obrigatório')
    .min(11, 'Digite no mínimo 11 caracteres')
    .max(11, 'Digite no máximo 11 caracteres'),
  ctps: Yup.string()
    .required('Campo Obrigatório')
    .min(5, 'Digite no mínimo 5 caracteres')
    .max(5, 'Digite no máximo 5 caracteres'),
  status: Yup.string().required('Campo Obrigatório'),
  admissionDate: Yup.string()
    .required('Campo Obrigatório')
    .test({
      name: 'isDateValid',
      exclusive: true,
      message: 'A data não pode ser maior que a data atual',
      test: value => {
        const date = new Date()
        const admissionDate = new Date(value)

        return admissionDate <= date
      }
    })
})

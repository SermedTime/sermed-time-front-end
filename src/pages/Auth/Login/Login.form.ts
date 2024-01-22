import { isEmailValid } from '@/utils/validations'
import * as Yup from 'yup'

export interface ILoginForm {
  email: string
  password: string
  keepConnected: boolean
}

export const initialValuesSchema: ILoginForm = {
  email: 'admin@sermed.com.br',
  password: '123456789',
  keepConnected: true
}

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Campo obrigatório')
    .test({
      name: 'isEmailValid',
      exclusive: true,
      message: 'Digite um e-mail válido',
      test: value => {
        return value ? isEmailValid(value) : true
      }
    }),
  password: Yup.string().required('Campo obrigatório')
})

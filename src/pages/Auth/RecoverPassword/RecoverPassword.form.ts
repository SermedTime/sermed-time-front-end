import * as Yup from 'yup'

import { isEmailValid } from '@/utils/validations'

export interface IRecoverPasswordForm {
  email: string
}

export const initialValue: IRecoverPasswordForm = {
  email: ''
}

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Campo Obrigatório')
    .test({
      name: 'isEmailValid',
      exclusive: true,
      message: 'Digite um e-mail válido',
      test: value => {
        return value ? isEmailValid(value) : true
      }
    })
})

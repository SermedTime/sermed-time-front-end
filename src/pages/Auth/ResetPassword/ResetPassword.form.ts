import * as Yup from 'yup'

export interface IResetPasswordForm {
  newPassword: string
  newPasswordConfirmation: string
}

export const initialValuesSchema: IResetPasswordForm = {
  newPassword: '',
  newPasswordConfirmation: ''
}

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .test('areEqual', 'A nova senha deve ser diferente', function () {
      return this.parent.currentPassword !== this.parent.newPassword
    }),
  newPasswordConfirmation: Yup.string()
    .required('Campo obrigatório')
    .test('areEqual', 'A confirmação de senha não confere', function () {
      return this.parent.newPassword === this.parent.newPasswordConfirmation
    })
})

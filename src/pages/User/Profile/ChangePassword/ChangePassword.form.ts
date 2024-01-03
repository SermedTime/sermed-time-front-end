import * as Yup from 'yup'

export interface IChangePasswordForm {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export const initialValuesSchema: IChangePasswordForm = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: ''
}

export const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Campo obrigatório'),
  newPassword: Yup.string()
    .required('Campo obrigatório')
    .test('areEqual', 'A nova senha deve ser diferente', function () {
      return this.parent.currentPassword !== this.parent.newPassword
    }),
  newPasswordConfirmation: Yup.string()
    .required('Campo obrigatório')
    .test('areEqual', 'A confirmação de senha não confere', function () {
      return this.parent.newPassword === this.parent.newPasswordConfirmation
    })
})

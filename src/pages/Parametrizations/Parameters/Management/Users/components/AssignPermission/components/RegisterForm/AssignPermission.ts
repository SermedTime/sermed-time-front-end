import * as Yup from 'yup'

export interface IAssignPermissionForm {
  permission_id: string
  is_writer: 'active' | 'inactive'
}

export const validationSchema = Yup.object().shape({
  permission_id: Yup.string().required('Campo é obrigatório'),
  is_writer: Yup.mixed().oneOf(['active', 'inactive']).required()
})

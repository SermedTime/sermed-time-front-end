import * as Yup from 'yup'

export interface IUploadTimeSheet {
  timeSheetFile: File | null
}

export const initialValues: IUploadTimeSheet = {
  timeSheetFile: null
}

export const validationSchema = Yup.object().shape({
  timeSheetFile: Yup.mixed()
    .required('Arquivo obrigatório')
    .test(
      'fileType',
      'Somente arquivos .txt são permitidos',
      value => value && value.type === 'text/plain'
    )
})

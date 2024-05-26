import * as Yup from 'yup'

export interface IClockTimeRegisterForm {
  uuid?: string
  clock_ip: string
  manufacturer: string
  model: string
  name: string
  sector: string
  status: string
  unit: string
}

export const validationSchema = Yup.object().shape({
  status: Yup.string().required('Um Status é obrigatório'),
  clock_ip: Yup.string()
    .required('Um IP é obrigatório')
    .min(15, 'Digite no mínimo 15 caracteres')
    .max(15, 'Digite no máximo 15 caracteres'),
  name: Yup.string()
    .required('Um Modelo é obrigatório')
    .min(3, 'Digite no mínimo 18 caracteres')
    .max(50, 'Digite no máximo 50 caracteres'),
  model: Yup.string()
    .required('Um Modelo é obrigatório')
    .min(3, 'Digite no mínimo 18 caracteres')
    .max(50, 'Digite no máximo 50 caracteres'),
  manufacturer: Yup.string()
    .required('Uma fabricante é obrigatoria')
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(50, 'Digite no máximo 50 caracteres'),
  unit: Yup.string()
    .required('Uma unidade é obrigatória')
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(50, 'Digite no máximo 50 caracteres'),
  sector: Yup.string()
    .required('Uma unidade é obrigatória')
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(50, 'Digite no máximo 50 caracteres')
})

import * as Yup from 'yup'

interface DayToWork {
  day: number
  firstEntry: string | null
  firstExit: string | null
  secondEntry: string | null
  secondExit: string | null
  thirdEntry: string | null
  thirdExit: string | null
}

export interface IWorkingTimeRegisterForm {
  workingTime: DayToWork[]
}

const timeValidation = Yup.string()
  .nullable()
  .matches(/^\d{2}:\d{2}$/, 'Formato de hora inválido ou fora do intervalo')

const timeComparison = (refPath: string, message: string) =>
  Yup.string()
    .nullable()
    .when(refPath, (refValue, schema) =>
      refValue
        ? schema
            .required(message)
            .test('time-comparison', message, function (value: string) {
              if (!value) return false // Se o valor atual é nulo e a referência é preenchida, falha
              const [refHours, refMinutes] = refValue.split(':').map(Number)
              const [hours, minutes] = value.split(':').map(Number)
              const refTotalMinutes = refHours * 60 + refMinutes
              const totalMinutes = hours * 60 + minutes
              return totalMinutes >= refTotalMinutes
            })
        : schema
    )

export const validationSchema = Yup.object({
  workingTime: Yup.array().of(
    Yup.object({
      day: Yup.number().required('Obrigatório'),
      firstEntry: timeValidation,
      firstExit: timeComparison(
        'firstEntry',
        'O horário de saída deve ser maior ou igual ao horário de entrada'
      ),
      secondEntry: timeValidation,
      secondExit: timeValidation.when('secondEntry', (entry, schema) =>
        entry
          ? schema
              .required(
                'A saída correspondente é obrigatória se a entrada for fornecida'
              )
              .test(
                'exit-after-entry',
                'O horário de saída deve ser maior ou igual ao horário de entrada',
                (value: string) => timeComparison('secondEntry', value)
              )
          : schema.nullable()
      ),
      thirdEntry: timeValidation,
      thirdExit: timeValidation.when('thirdEntry', (entry, schema) =>
        entry
          ? schema
              .required(
                'A saída correspondente é obrigatória se a entrada for fornecida'
              )
              .test(
                'exit-after-entry',
                'O horário de saída deve ser maior ou igual ao horário de entrada',
                (value: string) => timeComparison('thirdEntry', value)
              )
          : schema.nullable()
      )
    })
  )
})

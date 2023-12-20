import { IOption } from 'components/Core/Form/Fields/Select/Select.interface'
import { getYear } from 'date-fns'

export function selectYears(totalYears = 1) {
  const currentYear = getYear(new Date())
  const yearOptions: IOption[] = [
    {
      value: currentYear,
      label: currentYear.toString()
    }
  ]

  for (let i = 1; i < totalYears; i++) {
    const year = currentYear - i

    yearOptions.push({ value: year, label: year.toString() })
  }

  return yearOptions
}

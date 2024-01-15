import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'

interface ICompanyDropdown {
  uuid: string
  description: string
}

export function useCompanyDropdown(allData?: string) {
  const [companies, setCompanies] = useState<IOption[] | null>(null)

  const fetchData = useCallback(async (allData?: string) => {
    try {
      setCompanies(null)

      const params = allData ? { allData } : {}

      const {
        data: { data }
      } = await get('/dropdown/company', { params })

      const companies = data.map((item: ICompanyDropdown) => {
        return {
          value: item.uuid,
          label: item.description
        }
      })

      setCompanies(companies)
    } catch {
      setCompanies([])
    }
  }, [])

  useEffect(() => {
    fetchData(allData)
  }, [allData, fetchData])

  return { companies }
}

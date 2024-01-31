import { useCallback, useEffect, useState } from 'react'

import { get } from '@/services/api/sermed-api/sermed-api'

export interface IUserDetails {
  uuid: string
  cpf: string
  name: string
  socialName: string
  email: string
  companyUuid: string
  companyCnpj: string
  companyName: string
  position: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string | null
  resignationDate: string | null
  status: string
}

export function useUserDetails(uuid: string) {
  const [result, setResult] = useState<IUserDetails | null>(null)

  const fetchData = useCallback(async (uuid: string) => {
    try {
      setResult(null)

      const { data } = await get(`/parametrizations/users/${uuid}`)

      if (data) {
        setResult(data.data)
      } else {
        setResult(null)
      }
    } catch {
      setResult(null)
    }
  }, [])

  useEffect(() => {
    uuid && fetchData(uuid)
  }, [uuid, fetchData])

  return { result }
}

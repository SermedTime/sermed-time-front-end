import { useQuery } from 'react-query'

import { get } from '@/services/api/sermed-api/sermed-api'

import {
  IApiResponse,
  defaultValues
} from '@/services/api/sermed-api/sermed-api.interface'

import { removeEmptyEntries } from '@/utils/generic'

interface IUserSearch {
  userUuid: string
  name: string
  socialName: string
  cpf: string
  status: 'active' | 'inactive'
  employeeCode: string
}

interface Props {
  params?: Record<string, any>
  onSuccess?: (data: any) => void
  onError?: (err: unknown) => void
}

async function fetchData(
  params?: Record<string, any>
): Promise<IApiResponse<IUserSearch>> {
  const queryParams = removeEmptyEntries({
    search: params?.search,
    searchingBy: params?.searchingBy,
    records: params?.records,
    status: params?.status,
    order: params?.order,
    orderBy: params?.orderBy,
    page: params?.page
  })

  return get('user', queryParams)
    .then(res => res.data)
    .catch(() => defaultValues)
}

export function useUserSearch({ params, onSuccess, onError }: Props) {
  return useQuery<IApiResponse<IUserSearch>, Error>({
    queryKey: [`user-search-${params?.hash}`],
    queryFn: async () => fetchData(params),
    onSuccess,
    onError
  })
}

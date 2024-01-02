import { IOption } from '@/components/Core/Form/Fields/Select/Select.interface'
import { useBreadcrumbContext } from '@/contexts/Layout/Breadcrumb'
import { useHeaderContext } from '@/contexts/Layout/Header'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function ListTeams() {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const { setPageHeading } = useHeaderContext()
  const { setPageBreadcrumb } = useBreadcrumbContext()

  const { result, params, refetch, setParams } = useCompanies()

  const [loaded, setLoaded] = useState(false)
  const [editingRecord, setEditingRecord] = useState('')

  const SEARCH_OPTIONS: IOption[] = [
    {
      value: 'description',
      label: 'Descrição'
    },
    {
      value: 'cnpj',
      label: 'CNPJ'
    }
  ]
  return (
    <div>
      <h1>ListTeams</h1>
    </div>
  )
}

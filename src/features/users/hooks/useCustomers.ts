import { useEffect, useState } from 'react'
import { getCustomers } from '../services/customersService'
import type { Customer } from '../types'
import type { ApiPaginationMeta } from '../../../shared/types/api'

interface UseCustomersResult {
  customers: Customer[]
  meta: ApiPaginationMeta | null
  loading: boolean
  error: string | null
}

export function useCustomers(page: number): UseCustomersResult {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [meta, setMeta] = useState<ApiPaginationMeta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchCustomers() {
      setLoading(true)
      setError(null)

      try {
        const response = await getCustomers(page)
        if (isMounted) {
          setCustomers(response.data)
          setMeta(response.meta)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar clientes')
          setCustomers([])
          setMeta(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCustomers()

    return () => {
      isMounted = false
    }
  }, [page])

  return { customers, meta, loading, error }
}

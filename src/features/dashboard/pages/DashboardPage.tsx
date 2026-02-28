import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authStore } from '../../../app/store'
import Button from '../../../shared/components/Button'
import CustomersPage from '../../users/pages/CustomersPage'

function DashboardPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  function handleLogout() {
    authStore.clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard de clientes</h1>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </header>
      <CustomersPage
        page={page}
        onPreviousPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setPage((prev) => prev + 1)}
      />
    </main>
  )
}

export default DashboardPage

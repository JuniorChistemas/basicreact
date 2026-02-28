import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'

function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const success = await login({ email, password })
    if (success) {
      navigate('/dashboard', { replace: true })
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <section className="w-full rounded-lg border border-gray-200 p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@empresa.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Ingresando...' : 'Entrar'}
          </Button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage

import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { authStore } from '../../../app/store'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authStore.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

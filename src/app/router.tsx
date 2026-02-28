import { Navigate, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import LoginPage from '../features/auth/pages/LoginPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])

import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { useThemeEffect } from '@/hooks/useThemeEffect'
import { DashboardPage } from '@/pages/Dashboard'
import { ClientsPage } from '@/pages/Clients'
import { DealsPage } from '@/pages/Deals'
import { TasksPage } from '@/pages/Tasks'
import { LoginPage } from '@/pages/Login'
import { NotFoundPage } from '@/pages/NotFound'

export default function App() {
  useThemeEffect()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

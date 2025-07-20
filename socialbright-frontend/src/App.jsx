import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider, useAuth } from '@shared/context/AuthProvider';
import { TenantProvider } from '@shared/context/TenantContext';
import { ClientProvider } from '@shared/context/ClientContext';

import PrivateLayout from '@shared/layouts/PrivateLayout';
import AdminLayout from '@shared/layouts/AdminLayout';
import SuperuserLayout from '@shared/layouts/SuperuserLayout';

// Public Pages
import HomePage from '@shared/Public/HomePage';
import LoginPage from '@shared/Public/LoginPage';
import ForgotPasswordPage from '@shared/Public/ForgotPasswordPage';
import PlansPage from '@shared/Public/PlansPage';
import NotFoundPage from '@shared/Public/NotFound';
import PasswordResetPage from '@shared/Public/PasswordResetPage';

// User Pages
import DashboardPage from '@pages/User/DashboardPage';
import ClientsPage from '@pages/User/ClientsPage';
import ReportsPage from '@pages/User/ReportsPage';
import TasksPage from '@pages/User/TasksPage';
import CalendarPage from '@pages/User/CalendarPage';
import ClientOverviewPage from '@pages/User/ClientOverviewPage';
import DemographicsPage from '@pages/User/DemographicsPage';
import EligibilityPage from '@pages/User/EligibilityPage';
import PlanOfCarePage from '@pages/User/PlanOfCare/PlanOfCarePage';
import DocumentsPage from '@pages/User/DocumentsPage';
import CaseNotesPage from '@pages/User/CaseNotesPage';
import StatusFormPage from '@pages/User/StatusFormPage';
import ProvidersPage from '@pages/User/ProvidersPage';

// Admin Pages
import AdminDashboardPage from '@tenants/gcm/pages/Admin/AdminDashboardPage';
import AdminNewClientPage from '@tenants/gcm/pages/Admin/AdminNewClientPage';
import AdminAlertsPage from '@tenants/gcm/pages/Admin/AdminAlertsPage';
import AdminUserManagementPage from '@tenants/gcm/pages/Admin/AdminUserManagementPage';
import AdminClientManagementPage from '@tenants/gcm/pages/Admin/AdminClientManagementPage';
import AdminReportsPage from '@tenants/gcm/pages/Admin/AdminReportsPage';
import AdminGeographyPage from '@tenants/gcm/pages/Admin/AdminGeographyPage';
import AdminAuditLogPage from '@tenants/gcm/pages/Admin/AdminAuditLogPage';
import AdminDocumentsPage from '@tenants/gcm/pages/Admin/AdminDocumentsPage';
import AdminSettingsPage from '@tenants/gcm/pages/Admin/AdminSettingsPage';

// Superuser Pages
import SuperuserDashboardPage from '@pages/Superuser/SuperuserDashboardPage';
import SuperuserAdminAccountsPage from '@pages/Superuser/SuperuserAdminAccountsPage';
import SuperuserSystemSettingsPage from '@pages/Superuser/SuperuserSystemSettingsPage';
import SuperuserSystemLogsPage from '@pages/Superuser/SuperuserSystemLogsPage';
import SuperuserMaintenancePage from '@pages/Superuser/SuperuserMaintenancePage';
import SuperuserAnalyticsPage from '@pages/Superuser/SuperuserAnalyticsPage';
import SuperuserTenantFeaturesPage from '@pages/Superuser/SuperuserTenantFeaturesPage';
import SuperuserReportsPage from '@pages/Superuser/SuperuserReportsPage';

// Protected Route
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.some(role => user.roles.includes(role))) return <Navigate to="/unauthorized" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <ClientProvider>
            <>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/reset" element={<PasswordResetPage />} />

                {/* Protected User Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['case_manager']}>
                      <PrivateLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="clients" element={<ClientsPage />} />
                  <Route path="tasks" element={<TasksPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                </Route>

                {/* Client-Specific Routes */}
                <Route
                  path="/tenants/:tenantId/clients/:id"
                  element={
                    <ProtectedRoute allowedRoles={['case_manager']}>
                      <PrivateLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="overview" element={<ClientOverviewPage />} />
                  <Route path="demographics" element={<DemographicsPage />} />
                  <Route path="eligibility" element={<EligibilityPage />} />
                  <Route path="plan-of-care" element={<PlanOfCarePage />} />
                  <Route path="documents" element={<DocumentsPage />} />
                  <Route path="casenotes" element={<CaseNotesPage />} />
                  <Route path="statusform" element={<StatusFormPage />} />
                  <Route path="providers" element={<ProvidersPage />} />
                </Route>

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="clients" element={<AdminClientManagementPage />} />
                  <Route path="clients/new" element={<AdminNewClientPage />} />
                  <Route path="users" element={<AdminUserManagementPage />} />
                  <Route path="alerts" element={<AdminAlertsPage />} />
                  <Route path="documents" element={<AdminDocumentsPage />} />
                  <Route path="reports" element={<AdminReportsPage />} />
                  <Route path="geography" element={<AdminGeographyPage />} />
                  <Route path="audit-log" element={<AdminAuditLogPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                {/* Superuser Routes */}
                <Route
                  path="/superuser"
                  element={
                    <ProtectedRoute allowedRoles={['superuser']}>
                      <SuperuserLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<SuperuserDashboardPage />} />
                  <Route path="admins" element={<SuperuserAdminAccountsPage />} />
                  <Route path="settings" element={<SuperuserSystemSettingsPage />} />
                  <Route path="logs" element={<SuperuserSystemLogsPage />} />
                  <Route path="maintenance" element={<SuperuserMaintenancePage />} />
                  <Route path="analytics" element={<SuperuserAnalyticsPage />} />
                  <Route path="features" element={<SuperuserTenantFeaturesPage />} />
                  <Route path="reports" element={<SuperuserReportsPage />} />
                </Route>

                {/* Catch-all (404) */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>

              <Toaster position="top-right" />
            </>
        </ClientProvider>
      </TenantProvider>
    </AuthProvider>
  );
}

export default App;



import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateLinkPage from './pages/CreateLinkPage';
import CustomDomains from './pages/CustomDomains';
import Login from './pages/Login';
import RedirectHandler from './pages/RedirectHandler';
import InterstitialPage from './pages/InterstitialPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout Component
const DashboardLayout = () => (
  <SidebarProvider>
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
      <div className="flex h-screen w-full">
        <Sidebar />
        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  </SidebarProvider>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Route (Public) */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Routes with Layout (Protected) */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links" element={<CreateLinkPage />} />
            <Route path="/links/new" element={<Navigate to="/links" replace />} />
            <Route path="/custom-domains" element={<CustomDomains />} />
            <Route path="/customdomain" element={<Navigate to="/custom-domains" replace />} />
          </Route>

          {/* Fake Cloaker / Interstitial Route (Public) */}
          <Route path="/_meetups" element={<InterstitialPage />} />

          {/* Redirect Route (Standalone - Public) - Must be last */}
          <Route path="/:slug" element={<RedirectHandler />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

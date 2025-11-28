import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropiedadesPorCategoria from './pages/PropiedadesPorCategoria';
import WhatsappFloat from './components/WhatsappFloat';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PropiedadesAdmin from './pages/admin/PropiedadesAdmin';
import ReservasAdmin from './pages/admin/ReservasAdmin';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-braidot-primary-bordo"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/admin/login" />;
};

// Botón admin flotante
const AdminButton = () => (
  <a 
    href="/admin/login"
    className="fixed bottom-4 left-4 bg-braidot-primary-bordo hover:bg-braidot-primary-bordo-light text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 group"
    title="Acceso Admin"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-braidot-negro text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Acceso Admin
    </span>
  </a>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
              <WhatsappFloat />
              <AdminButton />
            </>
          } />
          
          {/* Páginas de propiedades por categoría */}
          <Route path="/propiedades/:categoria" element={
            <>
              <Navbar />
              <PropiedadesPorCategoria />
              <Footer />
              <WhatsappFloat />
              <AdminButton />
            </>
          } />
          
          {/* Rutas de administración */}
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/propiedades" element={
            <ProtectedRoute>
              <PropiedadesAdmin />
            </ProtectedRoute>
          } />

          <Route path="/admin/reservas" element={
            <ProtectedRoute>
              <ReservasAdmin />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
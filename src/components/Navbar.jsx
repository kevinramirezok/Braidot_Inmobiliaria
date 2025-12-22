import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#5B0F0F] text-white shadow-2xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Logo optimizado para 320px - IZQUIERDA */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="bg-white/10 p-1.5 sm:p-2 rounded-lg sm:rounded-xl group-hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight">BRAIDOT</span>
              <p className="text-[10px] sm:text-xs text-white/70 leading-none">Inmobiliaria</p>
            </div>
          </Link>

          {/* DERECHA: Links y Admin */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Link Sobre Nosotros - solo desktop grande */}
            <a 
              href="#nosotros" 
              className="hidden lg:block text-white/90 hover:text-white font-medium transition-colors relative group"
            >
              Sobre Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </a>
            
            {/* Botón Admin - desktop */}
            <Link
              to="/admin/login"
              className="hidden md:flex bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all duration-300 items-center gap-2 text-sm font-medium"
              title="Acceso Admin"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin
            </Link>

            {/* Menú hamburguesa móvil - pegado a la derecha */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/20 pt-4">
            <a 
              href="#nosotros" 
              onClick={() => setMenuOpen(false)}
              className="block text-white/90 hover:text-white font-medium transition-colors"
            >
              Sobre Nosotros
            </a>
            {/* Botón Admin en menú móvil */}
            <Link
              to="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Acceso Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
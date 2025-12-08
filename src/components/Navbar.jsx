import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-braidot-primary-bordo to-braidot-primary-bordo-light text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo mejorado */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight">BRAIDOT</span>
              <p className="text-xs text-white/70">Inmobiliaria</p>
            </div>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#nosotros" 
              className="text-white/90 hover:text-white font-medium transition-colors relative group"
            >
              Sobre Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </a>
          </div>

          {/* Menú hamburguesa móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
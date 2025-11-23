const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-braidot-primary-bordo to-braidot-primary-bordo-light text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Branding */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Braidot Inmobiliaria
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Tu socio de confianza en bienes raíces desde 2003
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/braidotinmobiliaria" 
                target="_blank"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/braidotinmobiliaria" 
                target="_blank"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#alquileres" className="hover:text-white transition-colors">
                  Propiedades en Alquiler
                </a>
              </li>
              <li>
                <a href="#ventas" className="hover:text-white transition-colors">
                  Propiedades en Venta
                </a>
              </li>
              <li>
                <a href="#temporarias" className="hover:text-white transition-colors">
                  Quintas Temporarias
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Av. Principal 1234<br/>Reconquista, Santa Fe</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@braidotinmobiliaria.com" className="hover:text-white">
                  info@braidotinmobiliaria.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+5493482XXXXXX" className="hover:text-white">
                  +54 9 3482 XX-XXXX
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Horarios */}
          <div>
            <h4 className="text-lg font-bold mb-4">Horarios de Atención</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <span className="font-semibold text-white">Lunes a Viernes</span>
                <br/>9:00 - 13:00 | 16:00 - 20:00
              </li>
              <li>
                <span className="font-semibold text-white">Sábados</span>
                <br/>9:00 - 13:00
              </li>
              <li className="pt-2">
                <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Atención 24/7 por WhatsApp
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>
              © {currentYear} Braidot Inmobiliaria. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="/privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

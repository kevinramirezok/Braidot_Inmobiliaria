import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-braidot-primary-bordo text-braidot-blanco1 px-6 py-4 flex justify-between items-center">
    <Link to="/" className="font-bold text-xl text-braidot-blanco1">BRAIDOT Inmobiliaria</Link>
    <div className="space-x-4">
      <Link to="/" className="hover:underline text-braidot-blanco1">Inicio</Link>
      {/* Agrega más enlaces aquí */}
    </div>
  </nav>
);

export default Navbar;

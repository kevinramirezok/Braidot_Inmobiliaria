import { Link } from 'react-router-dom';

const AdminSidebar = () => (
  <aside className="bg-braidot-primary-bordo text-braidot-blanco1 w-64 min-h-screen p-6 flex flex-col space-y-4">
    <Link to="/admin/dashboard" className="font-bold text-lg hover:underline text-braidot-blanco1">Dashboard</Link>
    <Link to="/admin/propiedades" className="hover:underline text-braidot-blanco1">Propiedades</Link>
    <Link to="/admin/agregar" className="hover:underline text-braidot-blanco1">Agregar propiedad</Link>
    <Link to="/admin/reservas" className="hover:underline text-braidot-blanco1">Reservas</Link>
    <Link to="/admin/configuracion" className="hover:underline text-braidot-blanco1">Configuración</Link>
         <Link to="/admin/login" className="hover:underline text-braidot-gris mt-auto">Cerrar sesión</Link>
  </aside>
);

export default AdminSidebar;

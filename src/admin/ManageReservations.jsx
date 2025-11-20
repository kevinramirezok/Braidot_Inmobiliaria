import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const API_URL = 'http://localhost:4000/api';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/reservations/1`)
      .then(res => res.json())
      .then(setReservations);
  }, []);

  const handleStatus = async (id, status) => {
    setMessage('');
    const res = await fetch(`${API_URL}/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setMessage('Reserva actualizada');
      // Actualizar reservas
      fetch(`${API_URL}/reservations/1`)
        .then(r => r.json())
        .then(setReservations);
    } else {
      setMessage('Error al actualizar');
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <section className="container mx-auto py-8 bg-braidot-blanco1">
        <h1 className="text-2xl font-bold mb-6 text-braidot-primary-bordo">Gestión de Reservas</h1>
        {message && <p className="mb-4 text-braidot-primary-bordo">{message}</p>}
        <table className="w-full border border-braidot-accent">
          <thead>
            <tr className="bg-braidot-accent text-braidot-dark">
              <th className="p-2">ID</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id} className="border-b">
                <td className="p-2 text-braidot-dark">{r.id}</td>
                <td className="p-2 text-braidot-dark">{r.client ? r.client.name : '-'}</td>
                <td className="p-2 text-braidot-dark">{r.startDate} - {r.endDate}</td>
                <td className="p-2 text-braidot-dark">{r.status}</td>
                <td className="p-2 space-x-2">
                  {r.status === 'pending' && (
                    <>
                      <button className="bg-braidot-primary-bordo text-braidot-blanco1 px-2 py-1 rounded" onClick={() => handleStatus(r.id, 'confirmed')}>Aceptar</button>
                      <button className="bg-braidot-negro text-braidot-blanco1 px-2 py-1 rounded" onClick={() => handleStatus(r.id, 'rejected')}>Rechazar</button>
                    </>
                  )}
                  {r.status === 'confirmed' && (
                    <button className="bg-braidot-gris text-braidot-blanco1 px-2 py-1 rounded" onClick={() => handleStatus(r.id, 'cancelled')}>Cancelar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ManageReservations;

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
import ReservationForm from '../components/ReservationForm';

const API_URL = 'http://localhost:4000/api';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener propiedad (puedes mejorar con propertyService)
    fetch(`${API_URL}/properties`)
      .then(res => res.json())
      .then(data => setProperty(data.find(p => p.id === Number(id))));
    // Obtener reservas
    fetch(`${API_URL}/reservations/${id}`)
      .then(res => res.json())
      .then(setReservations);
  }, [id]);

  if (!property) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-xl font-bold mb-4">Propiedad no encontrada</h2>
        <Link to="/propiedades" className="text-braidot-primary-bordo underline">Volver a propiedades</Link>
      </div>
    );
  }

  const handleSelectDate = date => {
    setSelectedDate(date.toISOString().slice(0, 10));
  };

  const handleReservation = async (formData) => {
    setMessage('');
    const res = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId: property.id,
        startDate: formData.selectedDate,
        endDate: formData.selectedDate,
        client: {
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email
        }
      })
    });
    if (res.ok) {
      setMessage('¡Reserva enviada! El administrador confirmará tu solicitud.');
      // Actualizar reservas
      fetch(`${API_URL}/reservations/${id}`)
        .then(r => r.json())
        .then(setReservations);
    } else {
      const error = await res.json();
      setMessage(error.message || 'Error al reservar');
    }
  };

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={property.images[0]} alt={property.title} className="w-full h-64 object-cover rounded" />
          <div className="flex space-x-2 mt-2">
            {property.images.slice(1).map((img, idx) => (
              <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Calendario de disponibilidad</h2>
            <Calendar year={new Date().getFullYear()} month={new Date().getMonth()} reservations={reservations} onSelectDate={handleSelectDate} />
          </div>
        </div>
        <div>
          <p className="text-lg text-braidot-primary-bordo font-semibold mb-2">${property.price}</p>
          <p className="mb-2">Ubicación: <span className="font-medium">{property.location}</span></p>
          <p className="mb-2">Habitaciones: {property.rooms}</p>
          <p className="mb-2">Tipo: {property.type}</p>
          <p className="mb-2">Estado: {property.active ? 'Disponible' : 'No disponible'}</p>
          {/* Aquí puedes mostrar reglas, servicios, capacidad, etc. */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Reservar esta propiedad</h2>
            {selectedDate ? (
              <ReservationForm propertyId={property.id} selectedDate={selectedDate} onSubmit={handleReservation} />
            ) : (
              <p className="text-braidot-neutral-500">Selecciona un día disponible en el calendario.</p>
            )}
            {message && <p className="mt-2 text-braidot-primary-bordo">{message}</p>}
          </div>
          <Link to="/propiedades" className="text-braidot-primary-bordo underline mt-4 inline-block">Volver a propiedades</Link>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetail;

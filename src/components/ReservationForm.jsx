import React, { useState } from 'react';

const ReservationForm = ({ propertyId, selectedDate, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    email: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...form, propertyId, selectedDate });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="border border-braidot-primary-bordo p-2 w-full rounded" required />
      <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp" className="border border-braidot-primary-bordo p-2 w-full rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border border-braidot-primary-bordo p-2 w-full rounded" required />
      <button type="submit" className="bg-braidot-primary-bordo text-braidot-blanco1 px-4 py-2 rounded border border-braidot-primary-bordo hover:bg-braidot-gris2 transition-colors">Reservar ahora</button>
    </form>
  );
};

export default ReservationForm;

import React, { useEffect, useState } from 'react';

const getDayColor = (date, reservations) => {
  const d = date.toISOString().slice(0, 10);
  const res = reservations.filter(r => d >= r.startDate && d <= r.endDate);
  if (res.some(r => r.status === 'blocked')) return 'bg-braidot-gris2'; // bloqueado
  if (res.some(r => r.status === 'confirmed')) return 'bg-braidot-primary-bordo'; // reservado
  if (res.some(r => r.status === 'pending')) return 'bg-braidot-blanco2'; // pendiente
  return 'bg-braidot-gris'; // disponible
};

const Calendar = ({ year, month, reservations, onSelectDate }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const tempDays = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
      tempDays.push(new Date(year, month, d));
    }
    setDays(tempDays);
  }, [year, month]);

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(day => (
        <button
          key={day.toISOString()}
          className={`p-2 rounded text-braidot-negro ${getDayColor(day, reservations)}`}
          disabled={getDayColor(day, reservations) === 'bg-braidot-gris2' || getDayColor(day, reservations) === 'bg-braidot-primary-bordo'}
          onClick={() => onSelectDate(day)}
        >
          {day.getDate()}
        </button>
      ))}
    </div>
  );
};

export default Calendar;

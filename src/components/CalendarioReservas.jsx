import { useState, useEffect } from 'react';

const CalendarioReservas = ({ reservasConfirmadas, onSelectRange, fechaInicio, fechaFin }) => {
  const [mesActual, setMesActual] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Obtener días del mes
  const getDiasDelMes = (fecha) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const diasAnteriores = primerDia.getDay();
    
    const dias = [];
    
    // Días del mes anterior (grises)
    for (let i = diasAnteriores - 1; i >= 0; i--) {
      const dia = new Date(year, month, -i);
      dias.push({ fecha: dia, esMesActual: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const dia = new Date(year, month, i);
      dias.push({ fecha: dia, esMesActual: true });
    }
    
    return dias;
  };

  // Verificar si una fecha está bloqueada (PENDIENTE o CONFIRMADA)
  const estaReservada = (fecha) => {
    const fechaStr = fecha.toISOString().split('T')[0];
    return reservasConfirmadas.some(reserva => {
      const inicio = new Date(reserva.fecha_inicio);
      const fin = new Date(reserva.fecha_fin);
      // Bloquear si está PENDIENTE o CONFIRMADA (Opción 2: sin conflictos)
      return fecha >= inicio && fecha <= fin && (reserva.estado === 'pendiente' || reserva.estado === 'confirmada');
    });
  };

  // Verificar si es fecha pasada
  const esPasado = (fecha) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fecha < hoy;
  };

  // Obtener clase de color del día
  const getColorDia = (fecha) => {
    if (esPasado(fecha)) return 'text-braidot-neutral-300 cursor-not-allowed';
    if (estaReservada(fecha)) return 'bg-braidot-neutral-300 text-white cursor-not-allowed';
    
    const fechaStr = fecha.toISOString().split('T')[0];
    const inicioStr = fechaInicio?.toISOString().split('T')[0];
    const finStr = fechaFin?.toISOString().split('T')[0];
    
    if (fechaStr === inicioStr || fechaStr === finStr) {
      return 'bg-braidot-primary-bordo text-white font-bold';
    }
    
    if (fechaInicio && fechaFin && fecha > fechaInicio && fecha < fechaFin) {
      return 'bg-braidot-primary-bordo/20 text-braidot-negro';
    }
    
    if (fechaInicio && !fechaFin && hoveredDate && fecha > fechaInicio && fecha <= hoveredDate) {
      return 'bg-braidot-primary-bordo/10 text-braidot-negro';
    }
    
    return 'hover:bg-braidot-neutral-100 text-braidot-negro cursor-pointer';
  };

  // Manejar click en día
  // Manejar click en día del calendario
  const handleClickDia = (fecha) => {
    // No permitir selección de fechas pasadas o ya reservadas
    if (esPasado(fecha) || estaReservada(fecha)) return;
    
    // Caso 1: Primera selección (no hay fecha de inicio)
    if (!fechaInicio) {
      onSelectRange(fecha, fecha); // Seleccionar 1 día
      return;
    }
    
    // Caso 2: Ya hay 1 día seleccionado (inicio = fin)
    if (fechaInicio && fechaFin && fechaInicio.getTime() === fechaFin.getTime()) {
      // Si hace click en el mismo día que ya está seleccionado
      if (fecha.getTime() === fechaInicio.getTime()) {
        onSelectRange(fecha, fecha); // Mantener 1 día
      } 
      // Si hace click en una fecha anterior
      else if (fecha < fechaInicio) {
        onSelectRange(fecha, fecha); // Reiniciar desde esa fecha
      } 
      // Si hace click en una fecha posterior
      else {
        onSelectRange(fechaInicio, fecha); // Extender el rango
      }
      return;
    }
    
    // Caso 3: Ya hay un rango de múltiples días seleccionado
    // Reiniciar la selección con el nuevo día
    onSelectRange(fecha, fecha);
  };

  // Cambiar mes
  const cambiarMes = (direccion) => {
    const nuevaFecha = new Date(mesActual);
    nuevaFecha.setMonth(mesActual.getMonth() + direccion);
    setMesActual(nuevaFecha);
  };

  const dias = getDiasDelMes(mesActual);

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => cambiarMes(-1)}
          className="p-2 hover:bg-braidot-neutral-100 rounded-lg transition-colors"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-bold text-braidot-negro">
          {meses[mesActual.getMonth()]} {mesActual.getFullYear()}
        </h3>
        
        <button
          onClick={() => cambiarMes(1)}
          className="p-2 hover:bg-braidot-neutral-100 rounded-lg transition-colors"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {diasSemana.map(dia => (
          <div key={dia} className="text-center text-xs font-semibold text-braidot-neutral-600 py-2">
            {dia}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-2">
        {dias.map(({ fecha, esMesActual }, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClickDia(fecha)}
            onMouseEnter={() => setHoveredDate(fecha)}
            onMouseLeave={() => setHoveredDate(null)}
            disabled={esPasado(fecha) || estaReservada(fecha) || !esMesActual}
            className={`
              p-2 text-sm rounded-lg transition-colors
              ${!esMesActual ? 'invisible' : ''}
              ${getColorDia(fecha)}
            `}
          >
            {fecha.getDate()}
          </button>
        ))}
      </div>

      {/* Leyenda */}
      <div className="mt-4 pt-4 border-t border-braidot-neutral-200 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-braidot-primary-bordo"></div>
          <span className="text-braidot-neutral-600">Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-braidot-neutral-300"></div>
          <span className="text-braidot-neutral-600">No disponible</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarioReservas;

# Braidot Inmobiliaria

Proyecto web inmobiliario moderno y profesional, desarrollado con React, Vite, Tailwind CSS y Supabase. Permite gestionar propiedades, reservas y usuarios desde un panel administrativo seguro y una interfaz pública atractiva.

## Estado actual (25/11/2025)
- Integración completa con Supabase para propiedades, reservas y autenticación.
- Panel de administración protegido con login y gestión avanzada.
- Estructura modular, componentes reutilizables y organización profesional.
- Filtros avanzados, búsqueda, y visualización por categorías (alquiler, venta, temporaria).
- Fondos personalizados, diseño responsive y experiencia de usuario optimizada.

## Estructura del proyecto
```
src/
├── App.jsx                # Componente principal
├── main.jsx               # Entrada principal de React
├── index.css              # Estilos globales
├── admin/
│   └── ManageReservations.jsx
├── assets/
│   └── images/
│       ├── FONDO1.jpg
│       └── FONDO2.jpg
├── components/
│   ├── AdminSidebar.jsx
│   ├── Calendar.jsx
│   ├── CalendarioReservas.jsx   # Calendario avanzado para reservas
│   ├── Footer.jsx
│   ├── ModalReserva.jsx         # Modal para reservar propiedades
│   ├── ModernTabs.jsx
│   ├── Navbar.jsx
│   ├── PropertyCard.jsx
│   ├── PropertyFilter.jsx
│   ├── PropertyModal.jsx
│   ├── ReservationForm.jsx
│   ├── Testimonials.jsx
│   ├── WhatsappFloat.jsx
│   ├── WhyChooseUs.jsx
│   └── admin/
│       └── FormularioPropiedad.jsx
├── contexts/
│   └── AuthContext.jsx    # Contexto de autenticación y sesión
├── data/
│   └── properties.json    # Datos legacy de propiedades
├── lib/
│   └── supabase.js        # Configuración de Supabase
├── pages/
│   ├── Home.jsx           # Página principal
│   ├── PropiedadesPorCategoria.jsx # Listado por categoría
│   └── admin/
│       ├── Dashboard.jsx
│       ├── Login.jsx
│       ├── PropiedadesAdmin.jsx
│       └── ReservasAdmin.jsx     # Panel admin para reservas
├── services/
│   └── propertyService.js # Lógica de propiedades (API)
```

## Principales funcionalidades

## Funcionalidades implementadas
- Visualización de propiedades por categoría (alquiler, venta, temporaria)
- Filtros avanzados y búsqueda en la sección de ventas
- Modal para ver detalles de cada propiedad
- Fondos personalizados y diseño profesional
- Sección "Por Qué Elegirnos" y testimonios
- Botón flotante de WhatsApp para contacto directo
- Panel de administración con login y gestión de propiedades/reservas
- Formulario para alta/edición de propiedades
- Sistema de reservas para quintas temporarias (calendario interactivo y formulario)
- Panel admin para gestionar reservas (confirmar, rechazar, cancelar)
- Estadísticas y acciones rápidas en el dashboard admin

## Funcionalidades pendientes
- Gestión de consultas (ver y responder formularios de contacto)
- Favoritos (permitir que usuarios guarden propiedades)
- Comparador (comparar hasta 3 propiedades lado a lado)
- Galería de imágenes tipo carrusel para múltiples fotos

## Instalación y uso
1. Instala dependencias:
   ```powershell
   npm install
   ```
2. Crea el archivo `.env.local` en la raíz con tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=tu_url
   VITE_SUPABASE_ANON_KEY=tu_key
   ```
3. Ejecuta el servidor de desarrollo:
   ```powershell
   npm run dev
   ```
4. Accede a la web en `http://localhost:5173`

## Despliegue
Para producción, ejecuta:
```powershell
npm run build
npm run preview
```
Puedes desplegar en Vercel, Netlify o cualquier hosting compatible con Vite.

## Autenticación y administración
- El panel admin requiere login y gestiona propiedades, reservas y consultas.
- La autenticación se realiza con Supabase y el contexto `AuthContext.jsx`.
- El dashboard muestra estadísticas en tiempo real y acciones rápidas.

## Dependencias principales
- React ^18.2.0
- Vite ^7.2.4
- Tailwind CSS ^3.0.0
- @supabase/supabase-js ^2.84.0
- react-router-dom ^7.9.6
- dotenv ^17.2.3
- @vitejs/plugin-react, autoprefixer, postcss

## Mejoras recomendadas
- Agregar paginación o scroll infinito en listados
- Mejorar experiencia móvil y accesibilidad
- Implementar favoritos y comparador de propiedades
- Migrar datos legacy a Supabase
- Optimizar imágenes y performance
- Agregar tests y validaciones

## Contacto y soporte
Para soporte, sugerencias o colaboración, contacta al desarrollador principal.

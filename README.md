

# Braidot Inmobiliaria

Proyecto web inmobiliario moderno y profesional, desarrollado con React, Vite, Tailwind CSS y Supabase. Permite gestionar propiedades, reservas y usuarios desde un panel administrativo seguro y una interfaz pública atractiva.

## Estado actual (08/12/2025)
- Integración completa con Supabase para propiedades, reservas y autenticación.
- Panel de administración protegido con login y gestión avanzada.
- Dashboard optimizado con 2 acciones rápidas principales (Gestionar Propiedades y Ver Reservas).
- Estructura modular, componentes reutilizables y organización profesional.
- Filtros avanzados, búsqueda, y visualización por categorías (alquiler, venta, temporaria).
- Fondos personalizados, diseño responsive y experiencia de usuario optimizada.
- Comparador de propiedades implementado con diseño visual profesional y colores oscuros (bordó, azul marino, gris oscuro) acorde a la identidad del proyecto.
- Sistema de reservas completo con lógica de días/noches y calendario interactivo.
- Formulario de contacto integrado que envía consultas directamente a WhatsApp y las guarda en Supabase.
- Proyecto finalizado y funcional, listo para producción.

## Estructura del proyecto
```
Braidot_Inmobiliaria/
├── BASEDEDATOS.txt
├── index.html
├── package.json
├── postcss.config.cjs
├── proximos pasos.txt
├── README.md
├── tailwind.config.js
├── vite.config.js
├── .env.local
├── public/
│   ├── FONDO1.jpg
│   └── FONDO2.jpg
└── src/
   ├── App.jsx
   ├── main.jsx
   ├── index.css
   ├── admin/
   │   └── ManageReservations.jsx
   ├── assets/
   │   └── images/
   │       ├── FONDO1.jpg
   │       └── FONDO2.jpg
   ├── components/
   │   ├── AdminSidebar.jsx
   │   ├── Calendar.jsx
   │   ├── CalendarioReservas.jsx
   │   ├── CompareBar.jsx
   │   ├── Footer.jsx
   │   ├── FormularioContacto.jsx
   │   ├── ModalReserva.jsx
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
   │   ├── AuthContext.jsx
   │   └── CompareContext.jsx
   ├── data/
   │   └── properties.json
   ├── lib/
   │   └── supabase.js
   ├── pages/
   │   ├── Home.jsx
   │   ├── PropiedadesPorCategoria.jsx
   │   ├── Comparar.jsx
   │   └── admin/
   │       ├── Dashboard.jsx
   │       ├── Login.jsx
   │       ├── PropiedadesAdmin.jsx
   │       └── ReservasAdmin.jsx
   ├── services/
   │   └── propertyService.js
```

## Funcionalidades implementadas
- Visualización de propiedades por categoría (alquiler, venta, temporaria)
- Filtros avanzados y búsqueda avanzada
- Modal para ver detalles completos de cada propiedad con todos los campos de la BD
- Galería de imágenes tipo carrusel con navegación entre múltiples fotos
- Sistema inteligente de Días vs Noches según tipo de propiedad (Quinta = días, otros = noches)
- Mensajes de WhatsApp detallados con ubicación, barrio, características y precio
- Fondos personalizados y diseño profesional
- Sección "Por Qué Elegirnos" y testimonios
- Botón flotante de WhatsApp para contacto directo con número actualizado
- Panel de administración con login y gestión de propiedades y reservas
- Formulario para alta/edición de propiedades con todos los campos
- Sistema de reservas para quintas temporarias (calendario interactivo y formulario)
- Panel admin para gestionar reservas (confirmar, rechazar, cancelar)
- Estadísticas en tiempo real y acciones rápidas en el dashboard admin (Gestionar Propiedades y Ver Reservas)
- PropertyService actualizado con mapeo completo de todos los campos de Supabase
- Comparador de propiedades visual, con diseño sobrio y colores oscuros, permitiendo comparar hasta 3 propiedades lado a lado
- CompareBar para gestión rápida de comparación
- Contexto global CompareContext para comparación
- Página Comparar.jsx para comparar propiedades
- Formulario de contacto integrado que envía consultas a WhatsApp y las guarda en Supabase

## Funcionalidades pendientes
(Proyecto completo, no quedan funcionalidades importantes pendientes)

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
- El panel admin requiere login y gestiona propiedades y reservas.
- Las consultas de contacto se envían directamente a WhatsApp y no se gestionan desde el panel admin.
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
- Migrar datos legacy a Supabase
- Optimizar imágenes y performance
- Agregar tests y validaciones
## Organización y planificación

El desarrollo se realizó por etapas, priorizando la estructura, la experiencia de usuario y la funcionalidad. El proyecto está completo y listo para producción.

1. Estructura y base tecnológica: organización de carpetas, configuración de React, Vite, Tailwind y Supabase.
2. Visualización y filtrado de propiedades, con panel de administración seguro.
3. Implementación de reservas y calendario personalizado con lógica de días/noches.
4. Mejoras visuales: fondos, colores, responsive, experiencia de usuario.
5. Comparador de propiedades visual y profesional, con CompareBar y CompareContext.
6. Formulario de contacto integrado con WhatsApp y Supabase.
7. Documentación y actualización continua del README.

Estado: Proyecto finalizado y funcional, sin tareas importantes pendientes.

## Contacto y soporte
Para soporte, sugerencias o colaboración, contacta al desarrollador principal.

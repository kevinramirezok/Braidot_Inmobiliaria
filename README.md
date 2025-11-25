
# Braidot Inmobiliaria

Proyecto web inmobiliario moderno usando React, Vite, Tailwind CSS y Supabase.

## Estado actual (25/11/2025)
- Integración con Supabase para gestión de propiedades y autenticación.
- Panel de administración protegido y login para admins.
- Estructura modular y componentes reutilizables.

## Estructura del proyecto
```
src/
├── lib/
│   └── supabase.js
├── services/
│   └── propertyService.js
├── contexts/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   └── admin/
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── PropiedadesAdmin.jsx
│       ├── FormularioPropiedad.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PropertyCard.jsx
│   ├── PropertyModal.jsx
│   ├── ModernTabs.jsx
│   ├── PropertyFilter.jsx
│   ├── WhyChooseUs.jsx
│   ├── Testimonials.jsx
│   ├── WhatsappFloat.jsx
│   └── admin/
│       └── FormularioPropiedad.jsx
├── assets/
│   └── images/
├── data/
│   └── properties.json (legacy)
```

## Funcionalidades principales
- Visualización de propiedades por categoría (alquiler, venta, temporaria)
- Filtros avanzados en la sección de ventas
- Modal para ver detalles de cada propiedad
- Fondo personalizado y diseño profesional
- Sección "Por Qué Elegirnos" y testimonios
- Botón flotante de WhatsApp
- Panel de administración y login de admins
- Formulario para alta/edición de propiedades

## Instalación y uso
1. Instala dependencias:
   ```powershell
   npm install @supabase/supabase-js react-router-dom dotenv
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

## Mejoras recomendadas
- Agregar paginación o scroll infinito
- Mejorar experiencia móvil y accesibilidad
- Implementar favoritos y comparador
- Migrar datos legacy a Supabase
- Optimizar imágenes y performance

## Contacto y soporte
Para soporte o sugerencias, contacta al desarrollador principal.

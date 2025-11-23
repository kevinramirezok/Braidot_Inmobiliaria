# Braidot Inmobiliaria

Este proyecto es una web inmobiliaria moderna desarrollada con React, Vite y Tailwind CSS. Permite mostrar propiedades en venta, alquiler y temporarias/quintas, con filtros, visualización en tarjetas y detalles en modal. El diseño es profesional, limpio y responsivo, con fondos personalizados y estructura organizada.


## Estructura actual y componentes

- **Frontend:** React + Vite + Tailwind CSS
- **Carpetas principales:**
   - `src/components/`: Componentes reutilizables y visuales:
      - `Navbar.jsx`
      - `Footer.jsx` ⭐ actualizado
      - `PropertyCard.jsx` ✅ actualizado
      - `PropertyModal.jsx` ✅ actualizado
      - `ModernTabs.jsx`
      - `PropertyFilter.jsx`
      - `HeroSection.jsx` ⭐ nuevo
      - `WhyChooseUs.jsx` ⭐ nuevo (bloque de ventajas)
      - `Testimonials.jsx` ⭐ nuevo (testimonios de clientes)
      - `WhatsAppFloat.jsx` ⭐ nuevo (botón flotante de WhatsApp)
   - `src/pages/`: Página principal (`Home.jsx` ✅ actualizado)
   - `src/data/`: Archivo `properties.json` con los datos de las propiedades
   - `src/assets/images/`: Imágenes locales para fondos y recursos visuales

### Estructura visual final
```text
src/
├── components/
│   ├── PropertyCard.jsx        ✅ actualizado
│   ├── PropertyModal.jsx       ✅ actualizado
│   ├── HeroSection.jsx         ⭐ nuevo
│   ├── WhyChooseUs.jsx         ⭐ nuevo
│   ├── Testimonials.jsx        ⭐ nuevo
│   ├── WhatsAppFloat.jsx       ⭐ nuevo
│   ├── Footer.jsx              ⭐ actualizado
│   ├── Navbar.jsx
│   ├── ModernTabs.jsx
│   └── PropertyFilter.jsx
├── pages/
│   └── Home.jsx                ✅ actualizado
└── data/
      └── properties.json
```

- **Funcionalidades principales:**
   - Visualización de propiedades por categoría (alquiler, venta, temporaria)
   - Filtros avanzados en la sección de ventas
   - Modal para ver detalles de cada propiedad
   - Fondo personalizado en body y modal
   - Diseño transparente y profesional
   - Sección "Por Qué Elegirnos" con ventajas destacadas
   - Sección de testimonios de clientes
   - Botón flotante de WhatsApp para contacto rápido


## Mejoras y recomendaciones para IA
1. **UI/UX:**
   - Mantener el contraste y legibilidad sobre fondos personalizados
   - Agregar paginación o scroll infinito si hay muchas propiedades
   - Mejorar la experiencia móvil y responsiva
   - Seguir iterando en la integración de secciones visuales y testimonios
2. **Funcionalidades:**
   - Agregar favoritos y comparador de propiedades
   - Integrar WhatsApp y formularios de contacto (ya implementado el botón flotante)
   - Permitir subir imágenes desde el panel de administración
   - Implementar autenticación para administración
3. **Datos:**
   - Migrar a una API o base de datos para gestión dinámica
   - Validar y sanitizar los datos de entrada
4. **Accesibilidad:**
   - Mejorar el soporte para lectores de pantalla
   - Usar etiquetas semánticas y roles adecuados
5. **Performance:**
   - Optimizar imágenes y recursos
   - Usar lazy loading en componentes pesados


## Instalación y uso
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Acceder a la web en `http://localhost:5173`


## Contacto y soporte
Este proyecto es una base para una inmobiliaria digital. Se recomienda seguir iterando y mejorando según las necesidades del negocio y los usuarios.

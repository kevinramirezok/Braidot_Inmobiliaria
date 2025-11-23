# Braidot Inmobiliaria

Este proyecto es una web inmobiliaria moderna desarrollada con React, Vite y Tailwind CSS. Permite mostrar propiedades en venta, alquiler y temporarias/quintas, con filtros, visualización en tarjetas y detalles en modal. El diseño es profesional, limpio y responsivo, con fondos personalizados y estructura organizada.

## Estructura actual
- **Frontend:** React + Vite + Tailwind CSS
- **Carpetas principales:**
  - `src/components/`: Componentes reutilizables (Navbar, Footer, PropertyCard, PropertyModal, ModernTabs, etc.)
  - `src/pages/`: Página principal (`Home.jsx`)
  - `src/data/`: Archivo `properties.json` con los datos de las propiedades
  - `src/assets/images/`: Imágenes locales para fondos y recursos visuales
- **Funcionalidades:**
  - Visualización de propiedades por categoría (alquiler, venta, temporaria)
  - Filtros avanzados en la sección de ventas
  - Modal para ver detalles de cada propiedad
  - Fondo personalizado en body y modal
  - Diseño transparente y profesional

## Mejoras y recomendaciones para IA
1. **UI/UX:**
   - Mantener el contraste y legibilidad sobre fondos personalizados
   - Agregar paginación o scroll infinito si hay muchas propiedades
   - Mejorar la experiencia móvil y responsiva
2. **Funcionalidades:**
   - Agregar favoritos y comparador de propiedades
   - Integrar WhatsApp y formularios de contacto
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

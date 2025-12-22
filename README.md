# 🏠 Braidot Inmobiliaria

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.39.1-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Plataforma moderna de gestión inmobiliaria con panel administrativo integrado**

[Ver Demo](#) · [Reportar Bug](#) · [Solicitar Feature](#)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Arquitectura y Stack Tecnológico](#-arquitectura-y-stack-tecnológico)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [Sistema de Diseño](#-sistema-de-diseño)
- [Seguridad](#-seguridad)
- [Despliegue](#-despliegue)
- [Créditos](#-créditos)

---

## 🎯 Sobre el Proyecto

**Braidot Inmobiliaria** es una plataforma web completa desarrollada para la gestión y visualización de propiedades inmobiliarias. Diseñada con arquitectura **Mobile-First** y optimizada para dispositivos desde **320px hasta 4K+**, ofrece una experiencia de usuario premium tanto para clientes como para administradores.

### ✨ Características Principales

#### 👥 **Experiencia de Usuario**
- 📱 **Responsive Design**: Optimizado desde 320px (móviles pequeños) hasta pantallas 4K
- 🎨 **Dark Theme Elegante**: Paleta de colores profesional con fondo FONDO1.jpg y cards blancas
- 🔍 **Filtros Avanzados**: Búsqueda por ubicación, habitaciones, tipo, patio y precio
- 📊 **Comparador de Propiedades**: Sistema de comparación lado a lado
- 📅 **Sistema de Reservas**: Calendario integrado para alquileres temporarios
- 💬 **WhatsApp Integration**: Consultas directas con mensaje pre-cargado
- 🖼️ **Galería de Imágenes**: Visualización con carrusel y fullscreen

#### 🔐 **Panel Administrativo**
- 🏢 **Dashboard Analítico**: Estadísticas en tiempo real de propiedades
- ➕ **CRUD Completo**: Crear, editar y eliminar propiedades
- 📸 **Upload de Imágenes**: Hasta 5 fotos por propiedad con preview
- 📋 **Gestión de Reservas**: Panel de reservas pendientes y confirmadas
- 🔒 **Autenticación Supabase**: Sistema de login seguro con JWT
- 🎯 **UI Consistente**: Cards blancas con texto negro para máxima legibilidad

---

## 🏗️ Arquitectura y Stack Tecnológico

### **Frontend**
- **React 18.3.1** - Framework principal con Hooks
- **React Router DOM 6.21.1** - Navegación SPA
- **Tailwind CSS 3.4.1** - Styling utility-first
- **Vite 5.0.8** - Build tool ultra-rápido

### **Backend & Database**
- **Supabase 2.39.1** - BaaS (Backend as a Service)
  - PostgreSQL Database
  - Authentication (Magic Links)
  - Storage (Imágenes)
  - Row Level Security (RLS)

### **State Management**
- **React Context API** - AuthContext, CompareContext
- **Local State** - useState/useEffect hooks

### **Deployment**
- **Vercel** - Hosting y CI/CD automático
- **Edge Network** - CDN global para performance

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/braidot-inmobiliaria.git
cd braidot-inmobiliaria
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Supabase Configuration
VITE_SUPABASE_URL=tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui

# Email Configuration (Opcional - Para contacto)
VITE_CONTACT_EMAIL=contacto@ejemplo.com
```

> ⚠️ **IMPORTANTE**: Nunca commitees el archivo `.env` al repositorio. Ya está incluido en `.gitignore`.

### **4. Iniciar Servidor de Desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### **5. Build para Producción**
```bash
npm run build
npm run preview  # Preview del build
```

---

## 📁 Estructura del Proyecto

```
braidot-inmobiliaria/
├── public/                      # Assets estáticos
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── FONDO1.jpg      # Background principal
│   ├── components/              # Componentes reutilizables
│   │   ├── Navbar.jsx          # Navegación (z-40)
│   │   ├── PropertyCard.jsx    # Card de propiedad (blanca)
│   │   ├── PropertyModal.jsx   # Modal detalle (z-50)
│   │   ├── PropertyFilter.jsx  # Filtros de búsqueda
│   │   ├── CompareBar.jsx      # Barra de comparación
│   │   ├── WhatsappFloat.jsx   # Botón flotante WhatsApp
│   │   ├── Footer.jsx          # Footer universal
│   │   └── admin/
│   │       └── FormularioPropiedad.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Context de autenticación
│   │   └── CompareContext.jsx  # Context de comparación
│   ├── pages/
│   │   ├── Home.jsx            # Página principal
│   │   ├── PropiedadesPorCategoria.jsx
│   │   ├── Comparar.jsx        # Página de comparación
│   │   └── admin/
│   │       ├── Login.jsx       # Login administrador
│   │       ├── Dashboard.jsx   # Panel principal
│   │       ├── PropiedadesAdmin.jsx
│   │       └── ReservasAdmin.jsx
│   ├── services/
│   │   └── propertyService.js  # API calls a Supabase
│   ├── lib/
│   │   └── supabase.js         # Cliente Supabase
│   ├── App.jsx                 # Router principal
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind globals
├── .env                       # Variables de entorno (NO commitear)
├── .gitignore
├── package.json
├── tailwind.config.js         # Configuración Tailwind
├── vite.config.js            # Configuración Vite
└── vercel.json               # Configuración Vercel
```

---

## 🗄️ Base de Datos

### **Schema SQL (Supabase)**

```sql
-- Tabla de Propiedades
CREATE TABLE propiedades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL,  -- 'Casa', 'Departamento', 'Local', 'Quinta'
  operation TEXT NOT NULL,  -- 'Venta', 'Alquiler', 'Temporaria'
  price NUMERIC,
  location TEXT,
  localidad TEXT,
  provincia TEXT,
  rooms INTEGER,
  bathrooms INTEGER,
  surface NUMERIC,
  patio BOOLEAN DEFAULT false,
  garage BOOLEAN DEFAULT false,
  description TEXT,
  images TEXT[],  -- Array de URLs de imágenes
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Reservas
CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  propiedad_id UUID REFERENCES propiedades(id) ON DELETE CASCADE,
  nombre_cliente TEXT NOT NULL,
  email_cliente TEXT NOT NULL,
  telefono_cliente TEXT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  noches INTEGER,
  precio_total NUMERIC,
  estado TEXT DEFAULT 'pendiente',  -- 'pendiente', 'confirmada', 'cancelada'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para optimización
CREATE INDEX idx_propiedades_operation ON propiedades(operation);
CREATE INDEX idx_propiedades_tipo ON propiedades(tipo);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_reservas_fechas ON reservas(fecha_inicio, fecha_fin);

-- Row Level Security (RLS)
ALTER TABLE propiedades ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (público puede leer, solo auth puede modificar)
CREATE POLICY "Propiedades públicas lectura" ON propiedades
  FOR SELECT TO public USING (true);

CREATE POLICY "Solo autenticados pueden modificar" ON propiedades
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Reservas públicas crear" ON reservas
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Solo autenticados ven todas reservas" ON reservas
  FOR SELECT TO authenticated USING (true);
```

### **Insertar Datos de Prueba**

```sql
INSERT INTO propiedades (titulo, tipo, operation, price, location, rooms, bathrooms, surface, patio, description, images) VALUES
('Casa en San Isidro', 'Casa', 'Venta', 450000, 'San Isidro, Buenos Aires', 4, 3, 250, true, 'Hermosa casa en zona residencial', ARRAY['url1.jpg', 'url2.jpg']),
('Departamento Palermo', 'Departamento', 'Alquiler', 180000, 'Palermo, CABA', 2, 1, 65, false, 'Moderno departamento con amenities', ARRAY['url3.jpg']),
('Quinta en Pilar', 'Quinta', 'Temporaria', 25000, 'Pilar, Buenos Aires', 5, 4, 800, true, 'Quinta con pileta y quincho', ARRAY['url4.jpg', 'url5.jpg']);
```

---

## 🎨 Sistema de Diseño

### **Paleta de Colores**

```javascript
// tailwind.config.js
colors: {
  'braidot-primary-bordo': '#5B0F0F',      // Bordo principal
  'braidot-primary-bordo-light': '#7a1414', // Bordo hover
  'braidot-negro': '#0b0b0b',              // Negro textos
  'braidot-fondo-oscuro': '#171717',        // Fondo oscuro
  'braidot-text-claro': '#F3F4F6',         // Texto claro
}
```

### **Jerarquía Z-Index (Sistema de Capas)**

```
GLOBAL STACK:
├─ z-0 (auto): Contenido base (tarjetas, textos, imágenes)
├─ z-30: AdminButton flotante (esquina inferior izquierda)
├─ z-40: Navbar sticky (SIEMPRE visible al scrollear)
└─ z-50: PropertyModal (overlay completo - tapa todo)
    └─ z-[10000]: Botón cerrar modal (máxima prioridad dentro del modal)
```

**Reglas de Stacking Context:**
- ✅ NO usar `z-index` en contenedores `relative` intermedios
- ✅ Todos los z-index en nivel global para evitar conflictos
- ✅ Navbar SIEMPRE por encima de contenido, SIEMPRE por debajo de modales

### **Responsive Breakpoints**

```javascript
// Tailwind default breakpoints
sm: '640px'   // Tablets pequeños
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
2xl: '1536px' // Large screens

// Optimizado desde 320px (móviles más pequeños)
```

### **Componentes Reutilizables**

#### **PropertyCard**
```jsx
// Card blanca con texto negro para máxima legibilidad
bg-white
text-[#0b0b0b]
shadow-[0_4px_30px_rgba(0,0,0,0.2)]
```

#### **Navbar**
```jsx
// Bordo sólido, sticky, z-40
bg-[#5B0F0F]
sticky top-0 z-40
```

#### **PropertyModal**
```jsx
// Overlay Bordo con blur, z-50
z-50
background: rgba(91, 15, 15, 0.75)
backdrop-blur-sm
```

---

## 🔒 Seguridad

### **Variables de Entorno**

⚠️ **NUNCA** incluyas credenciales reales en el código fuente.

#### **Configuración Segura de .env**

```env
# .env (NO commitear este archivo)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **Obtener Credenciales Supabase**

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto
2. En Settings → API:
   - Copia `Project URL` → `VITE_SUPABASE_URL`
   - Copia `anon/public key` → `VITE_SUPABASE_ANON_KEY`

#### **Buenas Prácticas**

✅ Usa `.env` para todas las credenciales  
✅ `.env` está en `.gitignore`  
✅ Usa variables de entorno en Vercel (Settings → Environment Variables)  
✅ Row Level Security (RLS) activo en Supabase  
✅ Autenticación JWT con tokens seguros  

❌ NO hardcodees emails ni passwords en el código  
❌ NO commitees `.env` al repositorio  
❌ NO expongas API keys en frontend sin protección  

### **Autenticación**

```javascript
// Solo usuarios autenticados pueden:
- Crear/editar/eliminar propiedades
- Ver todas las reservas
- Acceder al panel administrativo

// Usuarios públicos pueden:
- Ver propiedades
- Crear reservas
- Consultar por WhatsApp
```

---

## 🚀 Despliegue

### **Despliegue en Vercel (Recomendado)**

1. **Conectar Repositorio**
   ```bash
   # Desde Vercel Dashboard
   New Project → Import Git Repository → Seleccionar braidot-inmobiliaria
   ```

2. **Configurar Build Settings**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Variables de Entorno**
   ```
   Settings → Environment Variables → Add
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   ```

4. **Deploy**
   ```bash
   # Automático en cada push a main
   git push origin main
   ```

### **Despliegue Manual**

```bash
# Build
npm run build

# El contenido de /dist está listo para servir
# Sube /dist a tu servicio de hosting preferido
```

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ en Mobile/Desktop
- 🚀 **First Contentful Paint**: < 1.5s
- 📦 **Bundle Size**: ~400KB (gzipped)
- 🖼️ **Image Optimization**: Lazy loading + WebP
- 🌐 **CDN**: Edge network de Vercel

---

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor desarrollo (localhost:5173)
npm run build        # Build producción
npm run preview      # Preview del build
npm run lint         # Lint con ESLint
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -m 'Add: nueva feature'`)
4. Push a la branch (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es privado y confidencial. Desarrollado por **Neocode Innovation** para Braidot Inmobiliaria.

---

## 👨‍💻 Créditos

<div align="center">

### Desarrollado por **Neocode Innovation**
*Software Development Agency*

**Lead Developer**: Kevin Marcos Ramirez  
**Tech Stack**: React · Tailwind CSS · Supabase · Vercel  
**Arquitectura**: Mobile-First · JAMstack · BaaS  

---

🏠 **Braidot Inmobiliaria** © 2024-2025  
Todos los derechos reservados.

</div>

---

## 📞 Soporte

Para soporte técnico, contacta a:
- 📧 Email: soporte@ejemplo.com
- 🌐 Web: www.ejemplo.com
- 💬 WhatsApp: +54 9 XXX XXX XXXX

---

<div align="center">

**⭐ Si este proyecto te resulta útil, dale una estrella ⭐**

</div>

# 🏠 Braidot Inmobiliaria - Sistema de Gestión Inmobiliaria

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.84.0-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

Sistema web completo para gestión de propiedades inmobiliarias con panel administrativo, sistema de reservas, comparador de propiedades y formulario de contacto.

> **Estado del Proyecto:** ✅ **COMPLETADO Y EN PRODUCCIÓN**  
> **Última Actualización:** 08/12/2025

---

## 📋 Tabla de Contenidos

- [🎯 Características Principales](#-características-principales)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🎨 Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [🔐 Panel Administrativo](#-panel-administrativo)
- [🗄️ Base de Datos](#️-base-de-datos)
- [📜 Scripts Disponibles](#-scripts-disponibles)
- [🚀 Deploy en Vercel](#-deploy-en-vercel)
- [📞 Contacto](#-contacto)

---

## 🎯 Características Principales

### 🌐 Funcionalidades Públicas
✅ **Catálogo de propiedades** con filtros avanzados (ubicación, tipo, precio, habitaciones, patio)  
✅ **Sistema de reservas** con calendario interactivo y validación de disponibilidad  
✅ **Comparador de propiedades** (hasta 3 simultáneas) con tabla comparativa detallada  
✅ **Formulario de consultas** con almacenamiento en Supabase  
✅ **Botón flotante de WhatsApp** con mensaje predefinido (+54 9 3482 30-5750)  
✅ **Interfaz moderna** con Tailwind CSS, glassmorphism y animaciones fluidas  
✅ **Tabs dinámicos** para venta, alquiler y propiedades temporarias  
✅ **Diseño responsive** optimizado para móviles, tablets y desktop  

### 🔧 Panel Administrativo
✅ **Autenticación segura** con Supabase Auth  
✅ **Dashboard** con estadísticas en tiempo real (propiedades, reservas, consultas)  
✅ **CRUD completo de propiedades** con editor visual  
✅ **Carga de imágenes** por URL o subida directa a Supabase Storage  
✅ **Gestión de reservas** (aprobar, rechazar, cancelar) con filtros y búsqueda  
✅ **Vista detallada** de cada reserva con información del cliente y propiedad  
✅ **Sidebar de navegación** intuitivo con íconos  

---

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **React** | 18.2.0 | Biblioteca JavaScript para interfaces de usuario |
| **React Router DOM** | 7.9.6 | Enrutamiento declarativo para aplicaciones React |
| **Tailwind CSS** | 3.0.0 | Framework CSS utility-first para diseño moderno |
| **Vite** | 5.4.0 | Build tool de nueva generación (downgraded para Vercel) |

### Backend & Servicios
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Supabase** | 2.84.0 | Backend as a Service (BaaS) |
| ↳ PostgreSQL | - | Base de datos relacional |
| ↳ Auth | - | Sistema de autenticación |
| ↳ Storage | - | Almacenamiento de imágenes |
| ↳ Realtime | - | Subscripciones en tiempo real |

### Herramientas de Desarrollo
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **PostCSS** | 8.0.0 | Procesador de CSS con plugins |
| **Autoprefixer** | 10.0.0 | Prefijos CSS automáticos para compatibilidad |
| **dotenv** | 17.2.3 | Gestión de variables de entorno |

---

## 📁 Estructura del Proyecto

```
braidot_inmobiliaria/
│
├── 📂 public/                          # Archivos públicos estáticos
│   ├── FONDO1.jpg                      # Imagen de fondo admin (Dashboard)
│   └── FONDO2.jpg                      # Imagen de fondo admin (Propiedades/Reservas)
│
├── 📂 src/                             # Código fuente principal
│   │
│   ├── 📂 admin/                       # Módulos administrativos legacy
│   │   └── ManageReservations.jsx      # Componente gestión reservas (legacy)
│   │
│   ├── 📂 assets/                      # Recursos estáticos
│   │   └── 📂 images/                  # Imágenes locales (FONDO1.jpg, FONDO2.jpg)
│   │
│   ├── 📂 components/                  # Componentes reutilizables
│   │   ├── 📂 admin/                   # Componentes exclusivos del admin
│   │   │   └── FormularioPropiedad.jsx # Formulario CRUD de propiedades
│   │   │
│   │   ├── AdminSidebar.jsx            # Sidebar del panel admin
│   │   ├── Calendar.jsx                # Componente calendario genérico
│   │   ├── CalendarioReservas.jsx      # Calendario con lógica de reservas
│   │   ├── CompareBar.jsx              # Barra flotante de comparación
│   │   ├── Footer.jsx                  # Footer del sitio público
│   │   ├── FormularioContacto.jsx      # Formulario de consultas
│   │   ├── ModalReserva.jsx            # Modal para crear reservas
│   │   ├── ModernTabs.jsx              # Tabs estilizados (venta/alquiler/temporaria)
│   │   ├── Navbar.jsx                  # Barra de navegación principal
│   │   ├── PropertyCard.jsx            # Tarjeta de propiedad con hover effects
│   │   ├── PropertyFilter.jsx          # Filtros avanzados de propiedades
│   │   ├── PropertyModal.jsx           # Modal de detalles de propiedad
│   │   ├── ReservationForm.jsx         # Formulario de reserva
│   │   ├── Testimonials.jsx            # Sección de testimonios
│   │   ├── WhatsappFloat.jsx           # Botón flotante de WhatsApp
│   │   └── WhyChooseUs.jsx             # Sección "Por qué elegirnos"
│   │
│   ├── 📂 contexts/                    # Contextos de React
│   │   ├── AuthContext.jsx             # Contexto de autenticación global
│   │   └── CompareContext.jsx          # Contexto del comparador de propiedades
│   │
│   ├── 📂 data/                        # Datos estáticos
│   │   └── properties.json             # JSON con propiedades mock (legacy)
│   │
│   ├── 📂 lib/                         # Configuraciones y utilidades
│   │   └── supabase.js                 # Cliente de Supabase configurado
│   │
│   ├── 📂 pages/                       # Páginas principales
│   │   ├── 📂 admin/                   # Páginas del panel administrativo
│   │   │   ├── Dashboard.jsx           # Dashboard con estadísticas
│   │   │   ├── Login.jsx               # Página de login admin
│   │   │   ├── PropiedadesAdmin.jsx    # Gestión de propiedades
│   │   │   └── ReservasAdmin.jsx       # Gestión de reservas
│   │   │
│   │   ├── Comparar.jsx                # Página del comparador
│   │   ├── Home.jsx                    # Página de inicio
│   │   └── PropiedadesPorCategoria.jsx # Listado por categoría
│   │
│   ├── 📂 services/                    # Servicios de datos
│   │   └── propertyService.js          # Servicio de propiedades (API Supabase)
│   │
│   ├── App.jsx                         # Componente raíz con rutas
│   ├── index.css                       # Estilos globales + Tailwind
│   └── main.jsx                        # Punto de entrada de React
│
├── 📄 .env.local                       # Variables de entorno (NO versionar)
├── 📄 .gitignore                       # Archivos ignorados por Git
├── 📄 BASEDEDATOS.txt                  # Script SQL de estructura de base de datos
├── 📄 index.html                       # HTML base
├── 📄 package.json                     # Dependencias y scripts
├── 📄 package-lock.json                # Lock de dependencias
├── 📄 postcss.config.cjs               # Configuración PostCSS
├── 📄 proximos pasos.txt               # Notas de desarrollo
├── 📄 README.md                        # Este archivo
├── 📄 tailwind.config.js               # Configuración de Tailwind CSS
└── 📄 vite.config.js                   # Configuración de Vite
```

### 📊 Estadísticas del Proyecto
- **Total de componentes React:** 22
- **Total de páginas:** 7 (4 públicas + 3 admin)
- **Total de contextos:** 2 (Auth, Compare)
- **Total de servicios:** 1 (propertyService)
- **Líneas de código:** ~7,500+

---

## ⚡ Instalación y Configuración

### 📋 Requisitos Previos
- Node.js **16.0.0 o superior**
- npm **7.0.0 o superior**
- Cuenta activa en [Supabase](https://supabase.com)
- Git instalado

### 🚀 Instalación Paso a Paso

#### 1. Clonar el repositorio
```bash
git clone https://github.com/kevinramirezok/Braidot_Inmobiliaria.git
cd Braidot_Inmobiliaria
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

> ⚠️ **Importante:** Las variables deben comenzar con `VITE_` para ser accesibles en el cliente.

**¿Dónde obtengo estas credenciales?**
1. Ir a [Supabase Dashboard](https://app.supabase.com)
2. Seleccionar tu proyecto
3. Settings → API
4. Copiar `URL` y `anon/public key`

#### 4. Configurar Base de Datos en Supabase

Ejecutar el script SQL del archivo `BASEDEDATOS.txt`:

1. Ir a SQL Editor en Supabase
2. Crear nueva query
3. Copiar el contenido de `BASEDEDATOS.txt`
4. Ejecutar el script

Esto creará las tablas:
- `propiedades`
- `reservas`
- `consultas`

#### 5. Configurar Storage (Imágenes)

En Supabase Dashboard:
1. Storage → Create Bucket
2. Nombre: `property-images`
3. Public bucket: ✅ Sí
4. File size limit: 5MB

#### 6. Iniciar servidor de desarrollo
```bash
npm run dev
```

🎉 El proyecto estará disponible en: **http://localhost:5173**

---

## 🎨 Funcionalidades Detalladas

### 1️⃣ Catálogo de Propiedades

**Ubicación:** Página principal (`src/pages/Home.jsx`)

**Características:**
- **Tabs dinámicos** para separar por operación (Venta, Alquiler, Temporaria)
- **Filtros avanzados:**
  - 📍 Ubicación (localidad)
  - 🚪 Cantidad de ambientes (1, 2, 3, 4+)
  - 🏠 Tipo de propiedad (Casa, Departamento, Local, Terreno, etc.)
  - 🌳 Con/sin patio
  - 💰 Precio máximo
- **Tarjetas de propiedades** con:
  - Imagen principal con hover zoom
  - Badge de operación (Venta/Alquiler/Temporaria)
  - Precio destacado
  - Ubicación, ambientes, baños, cocheras
  - Botón "Ver Detalles"
  - **Botón de comparación** (agregar hasta 3 propiedades)
- **Botón "Ver Todos"** para categoría completa

**Tecnologías:**
- React Hooks (`useState`, `useEffect`)
- Context API (CompareContext)
- Tailwind CSS con efectos glassmorphism

---

### 2️⃣ Sistema de Reservas

**Ubicación:** Modal de reserva (`src/components/ModalReserva.jsx`)

**Flujo de reserva:**

**Paso 1: Selección de fechas**
- Calendario interactivo con:
  - ✅ Fechas disponibles (verdes)
  - ❌ Fechas ocupadas (rojas)
  - 🟡 Rango seleccionado (amarillo)
- Navegación por meses
- Validación:
  - No permite fechas pasadas
  - Bloquea fechas con reservas PENDIENTES o CONFIRMADAS
  - Mínimo 1 noche

**Paso 2: Formulario de datos**
- Campos requeridos:
  - 👤 Nombre completo
  - 📧 Email
  - 📱 Teléfono
  - 👥 Cantidad de personas
  - 💬 Mensaje (opcional)
- Resumen de reserva:
  - Fechas seleccionadas
  - Cantidad de noches
  - Precio total (calculado automáticamente)

**Paso 3: Confirmación**
- Guardado en Supabase (tabla `reservas`)
- Estado inicial: `pendiente`
- Mensaje de WhatsApp automático al número configurado

**Calendario de Reservas:**
```jsx
// src/components/CalendarioReservas.jsx
- Código colores: Verde (disponible), Rojo (ocupado), Amarillo (seleccionado)
- Consulta en tiempo real a Supabase
- Prevención de doble reserva
```

---

### 3️⃣ Comparador de Propiedades

**Ubicación:** Página comparar (`src/pages/Comparar.jsx`)

**Características:**
- **Hasta 3 propiedades simultáneas**
- **Barra flotante inferior** (`CompareBar.jsx`) muestra propiedades seleccionadas
- **Tabla comparativa** con:
  - 🏷️ Operación
  - 🏠 Tipo de propiedad
  - 💰 Precio
  - 📍 Localidad y provincia
  - 📫 Dirección y barrio
  - 🚪 Ambientes
  - 🚿 Baños
  - 🚗 Cocheras
  - 📐 M² cubiertos y terreno
  - 🌳 Patio (Sí/No)
  - 🕐 Horarios check-in/check-out
- **Persistencia:** Guardado en `localStorage`
- **Indicadores visuales:**
  - 🟢 Mejor valor (verde)
  - 🔴 Peor valor (rojo)
  - 🟡 Valor intermedio (amarillo)

**Uso:**
1. Hacer clic en el botón de comparación en cualquier propiedad
2. La barra flotante aparece automáticamente
3. Agregar hasta 3 propiedades
4. Clic en "Comparar Ahora"
5. Ver tabla comparativa completa

---

### 4️⃣ Formulario de Contacto

**Ubicación:** Página principal (`src/components/FormularioContacto.jsx`)

**Funcionalidad:**
- **Campos:**
  - 👤 Nombre
  - 📧 Email
  - 📱 Teléfono
  - 💬 Mensaje
- **Validación en cliente** (HTML5)
- **Guardado en Supabase** (tabla `consultas`)
- **Estado inicial:** `pendiente`
- **Feedback visual:**
  - ✅ Mensaje de éxito (verde)
  - ❌ Mensaje de error (rojo)
- **Auto-limpieza** del formulario tras envío exitoso

---

### 5️⃣ WhatsApp Flotante

**Ubicación:** Botón flotante (`src/components/WhatsappFloat.jsx`)

**Características:**
- **Posición fija:** Bottom-right (encima del footer)
- **Número:** +54 9 3482 30-5750
- **Mensaje predefinido:** "Hola! Estoy interesado en una propiedad de Braidot Inmobiliaria"
- **Tooltip animado:** "¿Necesitás ayuda? 💬" (desaparece tras 5s)
- **Ícono SVG** de WhatsApp con animación hover
- **Abre en nueva pestaña** con formato `wa.me`

---

## 🔐 Panel Administrativo

### 🚪 Acceso

**URL:** `/admin/login`  
**Botón flotante:** Esquina inferior izquierda en páginas públicas (ícono candado 🔒)

**Autenticación:**
- Email y contraseña con Supabase Auth
- Sesión persistente con `localStorage`
- Rutas protegidas con `ProtectedRoute`

---

### 📊 Dashboard (`/admin/dashboard`)

**Estadísticas en Tiempo Real:**

| Métrica | Descripción |
|---------|-------------|
| 🏠 Total Propiedades | Cantidad total de propiedades activas |
| 💰 Propiedades en Venta | Filtradas por `operation = 'Venta'` |
| 🏡 Propiedades en Alquiler | Filtradas por `operation = 'Alquiler'` |
| ⏱️ Propiedades Temporarias | Filtradas por `operation = 'Temporaria'` |
| 📧 Consultas | Total de consultas recibidas |
| 🔔 Reservas Pendientes | Estado `pendiente` |
| ✅ Reservas Confirmadas | Estado `confirmada` |

**Tarjetas con:**
- Ícono representativo
- Valor numérico destacado
- Descripción
- Animación hover con gradientes

**Acciones rápidas:**
- 🏠 Gestionar Propiedades
- 📅 Ver Reservas
- 🚪 Cerrar Sesión

---

### 🏠 Gestión de Propiedades (`/admin/propiedades`)

**Tabla de Propiedades:**
- Columnas: Imagen, Título, Ubicación, Precio, Operación, Estado
- Ordenadas por fecha de creación (más recientes primero)
- **Acciones:**
  - ✏️ Editar
  - 🗑️ Eliminar (con confirmación)

**Formulario de Propiedad:**
(`src/components/admin/FormularioPropiedad.jsx`)

**Campos Obligatorios:**
- 📝 Título
- 📄 Descripción
- 💰 Precio
- 🏷️ Operación (Venta/Alquiler/Temporaria)
- 📍 Localidad
- 🗺️ Provincia
- 📫 Dirección
- 🏘️ Barrio

**Características:**
- 🚪 Ambientes (número)
- 🚿 Baños (número)
- 🚗 Cocheras (número)
- 📐 M² cubiertos
- 🏞️ M² terreno
- 🏠 Tipo (Casa, Departamento, Local, etc.)
- 🌳 Tiene patio (checkbox)

**Servicios disponibles:**
- 💡 Luz
- 💧 Agua
- 🔥 Gas
- 📡 Internet
- 🔒 Seguridad
- 🏊 Piscina
- 🏋️ Gimnasio
- 🅿️ Estacionamiento

**Imágenes:**
- **Opción 1:** URLs separadas por comas
- **Opción 2:** Upload de archivos (hasta 5 imágenes)
  - Subida automática a Supabase Storage
  - Bucket: `property-images`
  - Generación de URLs públicas

**Horarios (solo temporarias):**
- 🕐 Check-in (default: 14:00)
- 🕐 Check-out (default: 10:00)

**Estados:**
- ✅ Activa (visible en web pública)
- ⭐ Destacada (aparece primero)

**Validaciones:**
- Todos los campos obligatorios
- Precio > 0
- Al menos 1 imagen
- Formato de URLs válido

---

### 📅 Gestión de Reservas (`/admin/reservas`)

**Tabla de Reservas:**
- Columnas: Propiedad, Cliente, Fechas, Personas, Estado, Acciones
- **Información mostrada:**
  - 🏠 Imagen y título de propiedad
  - 👤 Nombre del cliente
  - 📧 Email
  - 📱 Teléfono
  - 📅 Rango de fechas
  - 👥 Cantidad de personas
  - 💬 Mensaje del cliente
  - 📊 Estado actual

**Filtros:**
- 🔍 Búsqueda por nombre o email
- 📋 Filtro por estado:
  - Todas
  - Pendientes
  - Confirmadas
  - Rechazadas
  - Canceladas

**Acciones disponibles:**

| Estado Actual | Acciones Disponibles |
|---------------|---------------------|
| Pendiente | ✅ Confirmar / ❌ Rechazar |
| Confirmada | 🚫 Cancelar |
| Rechazada | - |
| Cancelada | - |

**Vista Detallada (Modal):**
- Información completa de la reserva
- Datos del cliente
- Detalles de la propiedad
- Fechas y noches
- Precio total calculado
- Historial de estados

---

## 🗄️ Base de Datos

### 📊 Esquema de Tablas

#### 1. `propiedades`
```sql
CREATE TABLE propiedades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('Venta', 'Alquiler', 'Temporaria')),
  localidad TEXT NOT NULL,
  provincia TEXT NOT NULL,
  direccion TEXT,
  barrio TEXT,
  ambientes INTEGER DEFAULT 1,
  banos INTEGER DEFAULT 1,
  cocheras INTEGER DEFAULT 0,
  metros_cuadrados NUMERIC,
  metros_terreno NUMERIC,
  tipo TEXT CHECK (tipo IN ('Casa', 'Departamento', 'Local', 'Terreno', 'Oficina', 'Galpón')),
  imagenes TEXT[] NOT NULL,
  servicios TEXT[],
  tiene_patio BOOLEAN DEFAULT false,
  activa BOOLEAN DEFAULT true,
  destacada BOOLEAN DEFAULT false,
  checkin_hora TIME DEFAULT '14:00',
  checkout_hora TIME DEFAULT '10:00',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Índices:**
```sql
CREATE INDEX idx_propiedades_operation ON propiedades(operation);
CREATE INDEX idx_propiedades_activa ON propiedades(activa);
CREATE INDEX idx_propiedades_localidad ON propiedades(localidad);
```

---

#### 2. `reservas`
```sql
CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  propiedad_id UUID REFERENCES propiedades(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  personas INTEGER DEFAULT 1,
  mensaje TEXT,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'rechazada', 'cancelada')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Índices:**
```sql
CREATE INDEX idx_reservas_propiedad ON reservas(propiedad_id);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_reservas_fechas ON reservas(fecha_inicio, fecha_fin);
```

---

#### 3. `consultas`
```sql
CREATE TABLE consultas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  mensaje TEXT NOT NULL,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'contactado')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Índices:**
```sql
CREATE INDEX idx_consultas_estado ON consultas(estado);
```

---

### 🪣 Supabase Storage

**Bucket:** `property-images`

**Configuración:**
- Public: ✅ Sí
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`
- File size limit: 5MB
- Path: `/propiedades/{uuid}/{filename}`

**Políticas RLS (Row Level Security):**
```sql
-- Permitir lectura pública
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

-- Permitir subida autenticada
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en http://localhost:5173
                    # Hot Module Replacement (HMR) activo
                    # Abre automáticamente en navegador

# Producción
npm run build        # Construye la aplicación para producción
                    # Salida: /dist
                    # Minificado, optimizado y tree-shaking

npm run preview      # Previsualiza el build de producción localmente
                    # Simula entorno de producción
                    # URL: http://localhost:4173
```

### 🔧 Configuración de Scripts

**package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🚀 Deploy en Vercel

### 📋 Requisitos Previos
- Repositorio en GitHub
- Cuenta en [Vercel](https://vercel.com)
- Variables de entorno de Supabase

---

### 🎯 Pasos de Deploy

#### 1. Conectar Repositorio
1. Ir a [Vercel Dashboard](https://vercel.com/dashboard)
2. Clic en **"New Project"**
3. Importar repositorio de GitHub: `kevinramirezok/Braidot_Inmobiliaria`

#### 2. Configurar Proyecto
- **Framework Preset:** Vite
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### 3. Variables de Entorno
Agregar en Settings → Environment Variables:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `VITE_SUPABASE_URL` | `https://gjmlxmtswsrfimdosiyu.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Production, Preview, Development |

> ⚠️ **Importante:** Marcar para todos los entornos (Production, Preview, Development)

#### 4. Deploy
1. Clic en **"Deploy"**
2. Esperar finalización del build (~2 minutos)
3. URL generada automáticamente: `https://braidot-inmobiliaria.vercel.app`

---

### 🔄 Redeploy Automático
Vercel detecta automáticamente:
- Push a rama `main` → Deploy a producción
- Pull request → Preview deployment
- Commit específico → Preview deployment

---

### 🐛 Solución de Problemas

#### Error 126: Permission Denied
**Causa:** Vite 7.x incompatible con Vercel  
**Solución:** Downgrade a Vite 5.4.0
```bash
npm install vite@5.4.0 @vitejs/plugin-react@4.3.0 --save-exact
```

#### 404 en Imágenes de Fondo
**Causa:** Vercel no copia `public/` sin `publicDir` explícito  
**Solución:** Agregar en `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // ← IMPORTANTE
});
```

#### node_modules en Repo
**Causa:** `node_modules/` commiteado por error  
**Solución:**
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from repo"
git push
```

---

### 📊 Build Stats
- **Build Time:** ~90 segundos
- **Bundle Size:** ~800 KB (gzipped)
- **Assets:** ~2 MB (imágenes de fondo)

---

## 📞 Contacto

### 🏢 Braidot Inmobiliaria

📱 **WhatsApp:** [+54 9 3482 30-5750](https://wa.me/5493482305750)  
📧 **Email:** contacto@braidotinmobiliaria.com  
🌐 **Web:** [braidot-inmobiliaria.vercel.app](https://braidot-inmobiliaria.vercel.app)  
📍 **Ubicación:** Argentina

---

### 👨‍💻 Desarrollador

**Kevin Marcos Ramirez**  
💼 Full Stack Developer  
📧 kevinramirezok@gmail.com  
🔗 [GitHub](https://github.com/kevinramirezok)  

---

## 📄 Licencia

© 2025 **Braidot Inmobiliaria**. Todos los derechos reservados.

Este proyecto es **propietario** y confidencial. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.

---

## 🙏 Agradecimientos

- **Supabase** por la infraestructura backend
- **Vercel** por el hosting y deploy automático
- **Tailwind CSS** por el sistema de diseño
- **React Team** por la increíble biblioteca

---

## 📝 Changelog

### v1.0.0 - 08/12/2025
✅ Lanzamiento oficial en producción  
✅ Sistema completo de propiedades, reservas y consultas  
✅ Panel administrativo funcional  
✅ Comparador de propiedades  
✅ Integración con WhatsApp  
✅ Deploy en Vercel  

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub! ⭐**

[![GitHub](https://img.shields.io/badge/GitHub-kevinramirezok%2FBraidot__Inmobiliaria-181717?style=for-the-badge&logo=github)](https://github.com/kevinramirezok/Braidot_Inmobiliaria)

</div>

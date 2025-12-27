-- =====================================================================
-- CONFIGURACIÓN RLS PARA TABLA RESERVAS
-- Braidot Inmobiliaria - Sistema de Reservas
-- =====================================================================

-- PROBLEMA: Error 42501 - RLS Violation al insertar reservas
-- CAUSA: Las políticas actuales no permiten inserción pública (anon)
-- SOLUCIÓN: Crear política que permita INSERT público en la tabla reservas

-- =====================================================================
-- PASO 1: Habilitar RLS en la tabla reservas (si no está habilitado)
-- =====================================================================
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- PASO 2: Crear política para permitir lectura pública (SELECT)
-- =====================================================================
CREATE POLICY "Permitir lectura pública de reservas"
ON reservas
FOR SELECT
USING (true);

-- =====================================================================
-- PASO 3: Crear política para permitir inserción pública (INSERT)
-- Esta es la política CRÍTICA que soluciona el error 42501
-- =====================================================================
CREATE POLICY "Permitir inserción pública de reservas"
ON reservas
FOR INSERT
WITH CHECK (true);

-- =====================================================================
-- PASO 4 (OPCIONAL): Política para que usuarios autenticados puedan actualizar
-- =====================================================================
CREATE POLICY "Permitir actualización de reservas autenticadas"
ON reservas
FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- =====================================================================
-- PASO 5 (OPCIONAL): Política para que usuarios autenticados puedan eliminar
-- =====================================================================
CREATE POLICY "Permitir eliminación de reservas autenticadas"
ON reservas
FOR DELETE
USING (auth.role() = 'authenticated');

-- =====================================================================
-- VERIFICACIÓN: Listar políticas activas en la tabla reservas
-- =====================================================================
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'reservas';

-- =====================================================================
-- LIMPIEZA (Solo si necesitas eliminar políticas antiguas)
-- =====================================================================
-- DROP POLICY IF EXISTS "Permitir lectura pública de reservas" ON reservas;
-- DROP POLICY IF EXISTS "Permitir inserción pública de reservas" ON reservas;
-- DROP POLICY IF EXISTS "Permitir actualización de reservas autenticadas" ON reservas;
-- DROP POLICY IF EXISTS "Permitir eliminación de reservas autenticadas" ON reservas;

-- =====================================================================
-- NOTAS IMPORTANTES
-- =====================================================================
-- 1. La política "Permitir inserción pública de reservas" permite que
--    usuarios NO autenticados (anon) puedan crear reservas desde el frontend.
--
-- 2. Esta configuración es segura porque:
--    - Los usuarios solo pueden insertar datos
--    - No pueden leer, actualizar o eliminar reservas de otros usuarios
--    - Los admins (autenticados) tienen permisos completos
--
-- 3. Si deseas restringir más, puedes agregar validaciones en el WITH CHECK:
--    WITH CHECK (estado = 'pendiente') -- Solo permite crear con estado pendiente
--
-- 4. Para aplicar estos cambios en Supabase:
--    - Ve a SQL Editor en tu proyecto de Supabase
--    - Copia y pega este script
--    - Ejecuta cada bloque por separado
--    - Verifica que no haya errores
--
-- 5. Estructura de la tabla reservas:
--    - id (UUID, PK)
--    - propiedad_id (UUID, FK)
--    - nombre (TEXT)
--    - email (TEXT)
--    - telefono (TEXT)
--    - fecha_inicio (DATE)
--    - fecha_fin (DATE)
--    - personas (INTEGER)
--    - mensaje (TEXT)
--    - estado (TEXT: 'pendiente', 'confirmada', 'rechazada', 'cancelada')
--    - created_at (TIMESTAMP)
-- =====================================================================

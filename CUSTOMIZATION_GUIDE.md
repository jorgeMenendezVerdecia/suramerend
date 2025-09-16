# Guía de Personalización - Petro-NDT Solutions

Esta guía describe cada sección de la página web y qué información debe ser modificada según los datos reales de su empresa.

## 🧭 Navegación (Navigation)

**Archivo:** `src/components/Navigation.tsx`

### Información a personalizar:
- **Nombre de la empresa:** Actualmente "Petro-NDT Solutions" (línea 23)
- **Enlaces del menú:** Verificar que las secciones coincidan con su estructura deseada
- **Texto del botón CTA:** "Solicitar Cotización" - ajustar según su preferencia

---

## 🎯 Sección Principal (Hero Section)

**Archivo:** `src/components/HeroSection.tsx`

### Información a personalizar:
- **Título principal:** "Ensayos No Destructivos de Clase Mundial" (líneas 19-22)
- **Subtítulo/Descripción:** Texto sobre proteger integridad de activos petroleros (líneas 24-27)
- **Imagen de fondo:** `src/assets/hero-ndt-testing.jpg` - reemplazar con imagen real
- **Alt de imagen:** Descripción actual del técnico NDT (línea 11)

### Estadísticas a actualizar:
- **100% Cumplimiento Normativo** (línea 43) - verificar porcentaje real
- **ASNT Certificaciones** (línea 50) - actualizar con certificaciones reales
- **15+ Años de Experiencia** (línea 57) - ajustar años reales de experiencia

---

## 🔧 Sección de Servicios (Services Section)

**Archivo:** `src/components/ServicesSection.tsx`

### Servicios actuales a revisar/personalizar:
1. **Inspección por Ultrasonido**
   - Descripción y beneficios (líneas 8-18)
   - Imagen: `src/assets/ultrasonic-equipment.jpg`

2. **Líquidos Penetrantes**
   - Descripción y beneficios (líneas 19-28)
   - Imagen: placeholder actual

3. **Partículas Magnéticas**
   - Descripción y beneficios (líneas 29-38)
   - Imagen: `src/assets/magnetic-particle.jpg`

4. **Radiografía Industrial**
   - Descripción y beneficios (líneas 39-48)
   - Imagen: `src/assets/radiography.jpg`

5. **Termografía Infrarroja**
   - Descripción y beneficios (líneas 49-58)
   - Imagen: placeholder actual

6. **Inspección Visual**
   - Descripción y beneficios (líneas 59-68)
   - Imagen: placeholder actual

### Acciones requeridas:
- Verificar que todos los servicios sean ofrecidos por su empresa
- Actualizar descripciones con especificaciones técnicas reales
- Reemplazar imágenes placeholder con fotografías reales de equipos
- Agregar o eliminar servicios según corresponda

---

## 💻 Sección de Tecnologías (Technologies Section)

**Archivo:** `src/components/TechnologiesSection.tsx`

### Información a personalizar:

#### Tecnologías (líneas 6-24):
1. **Equipos de Última Generación**
   - Features actuales: Ultrasonido phased array, Equipos digitales, Software avanzado
2. **Certificaciones Internacionales**
   - Features actuales: ASNT Level III, ISO 9712, Certificaciones API
3. **Cumplimiento Normativo**
   - Features actuales: ASME, API 510/570/653, Normas internacionales

#### Certificaciones (líneas 26-35):
Actualizar con certificaciones reales de su empresa:
- ASNT Level III
- ISO 9712 Certified
- API 510 Certified
- API 570 Certified
- API 653 Certified
- ASME Section V
- AWS D1.1 Certified
- NACE Level 2

### Acciones requeridas:
- Verificar equipos reales disponibles
- Actualizar lista de certificaciones con las que posee la empresa
- Modificar características técnicas según capacidades reales

---

## 📊 Sección de Proyectos (Projects Section)

**Archivo:** `src/components/ProjectsSection.tsx`

### Proyectos actuales (TODOS son ejemplos - reemplazar):

1. **Refinería Talara - Inspección de Tanques**
   - Cliente, ubicación, descripción, resultados (líneas 8-18)

2. **Plataforma Marina Norte - Mantenimiento Preventivo**
   - Cliente, ubicación, descripción, resultados (líneas 19-29)

3. **Oleoducto Principal - Evaluación de Integridad**
   - Cliente, ubicación, descripción, resultados (líneas 30-40)

### Acciones requeridas:
- **CRÍTICO:** Reemplazar TODOS los proyectos con casos reales
- Si no tiene casos reales, usar proyectos hipotéticos más genéricos
- Actualizar nombres de clientes (usar nombres reales o genéricos como "Cliente Confidencial")
- Modificar ubicaciones según su área de operación
- Ajustar métricas y resultados con datos reales

---

## 👥 Sección Acerca de (About Section)

**Archivo:** `src/components/AboutSection.tsx`

### Información a personalizar:
- **Historia de la empresa:** Texto actual es genérico (líneas 12-16)
- **Misión:** Statement actual sobre liderazgo en END (líneas 20-23)
- **Valores:** Lista actual de valores empresariales (líneas 27-33)
- **Estadísticas de experiencia:** 
  - Años de experiencia (línea 40)
  - Proyectos completados (línea 47)
  - Clientes satisfechos (línea 54)

### Acciones requeridas:
- Escribir historia real de la empresa
- Definir misión y valores corporativos reales
- Actualizar estadísticas con números reales
- Considerar agregar fotografías del equipo directivo

---

## 📞 Sección de Contacto (Contact Section)

**Archivo:** `src/components/ContactSection.tsx`

### Información de contacto a actualizar:
- **Dirección:** "Av. Principal 123, Lima, Perú" (línea 74)
- **Teléfono:** "+51 1 234-5678" (línea 81)
- **Email:** "contacto@petro-ndt.com" (línea 88)
- **Horarios:** "Lunes a Viernes: 8:00 AM - 6:00 PM" (línea 95)

### Formulario de contacto:
El formulario funcional está implementado pero requiere:
- Configurar backend para envío de emails
- Definir donde se enviarán los mensajes
- Personalizar campos si es necesario

---

## 🔗 Footer

**Archivo:** `src/components/Footer.tsx`

### Información a actualizar:
- **Descripción de la empresa:** Texto introductorio (líneas 9-12)
- **Enlaces rápidos:** Verificar que coincidan con secciones reales
- **Información de contacto:** Mismo que sección de contacto
- **Enlaces legales:** "Términos de Servicio" y "Política de Privacidad" (líneas 65-72)
  - Actualmente son enlaces placeholder, necesitan páginas reales

---

## 🎨 Elementos Visuales

### Imágenes a reemplazar:
1. `src/assets/hero-ndt-testing.jpg` - Imagen principal del hero
2. `src/assets/ultrasonic-equipment.jpg` - Equipo de ultrasonido
3. `src/assets/magnetic-particle.jpg` - Equipo de partículas magnéticas
4. `src/assets/radiography.jpg` - Equipo de radiografía

### Recomendaciones para imágenes:
- Usar fotografías reales de su equipo y personal
- Mantener calidad profesional
- Asegurar que tengan derechos de uso
- Optimizar para web (formato WebP recomendado)

---

## 🔍 SEO y Metadatos

**Archivo:** `index.html`

### Información a personalizar:
- **Title:** Actualmente optimizado para END petrolero
- **Meta description:** Descripción actual sobre servicios NDT
- **Keywords:** Ajustar según términos de búsqueda objetivo

---

## ✅ Lista de Verificación

### Información Esencial:
- [ ] Nombre real de la empresa
- [ ] Años reales de experiencia
- [ ] Certificaciones reales poseídas
- [ ] Servicios realmente ofrecidos
- [ ] Información de contacto real
- [ ] Proyectos/casos de éxito reales
- [ ] Historia y valores empresariales

### Elementos Visuales:
- [ ] Fotografías reales del equipo
- [ ] Imágenes del personal trabajando
- [ ] Logos de certificaciones reales
- [ ] Fotografías de proyectos completados

### Funcionalidades:
- [ ] Configurar formulario de contacto
- [ ] Crear páginas legales (términos, privacidad)
- [ ] Configurar analytics de seguimiento
- [ ] Optimizar para motores de búsqueda locales

---

## 🚀 Próximos Pasos Recomendados

1. **Recopilar información real** de la empresa
2. **Obtener fotografías profesionales** de equipos y personal
3. **Definir casos de éxito** o proyectos representativos
4. **Configurar funcionalidades de contacto**
5. **Revisar y aprobar todo el contenido** antes del lanzamiento

---

*Esta guía le ayudará a transformar el sitio web plantilla en una representación auténtica y profesional de su empresa de Ensayos No Destructivos.*
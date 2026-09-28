# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y el proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/) (X.Y.Z).

## [1.0.1] - 2026-09-28

### Corregido
- `package-lock.json` regenerado con npm 10 para marcar los paquetes opcionales de
  plataforma como `optional` en lugar de `extraneous`, evitando el error `EBADPLATFORM`
  en `npm ci` del build de integración git de Cloudflare Pages.

## [1.0.0] - 2026-09-28

### Añadido
- Accesibilidad del certificado de acreditación: el archivo `SAE-ACR-0325-2026.pdf`
  ahora se sirve de forma pública en `/SAE-ACR-0325-2026.pdf`.
- Botón "Certificado de Acreditación SAE" en la sección "Tecnología y Certificaciones"
  (`src/components/TechnologiesSection.tsx`) que abre el PDF en una pestaña nueva.

### Cambiado
- El enlace "Certificaciones" del pie de página (`src/components/Footer.tsx`) ahora
  apunta a la sección `#tecnologias` en lugar de `#`.

### Corregido
- Conflicto de dependencias: `@vitejs/plugin-react-swc` actualizado de `^3.11.0` a
  `^4.3.3` para soportar `vite@8`. Ya no es necesario instalar con
  `--legacy-peer-deps`; un `npm install` normal resuelve correctamente.

### Seguridad / Mantenimiento
- `vite` se resuelve a `8.3.1` y `lovable-tagger` a `1.3.5` (dentro de los rangos
  declarados), sin conflictos de pares.

## [0.0.0] - versión previa (sin versionar)

Estado inicial del sitio corporativo antes de introducir el versionado semántico.

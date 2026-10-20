# VTAV Frontend

Boilerplate reutilizable para el desarrollo de interfaces web con **Vite, Tailwind CSS v4 y Astro**, con Vue como integración opcional para componentes interactivos.

El proyecto parte de la plantilla minimalista oficial de Astro y añade una base de estilos modular, fuentes locales y tokens tipográficos reutilizables para futuros proyectos.

> **Estado:** desarrollo inicial. La configuración base de Astro, Tailwind CSS y las fuentes tipográficas está implementada y verificada localmente.

## Stack tecnológico

| Tecnología                                  | Propósito                                               |
| ------------------------------------------- | ------------------------------------------------------- |
| [Astro](https://astro.build/)               | Framework principal para páginas y sitios web estáticos |
| [Vite](https://vite.dev/)                   | Herramienta de desarrollo y compilación                 |
| [Tailwind CSS v4](https://tailwindcss.com/) | Sistema de utilidades CSS y tokens de diseño            |
| [Vue](https://vuejs.org/)                   | Integración opcional para componentes interactivos      |
| [pnpm](https://pnpm.io/)                    | Gestor de paquetes del proyecto                         |

### Principios del proyecto

- **Static-first:** priorizar sitios informativos y páginas estáticas con Astro.
- **Componentes reutilizables:** establecer una biblioteca de interfaz consistente y extensible.
- **Estilos modulares:** separar la entrada global, los tokens, las fuentes y los estilos futuros.
- **Tipografía semántica:** consumir las fuentes mediante roles, no mediante nombres específicos de cada familia.
- **Dependencias justificadas:** incorporar herramientas adicionales únicamente cuando aporten valor al proyecto.
- **Compilación optimizada:** utilizar el flujo de producción de Vite a través de Astro.

## Requisitos

- Node.js compatible con la versión de Astro instalada. Consulta el campo `engines` de `package.json`.
- pnpm.
- Git.

## Instalación y desarrollo

Clona el repositorio y accede a su directorio. Después, ejecuta:

```bash
pnpm install
pnpm dev
```

Abre la dirección local que indique la terminal, normalmente `http://localhost:4321`.

## Comandos disponibles

Todos los comandos se ejecutan desde la raíz del proyecto.

| Comando                        | Descripción                                     |
| ------------------------------ | ----------------------------------------------- |
| `pnpm dev`                     | Inicia el servidor local de desarrollo          |
| `pnpm build`                   | Compila el sitio para producción en `dist/`     |
| `pnpm preview`                 | Permite previsualizar localmente la compilación |
| `pnpm astro -- --help`         | Muestra la ayuda de la CLI de Astro             |
| `pnpm astro add <integration>` | Añade una integración compatible de Astro       |

Para comprobar la compilación de producción:

```bash
pnpm build
pnpm preview
```

La salida configurada actualmente es estática. La compilación de producción procesa los estilos mediante Vite, incluido el CSS generado por Tailwind CSS.

> `pnpm astro check` puede requerir dependencias adicionales de comprobación y compatibilidad entre versiones. No forma parte de los requisitos actuales de compilación.

## Estructura del proyecto

```text
/
├── public/                    # Recursos estáticos con rutas fijas
├── src/
│   ├── assets/
│   │   └── fonts/
│   │       ├── body/          # Fuentes para texto general
│   │       ├── heading/       # Fuentes para títulos
│   │       └── accent/        # Fuentes para elementos alternativos
│   ├── components/            # Componentes reutilizables (por desarrollar)
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   ├── layouts/               # Layouts compartidos (por desarrollar)
│   ├── pages/                 # Páginas y rutas de Astro
│   │   └── index.astro
│   ├── styles/
│   │   ├── global.css         # Entrada global de estilos
│   │   ├── tokens.css         # Tokens de diseño
│   │   └── fonts.css          # Declaraciones @font-face
│   └── data/                  # Datos estáticos compartidos (futuro)
├── astro.config.mjs           # Configuración de Astro y Vite
├── package.json
├── pnpm-lock.yaml
└── README.md
```

Los directorios marcados como futuros o por desarrollar representan la estructura objetivo; no necesariamente contienen archivos todavía.

### Páginas y recursos

Astro detecta las páginas `.astro` y otros formatos compatibles dentro de `src/pages/`. El nombre y la ubicación del archivo determinan la ruta correspondiente.

Los recursos pueden ubicarse en:

- `src/assets/`: recursos importados desde el código y procesados por la cadena de compilación cuando corresponda.
- `public/`: archivos copiados sin procesamiento y disponibles mediante rutas públicas estables.

## Sistema de estilos

### Integración de Tailwind CSS v4

Tailwind se integra mediante el plugin oficial de Vite, configurado en `astro.config.mjs`.

El archivo `src/styles/global.css` es el punto de entrada de los estilos:

```css
@import "tailwindcss";
@import "./tokens.css";
@import "./fonts.css";
```

Las páginas importan la entrada global desde su frontmatter:

```astro
---
import "../styles/global.css";
---
```

Los estilos de producción se procesan durante `pnpm build`. No se requiere ejecutar una compilación manual de Tailwind por separado.

### Tokens tipográficos

Los roles tipográficos se definen en `src/styles/tokens.css` mediante el sistema `@theme` de Tailwind CSS v4:

```css
@theme {
  --font-body: "Inter", sans-serif;
  --font-heading: "Ubuntu", sans-serif;
  --font-accent: "JetBrains Mono", monospace;
}
```

Esto permite utilizar las siguientes clases:

| Clase          | Uso previsto                              |
| -------------- | ----------------------------------------- |
| `font-body`    | Párrafos, descripciones y texto general   |
| `font-heading` | Títulos y subtítulos                      |
| `font-accent`  | Badges, labels, tags y elementos técnicos |

Los componentes deben consumir estos roles semánticos para facilitar el cambio de identidad visual sin modificar cada componente.

### Fuentes locales

Las fuentes se almacenan en `src/assets/fonts/` y se registran mediante `@font-face` en `src/styles/fonts.css`.

| Rol     | Archivo                               | Peso configurado                   |
| ------- | ------------------------------------- | ---------------------------------- |
| Heading | `heading/Ubuntu-Medium.woff2`         | 500                                |
| Heading | `heading/Ubuntu-Bold.woff2`           | 700                                |
| Body    | `body/Inter-Variable.woff2`           | Variable, configurado como 100–900 |
| Accent  | `accent/JetBrainsMono-Variable.woff2` | Variable, configurado como 100–900 |

Los rangos variables declarados deben corresponder a los pesos realmente disponibles en cada archivo de fuente.

Se utiliza `font-display: swap` para mostrar una fuente de respaldo mientras se carga la fuente local.

## Biblioteca de componentes

La biblioteca de interfaz se desarrollará progresivamente. El objetivo inicial es ofrecer componentes pequeños, reutilizables y con variantes visuales coherentes.

| Componente       | Alcance previsto                                                        |
| ---------------- | ----------------------------------------------------------------------- |
| Button           | Solo texto, solo icono y texto con icono; variantes primary y secondary |
| Link             | Texto o texto con icono                                                 |
| Badge            | Etiquetas de estado o categoría                                         |
| Title / Subtitle | Jerarquía tipográfica consistente                                       |
| Input            | Campos de texto y otros controles compatibles                           |
| Checkbox / Radio | Controles de selección                                                  |
| Tags             | Etiquetas visuales                                                      |
| Lists            | Listas ordenadas y desordenadas con opciones de estilo                  |
| Container        | Contenedor reutilizable para controlar el ancho y el espaciado          |

Los estados de interacción, la accesibilidad y el comportamiento responsive se incorporarán como parte de la implementación de cada componente.

## Integración opcional de Vue

Astro permite utilizar componentes de frameworks de interfaz cuando se necesita interactividad.

Vue no es un requisito para las páginas estáticas. Se añadirá únicamente cuando el proyecto requiera componentes reactivos que justifiquen esa integración.

Documentación: [Integración de Vue con Astro](https://docs.astro.build/en/guides/integrations-guide/vue/).

## Documentación oficial

- [Astro](https://docs.astro.build/)
- [Configuración de Astro](https://docs.astro.build/en/reference/configuration-reference/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Plugin de Tailwind CSS para Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Vite](https://vite.dev/guide/)
- [Vue](https://vuejs.org/)

## Estado y próximos pasos

- [x] Inicializar el proyecto con la plantilla minimalista de Astro.
- [x] Configurar el repositorio Git y la rama de trabajo `develop`.
- [x] Instalar Tailwind CSS v4 y `@tailwindcss/vite`.
- [x] Configurar Tailwind dentro de Astro.
- [x] Crear la entrada global de estilos.
- [x] Incorporar tokens tipográficos semánticos.
- [x] Registrar las fuentes locales y verificar su visualización en el navegador.
- [x] Verificar la compilación estática mediante `pnpm build`.
- [ ] Implementar una estructura de layouts y componentes reutilizables.
- [ ] Crear los componentes UI iniciales y sus variantes.
- [ ] Definir convenciones de accesibilidad y responsive design.
- [ ] Evaluar la integración opcional de Vue.
- [ ] Incorporar comprobaciones de calidad y validaciones adicionales.

---

Este proyecto conserva a Astro como base y evoluciona mediante decisiones explícitas, pequeñas y verificables, orientadas a construir un boilerplate reutilizable para futuros proyectos web.

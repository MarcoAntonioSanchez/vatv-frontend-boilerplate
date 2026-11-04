# VTAV Frontend

Boilerplate reutilizable para el desarrollo de interfaces web con **Astro, Vue 3, Tailwind CSS v4 y TypeScript**.

VTAV utiliza Astro como framework principal y adopta una arquitectura _static-first_, con integración de Vue para funcionalidades interactivas. Su organización se basa en componentes reutilizables, separación de datos y contenido, y módulos funcionales independientes que pueden incorporarse progresivamente según las necesidades de cada proyecto.

El objetivo es disponer de una base frontend consistente, escalable y adaptable a distintos proyectos web, sin introducir dependencias o complejidad arquitectónica innecesarias.

> **Estado:** desarrollo activo. La configuración base, el sistema de diseño, la biblioteca inicial de componentes, Astro Content Collections y el primer módulo de autenticación local están implementados y verificados mediante compilación y pruebas funcionales en navegador.

## Stack tecnológico

| Tecnología                                    | Propósito                                           |
| --------------------------------------------- | --------------------------------------------------- |
| [Astro](https://astro.build/)                 | Framework principal para páginas y sitios web       |
| [Vite](https://vite.dev/)                     | Servidor de desarrollo y herramienta de compilación |
| [Vue 3](https://vuejs.org/)                   | Componentes reactivos e interfaces interactivas     |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático y contratos entre módulos           |
| [Tailwind CSS v4](https://tailwindcss.com/)   | Sistema de utilidades CSS y tokens de diseño        |
| [pnpm](https://pnpm.io/)                      | Gestor de paquetes                                  |

### Principios del proyecto

- **Static-first:** priorizar Astro para páginas estáticas, contenido editorial y sitios informativos.
- **Modularidad progresiva:** incorporar funcionalidades independientes conforme las necesidades del proyecto lo justifiquen.
- **Separación de responsabilidades:** mantener diferenciados los datos generales, el contenido editorial y los módulos funcionales.
- **Componentes reutilizables:** construir una biblioteca de interfaz consistente y extensible.
- **Desacoplamiento:** evitar que la interfaz dependa directamente de proveedores externos, servicios o infraestructura.
- **Tipografía y diseño semánticos:** consumir tokens mediante roles, no mediante valores visuales dispersos.
- **Dependencias justificadas:** incorporar herramientas adicionales únicamente cuando aporten valor.
- **Compilación optimizada:** utilizar el flujo de producción de Vite a través de Astro.

## Requisitos

- Node.js compatible con la versión de Astro instalada. Consultar el campo `engines` de `package.json`.
- pnpm.
- Git.

El proyecto utiliza exclusivamente pnpm como gestor de paquetes.

## Instalación y desarrollo

Clona el repositorio y accede a su directorio. Después, ejecuta:

```bash
pnpm install
pnpm dev
```

Abre la dirección local que indique la terminal, normalmente:

`http://localhost:4321`

## Comandos disponibles

Todos los comandos se ejecutan desde la raíz del proyecto.

| Comando                        | Descripción                                 |
| ------------------------------ | ------------------------------------------- |
| `pnpm dev`                     | Inicia el servidor local de desarrollo      |
| `pnpm build`                   | Compila el sitio para producción en `dist/` |
| `pnpm preview`                 | Previsualiza localmente la compilación      |
| `pnpm astro -- --help`         | Muestra la ayuda de la CLI de Astro         |
| `pnpm astro add <integration>` | Añade una integración compatible de Astro   |

Para comprobar la compilación:

```bash
pnpm build
pnpm preview
```

La salida configurada actualmente es estática. Astro procesa las páginas y los estilos durante la compilación, incluyendo el CSS generado por Tailwind CSS.

> `pnpm astro check` no forma parte de los requisitos actuales de validación debido a la compatibilidad entre las versiones instaladas de Astro y TypeScript. La validación habitual utiliza `pnpm build` y pruebas funcionales en navegador.

## Arquitectura y organización

VTAV adopta una arquitectura organizada en tres áreas principales:

- `data`: configuración y datos generales de la aplicación.
- `content`: contenido editorial administrado mediante Astro Content Collections.
- `modules`: funcionalidades independientes y reutilizables.

Cada área tiene una responsabilidad específica. No deben utilizarse indistintamente ni duplicar información entre ellas.

### Estructura del proyecto

```text
/
├── public/                         # Recursos estáticos con rutas públicas
├── src/
│   ├── assets/
│   │   └── fonts/
│   │       ├── body/
│   │       ├── heading/
│   │       └── accent/
│   │
│   ├── components/
│   │   ├── ui/                     # Componentes de interfaz
│   │   ├── layout/                 # Componentes estructurales
│   │   └── sections/               # Secciones reutilizables
│   │
│   ├── layouts/                    # Layouts compartidos de Astro
│   │
│   ├── pages/                      # Páginas y rutas de Astro
│   │   ├── index.astro
│   │   ├── blog.astro
│   │   └── login.astro
│   │
│   ├── data/                       # Datos y configuración general
│   │   ├── site/
│   │   ├── navigation/
│   │   └── constants/
│   │
│   ├── content/                    # Contenido editorial
│   │   ├── blog/
│   │   ├── pages/
│   │   └── authors/
│   │
│   ├── modules/                    # Funcionalidades independientes
│   │   └── auth/
│   │       ├── components/
│   │       ├── composables/
│   │       ├── services/
│   │       ├── types/
│   │       └── index.ts
│   │
│   ├── styles/
│   │   ├── global.css              # Entrada global de estilos
│   │   ├── tokens.css              # Tokens de diseño
│   │   └── fonts.css               # Declaraciones @font-face
│   │
│   ├── icons/                      # Recursos de iconografía
│   ├── content.config.ts           # Registro de colecciones
│   └── env.d.ts                    # Tipos de entorno de Astro
│
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
└── README.md
```

La estructura representa la organización arquitectónica del proyecto. No es obligatorio crear todos los directorios al iniciar un proyecto derivado: los módulos y subdirectorios deben incorporarse cuando exista un caso de uso que los justifique.

### 1. Data: configuración y datos generales

Ubicación: `src/data/`

Contiene información estructurada y reutilizable que pertenece a la aplicación.

Ejemplos:

- Configuración general del sitio.
- Información de identidad de la aplicación.
- Elementos de navegación.
- Constantes y valores compartidos.

`data` no es un CMS ni un repositorio genérico de cualquier información. Su responsabilidad es proporcionar datos de configuración y aplicación que puedan consumirse desde diferentes componentes.

### 2. Content: contenido editorial

Ubicación: `src/content/`

Contiene contenido administrado mediante Astro Content Collections.

Se utiliza para artículos, páginas editoriales y otros contenidos estructurados que Astro puede validar y procesar durante la compilación.

Actualmente existe una colección `blog`, registrada en `src/content.config.ts`.

Su esquema inicial contempla:

| Campo         | Tipo    | Descripción                           |
| ------------- | ------- | ------------------------------------- |
| `title`       | string  | Título del artículo                   |
| `description` | string  | Descripción                           |
| `pubDate`     | date    | Fecha de publicación                  |
| `draft`       | boolean | Indica si el contenido es un borrador |

Los artículos utilizan Markdown o MDX.

Ejemplo de consulta:

```ts
import { getCollection } from "astro:content";

const posts = await getCollection("blog", ({ data }) => {
  return !data.draft;
});
```

La colección `blog` cuenta con una página de demostración en `/blog`, que muestra cómo recuperar, validar y renderizar contenido editorial.

Los directorios `pages/` y `authors/` están previstos dentro de `content`, pero no representan colecciones registradas actualmente.

Documentación: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/).

### 3. Modules: funcionalidades independientes

Ubicación: `src/modules/`

Contiene funcionalidades que agrupan sus propios componentes, lógica, servicios, tipos y datos cuando resulta necesario.

Cada módulo debe encapsular su responsabilidad y exponer una interfaz pública mediante su archivo `index.ts`.

Ejemplos de posibles módulos:

- Autenticación.
- Gestión de usuarios.
- Formularios complejos.
- Notificaciones.
- Integraciones con servicios externos.

No es obligatorio crear todos estos módulos ni todas sus subcarpetas desde el inicio.

**Modularidad progresiva:** una funcionalidad comienza con la estructura mínima necesaria y evoluciona cuando su complejidad lo requiere.

#### Servicios y proveedores externos

Cuando un módulo consume un servicio externo, su implementación debe abstraerse mediante contratos e interfaces.

La interfaz de usuario no debe depender directamente del proveedor.

Por ejemplo, un módulo de autenticación puede utilizar una implementación local durante el desarrollo y posteriormente sustituirla por una implementación que consuma una API propia.

Esta separación permite modificar proveedores sin reconstruir los componentes que consumen la funcionalidad.

## Páginas y recursos

Astro detecta las páginas dentro de `src/pages/`. El nombre y la ubicación del archivo determinan la ruta correspondiente.

Las páginas pueden utilizar layouts compartidos y componentes Astro o Vue.

Actualmente existen:

| Ruta     | Propósito                                        |
| -------- | ------------------------------------------------ |
| `/`      | Página principal y demostraciones de componentes |
| `/blog`  | Demostración de Astro Content Collections        |
| `/login` | Demostración del módulo de autenticación local   |

Las rutas de demostración forman parte del boilerplate y pueden permanecer sin contenido funcional en proyectos derivados que no necesiten esas características.

Los recursos pueden ubicarse en:

- `src/assets/`: recursos importados desde el código y procesados por la cadena de compilación cuando corresponda.
- `public/`: archivos copiados sin procesamiento y disponibles mediante rutas públicas estables.

## Sistema de estilos

### Tailwind CSS v4

Tailwind se integra mediante el plugin oficial de Vite, configurado en `astro.config.mjs`.

El archivo `src/styles/global.css` es el punto de entrada de estilos:

```css
@import "tailwindcss";

/* Incluye los componentes de los módulos en el análisis de clases. */
@source "../modules";

@import "./tokens.css";
@import "./fonts.css";
```

Los layouts que necesiten los estilos globales deben importar esta entrada:

```astro
---
import "../styles/global.css";
---
```

El layout principal `Layout.astro` centraliza actualmente esta importación para las páginas que lo utilizan.

Los estilos de producción se procesan durante `pnpm build`. No se requiere ejecutar una compilación manual de Tailwind por separado.

### Tokens de diseño

Los tokens se definen en `src/styles/tokens.css` mediante el sistema `@theme` y las variables CSS de Tailwind v4.

El sistema contempla dos grandes grupos:

**Tipografía**

- Familias tipográficas semánticas.
- Escalas tipográficas.
- Tamaños y alturas de línea.

**Color**

- Brand: primary, secondary, accent y sus estados.
- UI: background, surface, surface-muted, text, text-muted, text-disabled, border, border-strong, link y link-hover.
- Feedback: success, warning, danger e info.

Los colores cuentan con configuraciones Light y Dark, permitiendo adaptar la identidad visual mediante tokens sin modificar los componentes individualmente.

Los componentes deben utilizar los tokens semánticos en lugar de introducir colores arbitrarios cuando exista un token apropiado.

### Tipografía

Las familias tipográficas se registran mediante roles semánticos:

| Clase          | Familia        | Uso                                 |
| -------------- | -------------- | ----------------------------------- |
| `font-heading` | Ubuntu         | Títulos y subtítulos                |
| `font-body`    | Inter          | Párrafos y texto general            |
| `font-accent`  | JetBrains Mono | Badges, labels y elementos técnicos |

Las escalas tipográficas disponibles incluyen:

- `display`
- `h1` a `h6`
- `body-lg`
- `body`
- `body-sm`
- `caption`

Cada escala contempla su correspondiente altura de línea.

### Fuentes locales

Las fuentes se almacenan en `src/assets/fonts/` y se registran mediante `@font-face` en `src/styles/fonts.css`.

| Rol     | Archivo                               | Peso              |
| ------- | ------------------------------------- | ----------------- |
| Heading | `heading/Ubuntu-Medium.woff2`         | 500               |
| Heading | `heading/Ubuntu-Bold.woff2`           | 700               |
| Body    | `body/Inter-Variable.woff2`           | Variable, 100–900 |
| Accent  | `accent/JetBrainsMono-Variable.woff2` | Variable, 100–900 |

Los rangos variables declarados deben corresponder a los pesos realmente disponibles en cada archivo de fuente.

Se utiliza `font-display: swap` para mostrar una fuente de respaldo mientras se carga la fuente local.

## Biblioteca de componentes

La biblioteca de interfaz se organiza en tres categorías:

| Directorio             | Responsabilidad                  |
| ---------------------- | -------------------------------- |
| `components/ui/`       | Elementos visuales reutilizables |
| `components/layout/`   | Estructura y distribución        |
| `components/sections/` | Secciones completas de interfaz  |

### Componentes implementados

#### Button.vue

Componente de interfaz que admite elementos `<button>` y `<a>` dependiendo de sus propiedades.

Características:

- Variantes `solid`, `outline`, `ghost` y `link`.
- Soporte para iconos.
- Posición configurable de iconos.
- Efectos de icono al pasar el cursor.
- Estados disabled y loading.
- Eventos de interacción.
- Compatibilidad con formularios.
- Accesibilidad y estados de focus.
- Soporte para reducción de movimiento.

El estado de carga se controla desde el componente que consume el botón.

#### Container.astro

Componente estructural para controlar el ancho y la distribución del contenido.

Admite:

| Tamaño | Ancho máximo |
| ------ | ------------ |
| `sm`   | 48rem        |
| `md`   | 56rem        |
| `lg`   | 64rem        |
| `xl`   | 72rem        |
| `2xl`  | 80rem        |

También admite los modos `boxed` y `full`.

Valores predeterminados: `width="boxed"` y `size="2xl"`.

### Componentes previstos

La biblioteca puede ampliarse con:

- Links.
- Badges.
- Inputs.
- Checkboxes y radios.
- Listas.
- Tabs.
- Modales.
- Componentes de navegación.
- Secciones reutilizables.

Su incorporación dependerá de las necesidades de los proyectos derivados.

## Iconografía

VTAV utiliza `astro-icon` con colecciones de Iconify.

Colecciones instaladas:

- [Tabler Icons](https://tabler.io/icons): iconografía general de interfaz.
- [Simple Icons](https://simpleicons.org/): logotipos e iconografía de marcas.

Los iconos se consumen desde componentes Astro:

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="simple-icons:instagram" class="size-6" />
```

Se recomienda utilizar Tabler para elementos de interfaz y Simple Icons para marcas y servicios.

No se incorpora un wrapper Vue para la iconografía.

## Integración de Vue

Vue se integra mediante `@astrojs/vue`.

Astro permanece como framework principal y Vue se utiliza cuando una funcionalidad requiere estado reactivo, interacción o lógica de interfaz más compleja.

Las páginas estáticas no necesitan utilizar Vue.

### Islas de hidratación

Los componentes Vue pueden hidratarse mediante directivas de cliente de Astro, como `client:load`.

Es importante considerar que cada isla hidratada representa una aplicación Vue independiente.

Los mecanismos de contexto de Vue, como `Provide / Inject`, solamente comparten información dentro del árbol de componentes de una misma aplicación.

Por tanto, los componentes que necesitan compartir un contexto deben agruparse bajo un componente raíz Vue y recibir una única hidratación desde Astro.

Este comportamiento se utiliza en el módulo de autenticación.

Documentación: [Integración de Vue con Astro](https://docs.astro.build/en/guides/integrations-guide/vue/).

## Módulo de autenticación

Ubicación: `src/modules/auth/`

VTAV incorpora un primer módulo de autenticación para demostrar la separación entre interfaz, estado y servicios.

La implementación actual es local y está destinada exclusivamente a demostraciones y desarrollo frontend.

### Estructura

```text
src/modules/auth/
├── components/
│   ├── AuthDemo.vue
│   ├── AuthProvider.vue
│   └── LoginForm.vue
├── composables/
│   └── useAuth.ts
├── services/
│   └── auth.local.ts
├── types/
│   └── auth.types.ts
└── index.ts
```

### Contrato de autenticación

El módulo establece un contrato TypeScript independiente del proveedor:

```ts
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthService {
  login(credentials: AuthCredentials): Promise<AuthUser>;

  getCurrentUser(): Promise<AuthUser | null>;

  logout(): Promise<void>;
}
```

Las implementaciones de autenticación deben respetar este contrato.

De esta manera, los componentes de interfaz consumen operaciones comunes sin conocer los detalles de implementación.

### Implementación local

`LocalAuthService` implementa el contrato utilizando credenciales ficticias y un estado de sesión en memoria.

Credenciales de demostración:

| Campo      | Valor           |
| ---------- | --------------- |
| Email      | `demo@vtav.dev` |
| Contraseña | `vtav-demo`     |

El servicio permite:

- Iniciar sesión.
- Consultar la sesión actual.
- Cerrar sesión.
- Simular errores por credenciales incorrectas.

La sesión no se persiste. Al recargar la página, el usuario debe iniciar sesión nuevamente.

### Estado compartido

`useAuth.ts` administra el estado reactivo mediante Vue y utiliza `Provide / Inject` para compartirlo entre los componentes descendientes.

El contexto expone:

- `user`
- `isAuthenticated`
- `isLoading`
- `error`
- `login()`
- `logout()`
- `checkSession()`

`AuthProvider.vue` inicializa el contexto y permite inyectar una implementación de `AuthService`.

`LoginForm.vue` consume el contexto sin depender directamente de `LocalAuthService`.

### Integración futura con API

La arquitectura está preparada para incorporar una implementación que consuma un backend mediante HTTP.

El objetivo es que la interfaz mantenga el mismo contrato mientras se sustituye la implementación local por un adaptador de API.

Esta integración todavía está pendiente y dependerá del diseño del backend NORA.

La autenticación real, la autorización y la gestión de sesiones deberán resolverse en el servidor. La implementación futura deberá contemplar mecanismos seguros, como cookies `HttpOnly`, cuando correspondan.

**Importante:** el servicio local y sus credenciales no constituyen un mecanismo de seguridad. No deben utilizarse para proteger información ni recursos reales.

## Convenciones de desarrollo

### Organización del código

- Mantener separados `data`, `content` y `modules`.
- Evitar duplicar información entre estas áreas.
- Incorporar módulos de forma progresiva.
- Exponer las funcionalidades públicas de cada módulo mediante `index.ts`.
- Utilizar contratos TypeScript para desacoplar servicios e implementaciones.
- Mantener Astro como responsable de la estructura de páginas y layouts.
- Incorporar Vue únicamente cuando exista una necesidad de interactividad.

### Estilos y componentes

- Consumir tokens semánticos de VTAV.
- Mantener compatibilidad con los modos Light y Dark.
- Priorizar componentes pequeños y reutilizables.
- Considerar accesibilidad y estados de interacción desde su implementación.
- Evitar estilos independientes cuando existan tokens o componentes compartidos apropiados.

### Gestión de dependencias

- Utilizar pnpm para instalar, actualizar y ejecutar dependencias.
- Mantener sincronizados `package.json` y `pnpm-lock.yaml`.
- Evitar incorporar dependencias que no tengan una justificación técnica.

### Control de versiones

Actualmente, `develop` es la rama de trabajo del proyecto.

El flujo previsto contempla:

- `develop`: desarrollo continuo.
- `main`: versiones estables y liberadas.
- Pull Requests desde `develop` hacia `main` para promover versiones.
- Etiquetas Git siguiendo Semantic Versioning para identificar las versiones publicadas.

La rama `main` y el procedimiento formal de liberación están pendientes de configuración.

## Estado y próximos pasos

### Implementado y verificado

- [x] Inicializar el proyecto con la plantilla minimalista de Astro.
- [x] Configurar Git y la rama de trabajo `develop`.
- [x] Instalar y configurar Tailwind CSS v4 mediante Vite.
- [x] Incorporar Vue 3 como integración de Astro.
- [x] Incorporar TypeScript.
- [x] Crear la entrada global de estilos.
- [x] Incorporar tokens tipográficos semánticos.
- [x] Incorporar escalas tipográficas.
- [x] Definir tokens de color semánticos y modos Light/Dark.
- [x] Registrar fuentes locales.
- [x] Configurar Astro Icon con Tabler y Simple Icons.
- [x] Implementar `Layout.astro`.
- [x] Implementar `Container.astro`.
- [x] Implementar `Button.vue` y sus variantes.
- [x] Incorporar ejemplos funcionales de componentes en la página principal.
- [x] Definir la separación arquitectónica `data / content / modules`.
- [x] Configurar Astro Content Collections.
- [x] Crear la colección inicial `blog`.
- [x] Implementar la página de demostración `/blog`.
- [x] Establecer el contrato TypeScript `AuthService`.
- [x] Implementar `LocalAuthService`.
- [x] Implementar el composable `useAuth()`.
- [x] Implementar `AuthProvider.vue`.
- [x] Implementar `LoginForm.vue`.
- [x] Implementar la demostración de autenticación `/login`.
- [x] Validar login, logout, errores y estado de sesión en memoria.
- [x] Verificar la compilación de producción mediante `pnpm build`.

### Pendiente

- [ ] Crear la rama `main`.
- [ ] Configurar el procedimiento de liberación mediante Pull Requests.
- [ ] Incorporar etiquetas de versión SemVer.
- [ ] Completar ejemplos de configuración general en `src/data/`.
- [ ] Evaluar y registrar nuevas colecciones editoriales cuando existan casos de uso.
- [ ] Ampliar progresivamente la biblioteca de componentes UI.
- [ ] Incorporar otros módulos funcionales según las necesidades de los proyectos.
- [ ] Diseñar e implementar el adaptador de autenticación mediante API.
- [ ] Integrar el frontend con el backend NORA.
- [ ] Evaluar validaciones de calidad y herramientas adicionales de comprobación.

## Documentación oficial

- [Astro](https://docs.astro.build/)
- [Configuración de Astro](https://docs.astro.build/en/reference/configuration-reference/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Integración de Vue con Astro](https://docs.astro.build/en/guides/integrations-guide/vue/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Plugin de Tailwind CSS para Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Vite](https://vite.dev/guide/)
- [Vue](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [pnpm](https://pnpm.io/motivation)

---

VTAV evoluciona mediante decisiones arquitectónicas explícitas y verificables. Su objetivo no es imponer una estructura rígida a todos los proyectos, sino proporcionar una base técnica reutilizable que pueda crecer progresivamente sin perder consistencia, modularidad ni independencia entre sus componentes y servicios.

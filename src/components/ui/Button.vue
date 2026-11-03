<script setup>
/**
 * Evita que Vue coloque automáticamente los atributos
 * sobre el componente raíz. Los distribuiremos manualmente
 * sobre el elemento <button> o <a>.
 */
defineOptions({
  inheritAttrs: false,
});
/**
 * Button
 *
 * Componente reutilizable para acciones y navegación.
 * - Sin href: renderiza un elemento <button>.
 * - Con href: renderiza un elemento <a>.
 * - Loading: sustituye el contenido por un indicador de carga.
 */

const props = defineProps({
  // Destino opcional. Si existe, el componente será un enlace.
  href: {
    type: String,
    default: null,
  },

  // Tipo de botón nativo.
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },

  // Deshabilita la interacción del componente.
  disabled: {
    type: Boolean,
    default: false,
  },

  // Estado de carga controlado por el componente padre.
  loading: {
    type: Boolean,
    default: false,
  },

  // Posición del icono respecto al contenido.
  iconPosition: {
    type: String,
    default: "right",
    validator: (value) => ["left", "right"].includes(value),
  },

  // Permite revelar el icono durante hover o focus.
  iconOnHover: {
    type: Boolean,
    default: false,
  },

  // Variante virual del botón
  variant: {
    type: String,
    default: "solid",
    validator: (value) => ["solid", "outline", "ghost", "link"].includes(value),
  },
});

// Un componente en loading tampoco debe aceptar interacciones.
const isUnavailable = () => props.disabled || props.loading;

// Evita la navegación cuando un enlace está deshabilitado o cargando.
const handleClick = (event) => {
  if (isUnavailable()) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  emit("click", event);
};

// Eventos públicos del componente.
const emit = defineEmits(["click"]);
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    v-bind="$attrs"
    :href="isUnavailable() ? undefined : href || undefined"
    :type="href ? undefined : type"
    :disabled="!href && isUnavailable()"
    :aria-disabled="href && isUnavailable() ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    :aria-label="$attrs['aria-label']"
    :tabindex="href && isUnavailable() ? -1 : undefined"
    :class="[
      'button',
      `button--${variant}`,
      {
        'is-loading': loading,
        'is-disabled': isUnavailable(),
        'has-icon-on-hover': iconOnHover,
      },
    ]"
    @click="handleClick"
  >
    <!-- El spinner se superpone al contenido para conservar sus dimensiones. -->
    <span v-if="loading" class="button__spinner" role="status">
      <span class="sr-only">Cargando...</span>
    </span>

    <!-- El contenido permanece en el DOM durante loading. -->
    <span class="button__inner" :class="{ 'button__inner--loading': loading }">
      <span v-if="$slots.icon && iconPosition === 'left'" class="button__icon">
        <slot name="icon" />
      </span>

      <span class="button__content">
        <slot />
      </span>

      <span v-if="$slots.icon && iconPosition === 'right'" class="button__icon">
        <slot name="icon" />
      </span>
    </span>
  </component>
</template>

<style scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  min-height: 2.75rem;
  padding: 0.75rem 1.25rem;

  border: 1px solid transparent;
  border-radius: 0.625rem;

  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: 600;
  line-height: 1.25;

  cursor: pointer;
  text-decoration: none;
  user-select: none;

  transition:
    background-color 180ms ease,
    color 180ms ease,
    border-color 180ms ease,
    opacity 180ms ease;
}

/* Solid: variante principal. */
.button--solid {
  background-color: var(--color-primary);
  color: var(--button-solid-text, var(--color-background));
}

@media (hover: hover) {
  .button--solid:not(.is-disabled):hover {
    background-color: var(--color-primary-hover);
  }
}

.button--solid:not(.is-disabled):active {
  background-color: var(--color-primary-active);
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* Contenido e iconografía. */
.button__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button__inner--loading {
  opacity: 0;
  pointer-events: none;
}

.button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Loading. */
.button__spinner {
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;

  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;

  animation: button-spin 700ms linear infinite;
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Disabled. */
.button.is-disabled {
  background-color: var(--color-surface-muted);
  color: var(--color-text-disabled);
  border-color: transparent;
  cursor: not-allowed;
}

/* Accesibilidad. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }

  .button__spinner {
    animation-duration: 1.5s;
  }
}

/* El icono no ocupa espacio mientras permanece oculto. */
.has-icon-on-hover .button__icon {
  width: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateX(-5px);
  transition:
    width 180ms ease,
    opacity 180ms ease,
    transform 180ms ease;
}

/* El espacio aparece junto con el icono. */
.has-icon-on-hover:hover .button__icon,
.has-icon-on-hover:focus-visible .button__icon {
  width: 1.25rem;
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .has-icon-on-hover .button__icon {
    transition: none;
    transform: none;
  }
}
</style>

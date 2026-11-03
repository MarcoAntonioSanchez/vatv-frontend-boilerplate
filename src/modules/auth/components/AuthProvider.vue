<script setup lang="ts">
import type { AuthService } from "../types/auth.types";
import { provideAuth } from "../composables/useAuth";
import { LocalAuthService } from "../services/auth.local";

/**
 * Permite inyectar una implementación de autenticación.
 *
 * Si no se proporciona ninguna, utilizamos el servicio local
 * de demostración.
 */
const props = defineProps<{
  service?: AuthService;
}>();

// Inicializa el contexto para los componentes descendientes.
provideAuth(props.service ?? new LocalAuthService());
</script>

<template>
  <!-- Los componentes descendientes heredan el contexto de autenticación. -->
  <slot />
</template>

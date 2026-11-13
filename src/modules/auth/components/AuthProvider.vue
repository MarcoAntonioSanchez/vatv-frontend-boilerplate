<script setup lang="ts">
import type { AuthService } from "../types/auth.types";
import { provideAuth } from "../composables/useAuth";
import { ApiAuthService } from "../services/auth.api";

/**
 * Permite inyectar una implementación de autenticación.
 *
 * Si no se proporciona ninguna, utilizamos NORA API.
 */
const props = defineProps<{
  service?: AuthService;
}>();

// Inicializa el contexto para los componentes descendientes.
provideAuth(props.service ?? new ApiAuthService());
</script>

<template>
  <!-- Los componentes descendientes heredan el contexto de autenticación. -->
  <slot />
</template>

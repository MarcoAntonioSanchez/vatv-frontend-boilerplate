<script setup lang="ts">
import { ref } from "vue";

import Button from "../../../components/ui/Button.vue";
import { useAuth } from "../composables/useAuth";

/**
 * Consume el contexto de autenticación proporcionado
 * por AuthProvider.
 */
const { session, isAuthenticated, isLoading, error, login, logout } = useAuth();

/**
 * Estado local de los campos del formulario.
 *
 * Los campos comienzan vacíos para evitar exponer
 * credenciales de demostración.
 */
const username = ref("");
const password = ref("");

/**
 * Procesa el envío del formulario.
 */
async function handleSubmit(): Promise<void> {
  await login({
    username: username.value,
    password: password.value,
  });

  // Limpia la contraseña después del intento de autenticación.
  password.value = "";
}
</script>

<template>
  <section
    class="mx-auto w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm"
  >
    <!-- Estado de autenticación exitosa -->
    <div v-if="isAuthenticated" class="space-y-4 text-center">
      <div
        class="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10 text-success"
      >
        <span aria-hidden="true">✓</span>
      </div>

      <h2 class="font-heading text-h3 text-text">¡Autenticación exitosa!</h2>

      <p class="text-body text-text-muted">
        La API NORA ha validado tus credenciales.
      </p>

      <div
        v-if="session"
        class="space-y-2 rounded-lg bg-background p-4 text-left"
      >
        <p class="text-body-sm text-text-muted">
          Tipo de token:
          <span class="font-medium text-text">{{ session.tokenType }}</span>
        </p>

        <p class="text-body-sm text-text-muted">
          Expiración:
          <span class="font-medium text-text">{{ session.expiresIn }}</span>
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        :loading="isLoading"
        :disabled="isLoading"
        class="w-full"
        @click="logout"
      >
        Cerrar sesión
      </Button>
    </div>

    <!-- Formulario de acceso -->
    <form v-else class="space-y-6" @submit.prevent="handleSubmit">
      <header class="space-y-2">
        <h2 class="font-heading text-h3 text-text">Iniciar sesión</h2>

        <p class="text-body-sm text-text-muted">
          Ingresa tus credenciales para acceder.
        </p>
      </header>

      <div class="space-y-2">
        <label for="auth-username" class="text-body-sm font-medium text-text">
          Nombre de usuario
        </label>

        <input
          id="auth-username"
          v-model.trim="username"
          type="text"
          autocomplete="username"
          placeholder="Ingresa tu usuario"
          minlength="3"
          maxlength="100"
          required
          :disabled="isLoading"
          class="w-full rounded-lg border border-border bg-background px-4 py-3 text-body text-text placeholder:text-text-muted outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div class="space-y-2">
        <label for="auth-password" class="text-body-sm font-medium text-text">
          Contraseña
        </label>

        <input
          id="auth-password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="Ingresa tu contraseña"
          maxlength="128"
          required
          :disabled="isLoading"
          class="w-full rounded-lg border border-border bg-background px-4 py-3 text-body text-text placeholder:text-text-muted outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <!-- Mensaje de error del servicio de autenticación -->
      <p
        v-if="error"
        role="alert"
        class="rounded-lg bg-danger/10 px-4 py-3 text-body-sm text-danger"
      >
        {{ error }}
      </p>

      <Button
        type="submit"
        variant="solid"
        :loading="isLoading"
        :disabled="isLoading || !username.trim() || !password"
        class="w-full"
      >
        Iniciar sesión
      </Button>
    </form>
  </section>
</template>

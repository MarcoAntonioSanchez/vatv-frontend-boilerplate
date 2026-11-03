<script setup lang="ts">
import { ref } from "vue";

import Button from "../../../components/ui/Button.vue";
import { useAuth } from "../composables/useAuth";

/**
 * Consume el contexto de autenticación proporcionado
 * por AuthProvider.
 */
const { user, isAuthenticated, isLoading, error, login, logout } = useAuth();

/**
 * Estado local de los campos del formulario.
 */
const email = ref("demo@vtav.dev");
const password = ref("vtav-demo");

/**
 * Procesa el envío del formulario.
 */
async function handleSubmit(): Promise<void> {
  await login({
    email: email.value,
    password: password.value,
  });
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

      <h2 class="font-heading text-h3 text-text">¡Bienvenido!</h2>

      <p class="text-body text-text-muted">
        Has iniciado sesión como {{ user?.name }}.
      </p>

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
        <label for="auth-email" class="text-body-sm font-medium text-text">
          Correo electrónico
        </label>

        <input
          id="auth-email"
          v-model.trim="email"
          type="email"
          autocomplete="username"
          placeholder="nombre@ejemplo.com"
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
        :disabled="isLoading || !email || !password"
        class="w-full"
      >
        Iniciar sesión
      </Button>
    </form>
  </section>
</template>
